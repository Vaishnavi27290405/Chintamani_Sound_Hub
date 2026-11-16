export type PackageTier = 'simple' | 'silver' | 'gold' | 'custom';

export interface SoundAddOn {
  id: string;
  name: string;
  category: 'bass' | 'lighting' | 'monitors' | 'power' | 'special_fx' | 'recording';
  price: number;
  description: string;
  iconName: string;
  selected?: boolean;
}

export interface SoundPackage {
  id: PackageTier;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  recommendedFor: string;
  suitableEvents?: string[];
  crowdCapacity: string;
  wattageRMS: string;
  badge?: string;
  isPopular?: boolean;
  image: string;
  specs: {
    lineArrayTops: string;
    subwoofers: string;
    amplification: string;
    mixerConsole: string;
    microphones: string;
    stageMonitors: string;
    lightingAndTruss: string;
    soundCrew: string;
    dolbyCalibration: string;
  };
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
}

export type PaymentMethod = 'upi_qr' | 'card' | 'netbanking' | 'emi';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentDetails {
  transactionId: string;
  method: PaymentMethod;
  amount: number;
  advanceAmountPaid: number;
  balanceDue: number;
  status: PaymentStatus;
  paidAt: string;
  bankOrUpiRef?: string;
  receiptNumber: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  user: User;
  packageId: PackageTier;
  packageName: string;
  packagePrice: number;
  selectedAddOns: SoundAddOn[];
  addOnsTotal: number;
  subtotal: number;
  taxAmount: number; // 18% GST standard on audio/events
  totalAmount: number;
  advancePercentage: number;
  amountToPayNow: number;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventType: string;
  venueName: string;
  venueCity: string;
  venueAddress: string;
  expectedGuests: number;
  specialInstructions?: string;
  payment: PaymentDetails;
  status: 'Confirmed' | 'Sound Check Scheduled' | 'Rig Dispatched' | 'Completed';
  createdAt: string;
  emailSent: boolean;
  smsSent: boolean;
}

export interface SentNotification {
  id: string;
  bookingId: string;
  recipientEmail: string;
  recipientPhone: string;
  type: 'email' | 'sms';
  subject: string;
  content: string;
  sentAt: string;
  receiptUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Festivals & Ganpati' | 'Gavdev & Miravnuk' | 'Weddings & Varat' | 'Concerts' | 'DJ Nights' | 'Lloyd Lee Rigs';
  imageUrl: string;
  fallbackUrl?: string;
  date: string;
  location: string;
  crowdCount: string;
  soundSetup: string;
  isRealSetupPhoto?: boolean;
}

export interface CustomerReview {
  id: string;
  clientName: string;
  roleOrEvent: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBooking: boolean;
}
