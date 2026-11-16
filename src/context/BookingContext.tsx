import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, SoundPackage, SoundAddOn, PaymentMethod, PaymentDetails, SentNotification } from '../types';
import { SOUND_PACKAGES } from '../data/packagesData';
import { useAuth } from './AuthContext';

interface BookingDraft {
  packageTier: 'simple' | 'silver' | 'gold' | 'custom';
  selectedAddOns: SoundAddOn[];
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventType: Booking['eventType'];
  venueName: string;
  venueCity: string;
  venueAddress: string;
  expectedGuests: number;
  specialInstructions: string;
  advancePercentage: number; // e.g. 30% advance or 100% full
}

interface BookingContextType {
  draft: BookingDraft;
  bookings: Booking[];
  currentReceiptBooking: Booking | null;
  notifications: SentNotification[];
  latestToastNotification: SentNotification | null;
  isReceiptModalOpen: boolean;
  isNotificationsDrawerOpen: boolean;
  activeNotificationTab: 'sms' | 'email';
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  selectPackage: (tier: 'simple' | 'silver' | 'gold' | 'custom') => void;
  toggleAddOn: (addOn: SoundAddOn) => void;
  updateDraftField: <K extends keyof BookingDraft>(field: K, value: BookingDraft[K]) => void;
  calculatePricing: () => {
    packagePrice: number;
    addOnsTotal: number;
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    amountToPayNow: number;
    balanceDue: number;
  };
  confirmBookingAndPay: (method: PaymentMethod, bankOrUpiRef?: string) => Promise<Booking>;
  viewReceipt: (booking: Booking) => void;
  closeReceiptModal: () => void;
  openNotificationsDrawer: (tab?: 'sms' | 'email') => void;
  closeNotificationsDrawer: () => void;
  resendReceiptNotification: (bookingId: string, type: 'email' | 'sms') => void;
  dismissToastNotification: () => void;
}

const STORAGE_KEY_BOOKINGS = 'chintamani_sound_bookings_v1';
const STORAGE_KEY_NOTIFICATIONS = 'chintamani_sound_notifications_v1';

const defaultDraft: BookingDraft = {
  packageTier: 'silver',
  selectedAddOns: [],
  eventDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], // 5 days from now
  eventStartTime: '17:00',
  eventEndTime: '23:30',
  eventType: 'Wedding & Sangeet',
  venueName: 'Grand Celebration Palace & Lawns',
  venueCity: 'Pune',
  venueAddress: 'Baner-Pashan Link Road, Pune, Maharashtra 411045',
  expectedGuests: 800,
  specialInstructions: 'Need punchy bass for DJ entry and crystal vocal tuning for live sangeet performances.',
  advancePercentage: 100, // 100% or 30%
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [draft, setDraft] = useState<BookingDraft>(defaultDraft);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<SentNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentReceiptBooking, setCurrentReceiptBooking] = useState<Booking | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState<'sms' | 'email'>('sms');
  const [latestToastNotification, setLatestToastNotification] = useState<SentNotification | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const selectPackage = (tier: 'simple' | 'silver' | 'gold' | 'custom') => {
    setDraft((prev) => ({ ...prev, packageTier: tier }));
  };

  const toggleAddOn = (addOn: SoundAddOn) => {
    setDraft((prev) => {
      const exists = prev.selectedAddOns.some((item) => item.id === addOn.id);
      if (exists) {
        return {
          ...prev,
          selectedAddOns: prev.selectedAddOns.filter((item) => item.id !== addOn.id),
        };
      } else {
        return {
          ...prev,
          selectedAddOns: [...prev.selectedAddOns, addOn],
        };
      }
    });
  };

  const updateDraftField = <K extends keyof BookingDraft>(field: K, value: BookingDraft[K]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const calculatePricing = () => {
    const pkg = SOUND_PACKAGES.find((p) => p.id === draft.packageTier) || SOUND_PACKAGES[1];
    const packagePrice = pkg.price;
    const addOnsTotal = draft.selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
    const subtotal = packagePrice + addOnsTotal;
    const taxAmount = Math.round(subtotal * 0.18); // 18% GST standard on audio/events
    const totalAmount = subtotal + taxAmount;
    const amountToPayNow =
      draft.advancePercentage === 100
        ? totalAmount
        : Math.round((totalAmount * draft.advancePercentage) / 100);
    const balanceDue = totalAmount - amountToPayNow;

    return {
      packagePrice,
      addOnsTotal,
      subtotal,
      taxAmount,
      totalAmount,
      amountToPayNow,
      balanceDue,
    };
  };

  const confirmBookingAndPay = async (
    method: PaymentMethod,
    bankOrUpiRef?: string
  ): Promise<Booking> => {
    if (!user) {
      throw new Error('User must be registered and logged in to confirm booking');
    }

    const pricing = calculatePricing();
    const pkg = SOUND_PACKAGES.find((p) => p.id === draft.packageTier) || SOUND_PACKAGES[1];

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `CS-LOUD-2026-${randomSuffix}`;
    const receiptNumber = `CS-INV-${new Date().getFullYear()}-${randomSuffix}`;
    const txnId = `TXN_CHINTAMANI_${Date.now().toString().slice(-8)}`;

    const payment: PaymentDetails = {
      transactionId: txnId,
      method,
      amount: pricing.totalAmount,
      advanceAmountPaid: pricing.amountToPayNow,
      balanceDue: pricing.balanceDue,
      status: 'completed',
      paidAt: new Date().toISOString(),
      bankOrUpiRef: bankOrUpiRef || `UPI/NPCI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      receiptNumber,
    };

    const newBooking: Booking = {
      id: 'bk_' + Math.random().toString(36).substring(2, 9),
      bookingCode,
      user: { ...user },
      packageId: draft.packageTier,
      packageName: pkg.name,
      packagePrice: pricing.packagePrice,
      selectedAddOns: [...draft.selectedAddOns],
      addOnsTotal: pricing.addOnsTotal,
      subtotal: pricing.subtotal,
      taxAmount: pricing.taxAmount,
      totalAmount: pricing.totalAmount,
      advancePercentage: draft.advancePercentage,
      amountToPayNow: pricing.amountToPayNow,
      eventDate: draft.eventDate,
      eventStartTime: draft.eventStartTime,
      eventEndTime: draft.eventEndTime,
      eventType: draft.eventType,
      venueName: draft.venueName,
      venueCity: draft.venueCity,
      venueAddress: draft.venueAddress,
      expectedGuests: draft.expectedGuests,
      specialInstructions: draft.specialInstructions,
      payment,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      emailSent: true,
      smsSent: true,
    };

    // Append to bookings list
    setBookings((prev) => [newBooking, ...prev]);

    // Generate simulated SMS Notification
    const smsContent = `Dear ${user.name}, your Chintamani Sound (LoudLee Series) booking is CONFIRMED for ${newBooking.eventDate}! 
Package: ${newBooking.packageName} (${pkg.wattageRMS})
Venue: ${newBooking.venueName}, ${newBooking.venueCity}
Paid: ₹${pricing.amountToPayNow.toLocaleString('en-IN')} (Ref: ${payment.transactionId})
Receipt & Gate Pass: bit.ly/cs-rec-${randomSuffix}
Sound Master Helpline: +91 98220 54321 / +91 98220 12345.`;

    const smsNotification: SentNotification = {
      id: 'sms_' + Date.now(),
      bookingId: newBooking.id,
      recipientEmail: user.email,
      recipientPhone: user.phone,
      type: 'sms',
      subject: `Booking Confirmed #${bookingCode}`,
      content: smsContent,
      sentAt: new Date().toISOString(),
      receiptUrl: `#receipt-${bookingCode}`,
    };

    // Generate simulated Email Notification
    const emailSubject = `✅ Official Booking Confirmation & Payment Receipt - ${bookingCode} | Chintamani Sound LoudLee Series`;
    const emailContent = `Dear ${user.name},

Thank you for choosing Chintamani Sound - LoudLee Series Dolby Audio for your upcoming ${newBooking.eventType}.

We have securely received your payment of ₹${pricing.amountToPayNow.toLocaleString('en-IN')}. Your sound production slot is locked in our master schedule.

══════════════════════════════════════
EVENT & AUDIO SPECIFICATION DETAILS
══════════════════════════════════════
• Booking ID: ${bookingCode}
• Tax Invoice No: ${receiptNumber}
• Package: ${newBooking.packageName} (${pkg.wattageRMS})
• Event Date: ${newBooking.eventDate} (${newBooking.eventStartTime} to ${newBooking.eventEndTime})
• Venue: ${newBooking.venueName}, ${newBooking.venueCity}
• Audio Hardware: ${pkg.specs.lineArrayTops} + ${pkg.specs.subwoofers}
• Mixer Desk: ${pkg.specs.mixerConsole}
• Total Amount: ₹${pricing.totalAmount.toLocaleString('en-IN')}
• Amount Paid: ₹${pricing.amountToPayNow.toLocaleString('en-IN')} [PAID VIA ${method.toUpperCase().replace('_', ' ')}]
• Balance on Arrival: ₹${pricing.balanceDue.toLocaleString('en-IN')}

Sound Crew Lead & Rigging Supervisor: 
Mr. Sagar Patil (+91 98220 54321)

Our technical team will arrive 3 hours prior for acoustic staging and Dolby sound check. 
You can view or print your GST Tax Invoice anytime from the portal.

Warm Regards,
Chintamani Sound LoudLee Series Management
Office: Pune - Mumbai Expressway Road, Maharashtra
Helpline: +91 98220 54321 / +91 98220 12345`;

    const emailNotification: SentNotification = {
      id: 'eml_' + Date.now(),
      bookingId: newBooking.id,
      recipientEmail: user.email,
      recipientPhone: user.phone,
      type: 'email',
      subject: emailSubject,
      content: emailContent,
      sentAt: new Date().toISOString(),
      receiptUrl: `#receipt-${bookingCode}`,
    };

    setNotifications((prev) => [smsNotification, emailNotification, ...prev]);

    // Show toast for immediate SMS delivery simulation
    setLatestToastNotification(smsNotification);

    // Open receipt modal
    setCurrentReceiptBooking(newBooking);
    setIsReceiptModalOpen(true);

    return newBooking;
  };

  const viewReceipt = (booking: Booking) => {
    setCurrentReceiptBooking(booking);
    setIsReceiptModalOpen(true);
  };

  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  const openNotificationsDrawer = (tab: 'sms' | 'email' = 'sms') => {
    setActiveNotificationTab(tab);
    setIsNotificationsDrawerOpen(true);
  };

  const closeNotificationsDrawer = () => {
    setIsNotificationsDrawerOpen(false);
  };

  const resendReceiptNotification = (bookingId: string, type: 'email' | 'sms') => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const notif: SentNotification = {
      id: `${type}_` + Date.now(),
      bookingId: booking.id,
      recipientEmail: booking.user.email,
      recipientPhone: booking.user.phone,
      type,
      subject:
        type === 'sms'
          ? `[Re-sent] Booking Confirmation #${booking.bookingCode}`
          : `[Re-sent] Tax Invoice & Confirmation - ${booking.bookingCode} | Chintamani Sound`,
      content:
        type === 'sms'
          ? `[DUPLICATE COPY] Dear ${booking.user.name}, your LoudLee Series booking #${booking.bookingCode} for ${booking.eventDate} is active. Paid: ₹${booking.amountToPayNow.toLocaleString('en-IN')}. Receipt: bit.ly/cs-rec-${booking.bookingCode.slice(-4)}`
          : `Resent Copy of Payment Receipt for Booking ${booking.bookingCode}. Total Paid: ₹${booking.amountToPayNow.toLocaleString('en-IN')}. Event: ${booking.eventDate} at ${booking.venueName}.`,
      sentAt: new Date().toISOString(),
    };

    setNotifications((prev) => [notif, ...prev]);
    setLatestToastNotification(notif);
  };

  const dismissToastNotification = () => {
    setLatestToastNotification(null);
  };

  return (
    <BookingContext.Provider
      value={{
        draft,
        bookings,
        currentReceiptBooking,
        notifications,
        latestToastNotification,
        isReceiptModalOpen,
        isNotificationsDrawerOpen,
        activeNotificationTab,
        setDraft,
        selectPackage,
        toggleAddOn,
        updateDraftField,
        calculatePricing,
        confirmBookingAndPay,
        viewReceipt,
        closeReceiptModal,
        openNotificationsDrawer,
        closeNotificationsDrawer,
        resendReceiptNotification,
        dismissToastNotification,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
