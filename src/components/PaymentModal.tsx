import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { PaymentMethod } from '../types';
import { SOUND_PACKAGES } from '../data/packagesData';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  CheckCircle2,
  Loader2,
  X,
  Smartphone,
  Copy,
  Check,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { draft, calculatePricing, confirmBookingAndPay } = useBooking();
  const { user } = useAuth();
  const pricing = calculatePricing();
  const currentPkg = SOUND_PACKAGES.find((p) => p.id === draft.packageTier) || SOUND_PACKAGES[1];

  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('upi_qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpValue, setOtpValue] = useState('4928');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8842');
  const [cardHolder, setCardHolder] = useState(user?.name || 'Vaishnavi Kawale');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('784');

  // Selected Bank for Netbanking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('chintamanisound@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleInitiatePayment = async () => {
    if (activeMethod === 'card') {
      setShowOtpDialog(true);
      return;
    }

    processFinalPayment(activeMethod);
  };

  const processFinalPayment = async (method: PaymentMethod, customRef?: string) => {
    setIsProcessing(true);
    setShowOtpDialog(false);

    try {
      // Simulate real bank authorization delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#6366f1', '#fbbf24'],
      });

      await confirmBookingAndPay(method, customRef);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-[#0d031a] border border-purple-500/40 rounded-2xl shadow-[0_0_60px_rgba(147,51,234,0.4)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#150529]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Chintamani Secure Checkout</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  256-Bit SSL Encrypted
                </span>
              </div>
              <p className="text-xs text-purple-300/70">
                Booking for: <strong className="text-white">{currentPkg.name}</strong> • {draft.eventDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Payment Method Selector Sidebar */}
          <div className="md:col-span-5 p-4 border-b md:border-b-0 md:border-r border-purple-500/20 bg-[#090114]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">
              Select Payment Gateway
            </h4>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveMethod('upi_qr')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  activeMethod === 'upi_qr'
                    ? 'bg-purple-900/50 border-purple-400 text-white shadow-md shadow-purple-900/30'
                    : 'bg-[#120324] border-purple-900/40 text-purple-300 hover:border-purple-600/40'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">UPI / QR Code</div>
                    <div className="text-[10px] text-purple-300/60">GPay, PhonePe, Paytm, BHIM</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Instant
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('card')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  activeMethod === 'card'
                    ? 'bg-purple-900/50 border-purple-400 text-white shadow-md shadow-purple-900/30'
                    : 'bg-[#120324] border-purple-900/40 text-purple-300 hover:border-purple-600/40'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Credit / Debit Card</div>
                    <div className="text-[10px] text-purple-300/60">Visa, MasterCard, RuPay</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('netbanking')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  activeMethod === 'netbanking'
                    ? 'bg-purple-900/50 border-purple-400 text-white shadow-md shadow-purple-900/30'
                    : 'bg-[#120324] border-purple-900/40 text-purple-300 hover:border-purple-600/40'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Net Banking</div>
                    <div className="text-[10px] text-purple-300/60">50+ Indian Banks</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Price Summary Box in Sidebar */}
            <div className="mt-5 p-3 rounded-xl bg-[#140529] border border-purple-500/20 space-y-1.5 text-xs">
              <div className="flex justify-between text-purple-300/80">
                <span>{currentPkg.name}:</span>
                <span>₹{pricing.packagePrice.toLocaleString('en-IN')}</span>
              </div>
              {pricing.addOnsTotal > 0 && (
                <div className="flex justify-between text-purple-300/80">
                  <span>Sound Add-ons ({draft.selectedAddOns.length}):</span>
                  <span>₹{pricing.addOnsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-purple-300/80">
                <span>GST (18%):</span>
                <span>₹{pricing.taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-purple-500/30 flex justify-between font-bold text-white text-sm">
                <span>Payable Now:</span>
                <span className="text-purple-300 font-mono">
                  ₹{pricing.amountToPayNow.toLocaleString('en-IN')}
                </span>
              </div>
              {pricing.balanceDue > 0 && (
                <div className="text-[11px] text-amber-300 font-medium">
                  * Balance ₹{pricing.balanceDue.toLocaleString('en-IN')} payable at sound check.
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="md:col-span-7 p-6 bg-[#0f041d]">
            {/* UPI View */}
            {activeMethod === 'upi_qr' && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-xl bg-[#17062e] border border-purple-500/30 inline-block">
                  {/* Dynamic SVG QR Code Representation with Chintamani logo center */}
                  <div className="relative p-3 bg-white rounded-xl shadow-inner inline-block">
                    <svg
                      className="w-36 h-36 mx-auto text-black"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      {/* Stylized QR Code Pattern */}
                      <path d="M0 0h30v30H0zM5 5h20v20H5zM10 10h10v10H10zM70 0h30v30H70zM75 5h20v20H75zM80 10h10v10H80zM0 70h30v30H0zM5 75h20v20H5zM10 80h10v10H10zM35 10h5v10h-5zM45 5h10v5H45zM35 25h15v5H35zM55 20h10v10H55zM10 35h5v15h-5zM20 40h10v5H20zM35 40h10v10H35zM50 35h10v10H50zM65 40h15v5H65zM85 35h10v15H85zM40 55h20v10H40zM10 55h15v10H10zM70 55h20v5H70zM35 70h10v15H35zM50 75h10v20H50zM70 70h10v10H70zM85 80h10v15H85zM65 85h15v10H65z" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-1.5 py-0.5 text-[8px] font-black bg-purple-600 text-white rounded border border-white">
                        DOLBY
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-bold text-white">
                    Scan with any UPI App
                  </div>
                  <div className="text-[11px] text-purple-300 font-mono">
                    Pay ₹{pricing.amountToPayNow.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <div className="px-3 py-1.5 rounded-lg bg-purple-950/70 border border-purple-500/20 text-xs font-mono text-purple-200">
                    UPI ID: <strong className="text-white">chintamanisound@icici</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded-lg bg-purple-800/40 text-purple-300 hover:text-white border border-purple-500/30 transition-colors"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/40 text-center text-[10px] text-purple-300">
                    Google Pay
                  </div>
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/40 text-center text-[10px] text-purple-300">
                    PhonePe
                  </div>
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/40 text-center text-[10px] text-purple-300">
                    Paytm
                  </div>
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/40 text-center text-[10px] text-purple-300">
                    BHIM UPI
                  </div>
                </div>
              </div>
            )}

            {/* Card View */}
            {activeMethod === 'card' && (
              <div className="space-y-3.5">
                {/* Visual Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-800 via-indigo-900 to-black border border-purple-400/40 shadow-lg shadow-purple-950 text-white">
                  <div className="flex justify-between items-center text-xs font-bold tracking-widest text-purple-200 uppercase">
                    <span>Chintamani Dolby Card</span>
                    <span className="text-amber-400">RUPAY / VISA</span>
                  </div>
                  <div className="mt-4 font-mono text-base tracking-widest text-white">
                    {cardNumber}
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-mono">
                    <div>
                      <div className="text-[9px] text-purple-300 uppercase">Card Holder</div>
                      <div className="text-white font-sans font-medium truncate max-w-[140px]">
                        {cardHolder}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-purple-300 uppercase">Expires</div>
                      <div className="text-white">{cardExpiry}</div>
                    </div>
                  </div>
                </div>

                {/* Card input forms */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-[#17052e] border border-purple-500/30 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-purple-200 font-semibold mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-[#17052e] border border-purple-500/30 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-purple-200 font-semibold mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-[#17052e] border border-purple-500/30 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking View */}
            {activeMethod === 'netbanking' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-purple-200">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map(
                    (bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          selectedBank === bank
                            ? 'bg-purple-900/60 border-purple-400 text-white shadow-md'
                            : 'bg-[#140529] border-purple-900/40 text-purple-300 hover:border-purple-600/40'
                        }`}
                      >
                        {bank}
                      </button>
                    )
                  )}
                </div>
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300/80">
                  You will be safely routed to <strong className="text-white">{selectedBank}</strong>'s 3D secure portal to authorize ₹{pricing.amountToPayNow.toLocaleString('en-IN')}.
                </div>
              </div>
            )}

            {/* Action Pay Button */}
            <div className="mt-6 pt-3 border-t border-purple-500/20">
              <button
                type="button"
                onClick={handleInitiatePayment}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/40 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Authorizing Payment with Bank...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>
                      Pay ₹{pricing.amountToPayNow.toLocaleString('en-IN')} & Confirm Sound Booking
                    </span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-purple-300/60 mt-2">
                Instant digital receipt, SMS & Email will be dispatched automatically upon completion.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Secure OTP Simulation Dialog */}
        {showOtpDialog && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="w-full max-w-sm bg-[#130526] border border-purple-500/50 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400 text-purple-300 flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Bank 3D Secure Verification</h4>
                <p className="text-xs text-purple-300/80 mt-1">
                  Enter the 4-digit OTP sent to customer registered mobile ({user?.phone || '+91 98220 54321'})
                </p>
              </div>

              <div className="p-3 bg-[#0a0114] rounded-xl border border-purple-500/30">
                <div className="text-[11px] text-purple-400 mb-1">Demo OTP Code</div>
                <div className="text-2xl font-mono font-bold tracking-widest text-white">
                  4 9 2 8
                </div>
              </div>

              <input
                type="text"
                maxLength={4}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="w-32 mx-auto text-center py-2 bg-[#1b0736] border border-purple-400 rounded-xl text-white font-mono text-xl tracking-widest focus:outline-none"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtpDialog(false)}
                  className="flex-1 py-2 rounded-xl bg-purple-950 text-purple-300 text-xs font-semibold hover:bg-purple-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => processFinalPayment('card', 'CARD/3DS/AUTH_9842')}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:from-purple-500 hover:to-indigo-500 transition-colors"
                >
                  Submit & Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
