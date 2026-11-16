import React from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Printer,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mail,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus
} from 'lucide-react';

interface MyBookingsSectionProps {
  onStartNewBooking: () => void;
}

export const MyBookingsSection: React.FC<MyBookingsSectionProps> = ({ onStartNewBooking }) => {
  const { bookings, viewReceipt, openNotificationsDrawer, resendReceiptNotification } = useBooking();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <section className="py-20 bg-[#07010f] min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-[#0f041d] border border-purple-500/40 text-center shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400 text-purple-300 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Login to View Your Bookings</h2>
          <p className="text-xs text-purple-300/80">
            Please log in with your registered email or phone number to access your confirmed sound packages, GST tax invoices, and SMS receipts.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/40"
          >
            Login / Register
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-[#07010f] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Customer Sound Account</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              MY EVENT BOOKINGS & INVOICES
            </h2>
            <p className="text-xs text-purple-300/80 mt-1">
              Logged in as <strong className="text-white">{user.name}</strong> ({user.email} • {user.phone})
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openNotificationsDrawer('sms')}
              className="px-3.5 py-2 rounded-xl bg-[#140529] hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SMS & Email Logs</span>
            </button>

            <button
              onClick={onStartNewBooking}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Another Package</span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#0f041d] rounded-2xl border border-purple-500/20 mt-8 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-950 text-purple-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Event Bookings Found Yet</h3>
            <p className="text-xs text-purple-300/80 max-w-sm mx-auto">
              Explore our LoudLee Series packages (Simple, Silver, Gold) and book online with instant payment receipt and SMS confirmation.
            </p>
            <button
              onClick={onStartNewBooking}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              Explore Packages & Book Now
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 rounded-2xl bg-[#0f041d] border border-purple-500/30 hover:border-purple-400/50 shadow-xl space-y-5 transition-all"
              >
                {/* Booking Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-500/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{booking.packageName}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-purple-300">
                      Booking ID: <strong>{booking.bookingCode}</strong> • Tax Invoice: {booking.payment.receiptNumber}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewReceipt(booking)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all hover:scale-105"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View & Print Tax Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#150529] border border-purple-900/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block font-mono">
                      EVENT SCHEDULE & LOGISTICS
                    </span>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{booking.eventDate}</span>
                    </div>
                    <div className="text-purple-300">
                      Time: {booking.eventStartTime} to {booking.eventEndTime}
                    </div>
                    <div className="text-purple-300 font-semibold">{booking.eventType}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#150529] border border-purple-900/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block font-mono">
                      STAGE VENUE LOCATION
                    </span>
                    <div className="font-bold text-white flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{booking.venueName}</span>
                    </div>
                    <div className="text-purple-300">{booking.venueCity}</div>
                    <div className="text-[11px] text-purple-400 truncate">{booking.venueAddress}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#150529] border border-purple-900/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block font-mono">
                      PAYMENT & RECEIPT STATUS
                    </span>
                    <div className="text-white font-mono font-bold">
                      Total: ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-emerald-400 font-mono font-semibold">
                      Paid: ₹{booking.payment.advanceAmountPaid.toLocaleString('en-IN')} ({booking.payment.method.toUpperCase()})
                    </div>
                    {booking.payment.balanceDue > 0 ? (
                      <div className="text-amber-300 font-mono text-[11px]">
                        Balance Due: ₹{booking.payment.balanceDue.toLocaleString('en-IN')}
                      </div>
                    ) : (
                      <div className="text-emerald-400 text-[11px]">✓ 100% Paid in Full</div>
                    )}
                  </div>
                </div>

                {/* Bottom Notification Dispatch Status & Resend */}
                <div className="pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3 text-purple-300">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> SMS delivered to {booking.user.phone}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Email sent to {booking.user.email}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => resendReceiptNotification(booking.id, 'sms')}
                      className="text-xs text-purple-300 hover:text-white underline"
                    >
                      Resend SMS
                    </button>
                    <span className="text-purple-600">•</span>
                    <button
                      onClick={() => resendReceiptNotification(booking.id, 'email')}
                      className="text-xs text-purple-300 hover:text-white underline"
                    >
                      Resend Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
