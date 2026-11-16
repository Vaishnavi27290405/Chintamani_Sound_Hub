import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Share2,
  Mail,
  MessageSquare,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  Speaker,
  Sparkles
} from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { currentReceiptBooking, isReceiptModalOpen, closeReceiptModal, openNotificationsDrawer } = useBooking();

  if (!isReceiptModalOpen || !currentReceiptBooking) return null;

  const booking = currentReceiptBooking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#0d031a] border border-purple-500/40 rounded-2xl shadow-[0_0_70px_rgba(147,51,234,0.45)] overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-purple-500/20 bg-[#15052a]">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Payment & Booking Verified
            </span>
            <span className="text-xs text-purple-300/60 font-mono">
              • Ref: {booking.bookingCode}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openNotificationsDrawer('sms')}
              className="px-2.5 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-800/50 text-purple-200 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
              <span>View SMS</span>
            </button>

            <button
              onClick={() => openNotificationsDrawer('email')}
              className="px-2.5 py-1 rounded-lg bg-purple-900/40 hover:bg-purple-800/50 text-purple-200 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>View Email</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={closeReceiptModal}
              className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="tax-invoice-printable" className="p-6 sm:p-8 bg-[#090213] text-purple-100 print:bg-white print:text-black print:p-8">
          {/* Company Branding & Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b border-purple-500/20 print:border-gray-300">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                  CS
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-wider text-white print:text-black">
                    CHINTAMANI SOUND
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 print:text-purple-700 block">
                    LLOYD LEE SERIES • DOLBY DIGITAL SOUND SYSTEMS
                  </span>
                </div>
              </div>
              <p className="text-xs text-purple-300/80 print:text-gray-600 mt-2 max-w-sm">
                Pro Live Concert Audio, Line Arrays, Stage Truss, Dolby Surround Productions & DJ Rigs.
                <br />
                <span className="font-mono text-[11px]">GSTIN: 27AABCC8924K1Z8 • Reg No: MH-2026-CS-991</span>
              </p>
            </div>

            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <div className="inline-block px-3 py-1 rounded bg-purple-950/80 border border-purple-400/40 print:border-gray-400 text-purple-300 print:text-black text-xs font-bold">
                OFFICIAL TAX INVOICE
              </div>
              <div className="mt-2 text-xs font-mono">
                <div>Invoice No: <strong className="text-white print:text-black">{booking.payment.receiptNumber}</strong></div>
                <div>Date: {new Date(booking.payment.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                <div>Booking Code: <strong className="text-purple-300 print:text-purple-800">{booking.bookingCode}</strong></div>
              </div>
            </div>
          </div>

          {/* Customer & Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-purple-500/20 print:border-gray-300 text-xs">
            <div className="p-3.5 rounded-xl bg-[#130526] print:bg-gray-50 border border-purple-500/20 print:border-gray-200">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-purple-300 print:text-gray-700 mb-2">
                Billed To (Customer Details)
              </h4>
              <div className="space-y-1 font-sans">
                <div className="text-sm font-bold text-white print:text-black">{booking.user.name}</div>
                <div className="text-purple-200 print:text-gray-700">{booking.user.email}</div>
                <div className="text-purple-200 print:text-gray-700">{booking.user.phone}</div>
                <div className="text-purple-300/80 print:text-gray-600">{booking.user.city}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#130526] print:bg-gray-50 border border-purple-500/20 print:border-gray-200">
              <h4 className="text-[11px] uppercase font-bold tracking-wider text-purple-300 print:text-gray-700 mb-2">
                Event Logistics & Venue
              </h4>
              <div className="space-y-1">
                <div className="font-bold text-white print:text-black flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{booking.eventDate} ({booking.eventStartTime} - {booking.eventEndTime})</span>
                </div>
                <div className="text-purple-200 print:text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{booking.venueName}, {booking.venueCity}</span>
                </div>
                <div className="text-purple-300/80 print:text-gray-600 truncate">{booking.venueAddress}</div>
                <div className="text-[11px] text-purple-400 print:text-purple-700 font-semibold">
                  Event: {booking.eventType} • Expected: ~{booking.expectedGuests} Guests
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Sound Hardware & Services Table */}
          <div className="py-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 print:text-gray-700 mb-3">
              Sound Rig & Package Itemization
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-purple-500/30 print:border-gray-300 text-purple-300 print:text-gray-600 text-left font-semibold">
                    <th className="py-2 px-1">Description / Audio Spec</th>
                    <th className="py-2 px-1 text-center">Type</th>
                    <th className="py-2 px-1 text-right">Qty</th>
                    <th className="py-2 px-1 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/40 print:divide-gray-200 font-mono">
                  <tr>
                    <td className="py-2.5 px-1 font-sans">
                      <strong className="text-white print:text-black">{booking.packageName} (Dolby Audio System)</strong>
                      <div className="text-[11px] text-purple-300/70 print:text-gray-600">
                        Line array tops, dual subwoofers, digital sound mixer, Shure wireless mics & sound crew.
                      </div>
                    </td>
                    <td className="py-2.5 px-1 text-center font-sans text-[11px] text-purple-300 print:text-gray-600">
                      Core Rig
                    </td>
                    <td className="py-2.5 px-1 text-right">1 Rig</td>
                    <td className="py-2.5 px-1 text-right font-bold text-white print:text-black">
                      ₹{booking.packagePrice.toLocaleString('en-IN')}
                    </td>
                  </tr>

                  {booking.selectedAddOns.map((addon) => (
                    <tr key={addon.id}>
                      <td className="py-2 px-1 font-sans">
                        <span className="text-purple-200 print:text-gray-800">{addon.name}</span>
                        <div className="text-[10px] text-purple-400 print:text-gray-500">{addon.description}</div>
                      </td>
                      <td className="py-2 px-1 text-center font-sans text-[11px] text-purple-300 print:text-gray-600">
                        Add-On
                      </td>
                      <td className="py-2 px-1 text-right">1</td>
                      <td className="py-2 px-1 text-right text-purple-200 print:text-gray-800">
                        ₹{addon.price.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations Total Box */}
            <div className="mt-4 pt-4 border-t border-purple-500/30 print:border-gray-300 flex justify-end">
              <div className="w-full sm:w-72 space-y-1.5 text-xs">
                <div className="flex justify-between text-purple-300/80 print:text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{booking.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-purple-300/80 print:text-gray-600">
                  <span>GST (18% Integrated Audio Tax):</span>
                  <span className="font-mono">₹{booking.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-white print:text-black text-sm pt-1 border-t border-purple-500/20 print:border-gray-300">
                  <span>Total Event Audio Value:</span>
                  <span className="font-mono text-purple-300 print:text-black">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-emerald-400 print:text-emerald-700 bg-emerald-950/40 print:bg-emerald-50 p-2 rounded-lg border border-emerald-500/30">
                  <span>Amount Paid Online:</span>
                  <span className="font-mono">₹{booking.payment.advanceAmountPaid.toLocaleString('en-IN')}</span>
                </div>
                {booking.payment.balanceDue > 0 ? (
                  <div className="flex justify-between text-amber-300 print:text-amber-800 font-semibold text-[11px] px-1">
                    <span>Balance Due on Rig Setup:</span>
                    <span className="font-mono">₹{booking.payment.balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-400 font-bold px-1">
                    ✓ Paid in Full (100% Zero Balance)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Stamp, QR Gatepass & Sign-off */}
          <div className="mt-6 pt-6 border-t border-purple-500/20 print:border-gray-300 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* QR Gatepass */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg inline-block shadow">
                <svg className="w-16 h-16 text-black" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0 0h30v30H0zM5 5h20v20H5zM10 10h10v10H10zM70 0h30v30H70zM75 5h20v20H75zM80 10h10v10H80zM0 70h30v30H0zM5 75h20v20H5zM10 80h10v10H10zM35 10h5v10h-5zM45 5h10v5H45zM35 25h15v5H35zM55 20h10v10H55zM10 35h5v15h-5zM20 40h10v5H20zM35 40h10v10H35zM50 35h10v10H50zM65 40h15v5H65zM85 35h10v15H85zM40 55h20v10H40zM10 55h15v10H10zM70 55h20v5H70zM35 70h10v15H35zM50 75h10v20H50zM70 70h10v10H70zM85 80h10v15H85zM65 85h15v10H65z" />
                </svg>
              </div>
              <div className="text-[10px] text-purple-300/80 print:text-gray-600 leading-tight font-mono">
                <strong className="text-white print:text-black block">RIG GATEPASS QR</strong>
                Scan for instant security clearance at venue stage gate.
              </div>
            </div>

            {/* Payment stamp */}
            <div className="text-center">
              <div className="inline-block px-4 py-2 rounded-xl border-2 border-dashed border-emerald-400 text-emerald-400 print:text-emerald-700 print:border-emerald-600 transform -rotate-3 text-xs font-black uppercase tracking-wider">
                ✓ PAYMENT AUTHORIZED
                <div className="text-[9px] font-mono lowercase tracking-normal text-purple-200 print:text-black">
                  {booking.payment.transactionId}
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="text-right text-xs">
              <div className="font-serif italic text-purple-300 print:text-gray-800 text-base">
                Sagar Patil / Vaishnavi
              </div>
              <div className="font-bold text-white print:text-black text-[11px]">
                Authorized Signatory
              </div>
              <div className="text-[10px] text-purple-400 print:text-gray-500">
                Chintamani Sound LLOYD LEE Series
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Notification Banner */}
        <div className="px-6 py-4 bg-[#140529] border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-purple-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Confirmation SMS sent to <strong>{booking.user.phone}</strong> & receipt emailed to <strong>{booking.user.email}</strong>.
            </span>
          </div>

          <button
            onClick={closeReceiptModal}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
