import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { SOUND_PACKAGES, SOUND_ADD_ONS } from '../data/packagesData';
import { PackageTier, SoundAddOn, Booking } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  Sparkles,
  Lock,
  UserCheck,
  UserPlus,
  HelpCircle,
  FileText,
  Smartphone,
  Mail,
  ChevronRight,
  Sliders
} from 'lucide-react';

interface BookingWizardProps {
  onOpenPaymentModal: () => void;
  onOpenSoundDemo: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  onOpenPaymentModal,
  onOpenSoundDemo,
}) => {
  const {
    draft,
    selectPackage,
    toggleAddOn,
    updateDraftField,
    calculatePricing,
  } = useBooking();

  const { user, isAuthenticated, openAuthModal } = useAuth();
  const pricing = calculatePricing();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const currentPkg = SOUND_PACKAGES.find((p) => p.id === draft.packageTier) || SOUND_PACKAGES[1];

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      openAuthModal('register', () => {
        onOpenPaymentModal();
      });
    } else {
      onOpenPaymentModal();
    }
  };

  return (
    <section id="bookings-wizard" className="py-16 sm:py-24 bg-[#07010f] relative">
      {/* Background glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Online Booking & Rig Reservation Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            BOOK CHINTAMANI LLOYD LEE AUDIO
          </h2>
          <p className="mt-2 text-sm sm:text-base text-purple-200/80">
            Customize your live sound setup, lock your event date, and pay securely online.
          </p>
        </div>

        {/* 3 Step Progress Indicator */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <button
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                currentStep === 1
                  ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#120324] border-purple-900/40 text-purple-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span>1. Choose Package & Add-ons</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                currentStep === 2
                  ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#120324] border-purple-900/40 text-purple-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-black">
                2
              </span>
              <span>2. Event & Venue Logistics</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                currentStep === 3
                  ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#120324] border-purple-900/40 text-purple-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-black">
                3
              </span>
              <span>3. Review & Secure Checkout</span>
            </button>
          </div>
        </div>

        {/* Main Wizard Container */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Panels */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: Package & Add-ons */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Package Cards Selector */}
                <div className="p-6 rounded-2xl bg-[#0f041d] border border-purple-500/30 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center justify-between">
                    <span>Select Base Event Audio Package</span>
                    <button
                      onClick={onOpenSoundDemo}
                      className="text-xs text-purple-400 hover:text-purple-200 font-normal underline flex items-center gap-1"
                    >
                      <span>Listen to Dolby Demo</span>
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SOUND_PACKAGES.map((pkg) => {
                      const isSelected = draft.packageTier === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => selectPackage(pkg.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-purple-950/80 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
                              : 'bg-[#150529] border-purple-900/40 hover:border-purple-600/40'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                              {pkg.name}
                            </span>
                            {isSelected && (
                              <span className="p-1 rounded-full bg-purple-500 text-white">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <div className="mt-2 text-xl font-black font-mono text-white">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-purple-300/70 font-mono mt-0.5">
                            {pkg.wattageRMS}
                          </div>
                          <div className="text-[10px] text-purple-400 mt-2 font-medium">
                            {pkg.crowdCapacity}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Package Highlight Box */}
                  <div className="p-4 rounded-xl bg-[#080112] border border-purple-900/40 text-xs text-purple-200 space-y-2">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>Included in {currentPkg.name}:</span>
                      <span className="text-purple-400 font-mono">{currentPkg.wattageRMS}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-purple-300">
                      <div>• Tops: {currentPkg.specs.lineArrayTops}</div>
                      <div>• Subwoofers: {currentPkg.specs.subwoofers}</div>
                      <div>• Sound Desk: {currentPkg.specs.mixerConsole}</div>
                      <div>• Microphones: {currentPkg.specs.microphones}</div>
                    </div>
                  </div>
                </div>

                {/* Custom Audio Add-Ons */}
                <div className="p-6 rounded-2xl bg-[#0f041d] border border-purple-500/30 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center justify-between">
                    <span>Optional Acoustic & Stage Add-ons</span>
                    <span className="text-xs text-purple-300/70">
                      Selected: {draft.selectedAddOns.length}
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SOUND_ADD_ONS.map((addon) => {
                      const isSelected = draft.selectedAddOns.some((item) => item.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-purple-900/40 border-purple-400 text-white shadow-md'
                              : 'bg-[#150529] border-purple-900/40 text-purple-300 hover:border-purple-600/40'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-bold text-xs text-white">{addon.name}</div>
                            <div className="text-[11px] text-purple-300/70 leading-relaxed">
                              {addon.description}
                            </div>
                            <div className="text-xs font-mono font-bold text-purple-400 pt-1">
                              +₹{addon.price.toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-purple-600 border-purple-400 text-white'
                                : 'border-purple-500/40 bg-purple-950/40'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
                  >
                    <span>Proceed to Event & Venue Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Event & Venue Logistics */}
            {currentStep === 2 && (
              <div className="p-6 rounded-2xl bg-[#0f041d] border border-purple-500/30 space-y-5 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white">Event Date & Venue Logistics</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Event Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        value={draft.eventDate}
                        onChange={(e) => updateDraftField('eventDate', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Event Category *</label>
                    <select
                      value={draft.eventType}
                      onChange={(e) =>
                        updateDraftField('eventType', e.target.value as Booking['eventType'])
                      }
                      className="w-full px-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
                    >
                      <option value="Private Celebration">Birthday Parties, Anniversaries & Private Events (Simple Package)</option>
                      <option value="Wedding & Sangeet">Marriage & Sangeet Ceremony</option>
                      <option value="Gavdev Sohala & Varat">Gavdev Sohala, Varat & Miravnuk (Silver Package)</option>
                      <option value="Festival / Shobha Yatra">Festivals, Ganpati & Durga Devi Navratri (Gold Package)</option>
                      <option value="Live Concert / Band">Live Concert / Band Performance</option>
                      <option value="DJ Night">DJ Night / EDM Dance Party</option>
                      <option value="Corporate Event">Corporate Event / Conference</option>
                      <option value="Other">Other Custom Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Sound Start Time *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                      <input
                        type="time"
                        value={draft.eventStartTime}
                        onChange={(e) => updateDraftField('eventStartTime', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Sound End Time *</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                      <input
                        type="time"
                        value={draft.eventEndTime}
                        onChange={(e) => updateDraftField('eventEndTime', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Venue Name / Lawn *</label>
                    <input
                      type="text"
                      placeholder="e.g. Grand Celebration Lawns"
                      value={draft.venueName}
                      onChange={(e) => updateDraftField('venueName', e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">City / Region *</label>
                    <input
                      type="text"
                      placeholder="e.g. Pune / Mumbai / Nashik / Kolhapur"
                      value={draft.venueCity}
                      onChange={(e) => updateDraftField('venueCity', e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-purple-200 mb-1">Full Venue Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Plot No 42, Highway Junction, Baner, Pune 411045"
                      value={draft.venueAddress}
                      onChange={(e) => updateDraftField('venueAddress', e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Expected Crowd Size</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="50"
                        step="50"
                        value={draft.expectedGuests}
                        onChange={(e) => updateDraftField('expectedGuests', parseInt(e.target.value) || 100)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-purple-200 mb-1">
                      Acoustic Preferences / Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need high bass tuning for DJ stage, 4 extra wireless mic channels for live singers..."
                      value={draft.specialInstructions}
                      onChange={(e) => updateDraftField('specialInstructions', e.target.value)}
                      className="w-full px-3 py-2 bg-[#17062e] border border-purple-500/30 rounded-xl text-white text-xs placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-300 text-xs font-semibold hover:bg-purple-900 transition-colors"
                  >
                    ← Back to Packages
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-md transition-all hover:scale-105"
                  >
                    <span>Proceed to Review & Auth</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review & Customer Verification */}
            {currentStep === 3 && (
              <div className="p-6 rounded-2xl bg-[#0f041d] border border-purple-500/30 space-y-6 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white">Review & Customer Credentials</h3>

                {/* Authentication Status Check */}
                <div className="p-4 rounded-xl bg-[#140529] border border-purple-500/30">
                  {isAuthenticated && user ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{user.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                              Registered & Logged In
                            </span>
                          </div>
                          <div className="text-xs text-purple-300 font-mono mt-0.5 flex flex-wrap gap-x-3">
                            <span>Email: <strong>{user.email}</strong></span>
                            <span>SMS to: <strong>{user.phone}</strong></span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => openAuthModal('login')}
                        className="text-xs text-purple-300 hover:text-white underline font-semibold"
                      >
                        Switch Account
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-white font-bold text-sm">
                          <UserPlus className="w-4 h-4 text-purple-400" />
                          <span>Customer Registration Required For Invoices</span>
                        </div>
                        <p className="text-xs text-purple-300/80">
                          Register your mobile and email to receive the official Tax Invoice, booking gatepass, and SMS alerts.
                        </p>
                      </div>

                      <button
                        onClick={() => openAuthModal('register')}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 shrink-0 transition-all hover:scale-105"
                      >
                        Register / Login (10 sec)
                      </button>
                    </div>
                  )}
                </div>

                {/* Advance vs Full Payment selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => updateDraftField('advancePercentage', 100)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        draft.advancePercentage === 100
                          ? 'bg-purple-900/50 border-purple-400 text-white shadow-md'
                          : 'bg-[#140529] border-purple-900/40 text-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center font-bold text-xs">
                        <span>100% Full Payment (Zero Balance)</span>
                        <span className="text-emerald-400 font-mono">
                          ₹{pricing.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-300/70 mt-1">
                        Includes 18% GST tax invoice & full priority equipment locking.
                      </p>
                    </div>

                    <div
                      onClick={() => updateDraftField('advancePercentage', 30)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        draft.advancePercentage === 30
                          ? 'bg-purple-900/50 border-purple-400 text-white shadow-md'
                          : 'bg-[#140529] border-purple-900/40 text-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center font-bold text-xs">
                        <span>30% Advance Token Booking</span>
                        <span className="text-purple-300 font-mono">
                          ₹{Math.round(pricing.totalAmount * 0.3).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-300/70 mt-1">
                        Pay 30% now to reserve rig. Balance payable on setup day.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-300 text-xs font-semibold hover:bg-purple-900 transition-colors"
                  >
                    ← Back to Logistics
                  </button>

                  <button
                    onClick={handleCheckoutClick}
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isAuthenticated
                        ? `Pay ₹${pricing.amountToPayNow.toLocaleString('en-IN')} Securely Online`
                        : 'Register & Proceed to Payment'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-6 rounded-2xl bg-[#0e031a] border border-purple-500/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Event Sound Summary
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  LLOYD LEE Rig
                </span>
              </div>

              {/* Package details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-white font-bold">
                  <span>{currentPkg.name}</span>
                  <span className="font-mono">₹{pricing.packagePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[11px] text-purple-300/70">
                  {currentPkg.wattageRMS} • {currentPkg.crowdCapacity}
                </div>

                {/* Event Schedule */}
                <div className="pt-2 text-[11px] text-purple-200/80 space-y-1">
                  <div>
                    📅 Date: <strong>{draft.eventDate}</strong> ({draft.eventStartTime} - {draft.eventEndTime})
                  </div>
                  <div className="truncate">
                    📍 Venue: <strong>{draft.venueName}, {draft.venueCity}</strong>
                  </div>
                </div>

                {/* Add-ons list */}
                {draft.selectedAddOns.length > 0 && (
                  <div className="pt-2 border-t border-purple-900/40 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Add-ons Included:
                    </div>
                    {draft.selectedAddOns.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex justify-between text-[11px] text-purple-200"
                      >
                        <span className="truncate max-w-[170px]">{addon.name}</span>
                        <span className="font-mono text-purple-300">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Calculation Table */}
              <div className="pt-3 border-t border-purple-500/30 space-y-2 text-xs">
                <div className="flex justify-between text-purple-300/80">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{pricing.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-purple-300/80">
                  <span>GST (18% Audio Tax):</span>
                  <span className="font-mono">₹{pricing.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-purple-500/20">
                  <span>Total Event Cost:</span>
                  <span className="font-mono text-purple-300">
                    ₹{pricing.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 flex justify-between items-center text-emerald-400 font-bold">
                  <span className="text-xs">Amount Payable Now:</span>
                  <span className="font-mono text-base">
                    ₹{pricing.amountToPayNow.toLocaleString('en-IN')}
                  </span>
                </div>

                {pricing.balanceDue > 0 && (
                  <div className="text-[11px] text-amber-300 font-medium">
                    * Remaining balance ₹{pricing.balanceDue.toLocaleString('en-IN')} due on sound setup day.
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                <span>
                  {isAuthenticated ? 'Proceed to Online Payment' : 'Register & Checkout'}
                </span>
              </button>

              <div className="pt-2 text-[10px] text-purple-400 text-center space-y-1">
                <div>🔒 256-Bit SSL Encrypted Payment Gateway</div>
                <div>📱 Instant SMS & Tax Invoice to registered credentials</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
