import React, { useState } from 'react';
import { SOUND_PACKAGES, SOUND_ADD_ONS } from '../data/packagesData';
import { SoundPackage, PackageTier } from '../types';
import {
  Check,
  Zap,
  Sparkles,
  Volume2,
  Users,
  ShieldCheck,
  ArrowRight,
  Disc,
  Flame,
  Radio,
  Sliders
} from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackageToBook: (packageId: PackageTier) => void;
  onOpenSoundDemo: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackageToBook,
  onOpenSoundDemo,
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | PackageTier>('all');

  const displayedPackages =
    selectedTab === 'all'
      ? SOUND_PACKAGES
      : SOUND_PACKAGES.filter((p) => p.id === selectedTab);

  return (
    <section id="packages-section" className="py-16 sm:py-24 bg-[#090114] relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Chintamani Sound LLOYD LEE Series Audio Tiering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            PRO DOLBY SOUND PACKAGES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80 leading-relaxed">
            Engineered for pure acoustic impact. Choose from our <strong>Simple</strong> (Birthdays, Anniversaries & Weddings), <strong>Silver</strong> (Gavdev Sohala, Varat & Miravnuk), and <strong>Gold</strong> (Ganpati, Durga Devi & Mega Festivals) packages.
          </p>

          {/* Quick Filter Pill Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="p-1 bg-[#140529] border border-purple-500/30 rounded-xl inline-flex space-x-1">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                All 3 Packages
              </button>
              <button
                onClick={() => setSelectedTab('simple')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === 'simple'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Simple (3,500W)
              </button>
              <button
                onClick={() => setSelectedTab('silver')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === 'silver'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Silver (9,000W) ★
              </button>
              <button
                onClick={() => setSelectedTab('gold')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedTab === 'gold'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Gold (24,000W)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Main Package Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {displayedPackages.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#140428] border-2 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.35)] lg:-translate-y-2'
                    : 'bg-[#0e021c] border border-purple-500/30 hover:border-purple-400/50 shadow-xl'
                }`}
              >
                {/* Popular / Tier Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${
                        isPopular
                          ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white'
                          : 'bg-purple-900 border border-purple-400/50 text-purple-200'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Top / Header */}
                <div className="p-6 sm:p-7 border-b border-purple-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{pkg.name}</h3>
                      <p className="text-xs text-purple-300/80 mt-1 min-h-[32px]">{pkg.tagline}</p>
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="mt-4 pt-4 border-t border-purple-500/20 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black font-mono text-white">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-purple-400/70 line-through font-mono">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] text-purple-300/70 block">
                        Per Event / Full Day Show (Setup Included)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold block">
                        {pkg.wattageRMS}
                      </span>
                      <span className="text-[10px] text-purple-300/60 mt-0.5 block">
                        {pkg.crowdCapacity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image Snapshot */}
                <div className="relative h-44 overflow-hidden bg-black/50">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    onError={(e) => {
                      if (pkg.id === 'simple') {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';
                      } else if (pkg.id === 'silver') {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80';
                      } else {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80';
                      }
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e021c] via-black/20 to-transparent"></div>
                  <div className="absolute bottom-2 left-4 right-4 text-[11px] text-purple-200 font-semibold bg-black/75 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-purple-500/30 truncate">
                    🎯 Best For: {pkg.recommendedFor}
                  </div>
                </div>

                {/* Technical Hardware Specs Sheet & Suitable Events */}
                <div className="p-6 sm:p-7 space-y-4 flex-1">
                  {/* Suitable Events Highlight Box */}
                  {pkg.suitableEvents && (
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Recommended Event Types</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.suitableEvents.map((evt, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-purple-900/60 border border-purple-400/30 text-[11px] text-purple-200 font-medium"
                          >
                            {evt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2.5 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-purple-400" />
                      <span>Audio Hardware Specification</span>
                    </h4>

                    <div className="space-y-2 text-xs bg-[#080112] p-3 rounded-xl border border-purple-900/40 font-sans">
                      <div className="flex justify-between">
                        <span className="text-purple-400/80 font-medium">Tops / Line Array:</span>
                        <span className="text-white text-right font-medium max-w-[170px] truncate">
                          {pkg.specs.lineArrayTops}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400/80 font-medium">Subwoofers:</span>
                        <span className="text-white text-right font-medium max-w-[170px] truncate">
                          {pkg.specs.subwoofers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400/80 font-medium">Sound Console:</span>
                        <span className="text-white text-right font-medium max-w-[170px] truncate">
                          {pkg.specs.mixerConsole}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400/80 font-medium">Stage Mics:</span>
                        <span className="text-white text-right font-medium max-w-[170px] truncate">
                          {pkg.specs.microphones}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400/80 font-medium">Lights & Truss:</span>
                        <span className="text-white text-right font-medium max-w-[170px] truncate">
                          {pkg.specs.lightingAndTruss}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Included Highlights */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                      Package Inclusions
                    </h4>
                    <ul className="space-y-1.5 text-xs text-purple-200">
                      {pkg.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => onSelectPackageToBook(pkg.id)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      isPopular
                        ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/40'
                        : 'bg-[#1b0638] hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-500/40'
                    }`}
                  >
                    <span>Book {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-purple-400/70 mt-2">
                    ✓ Instant SMS & GST Invoice on payment confirmation
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Event Audio Add-ons Grid */}
        <div className="mt-20 p-6 sm:p-8 rounded-2xl bg-[#0e021a] border border-purple-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-1">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>Custom Stage Rigging Add-ons</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Enhance Your Dolby Acoustic Rig
              </h3>
              <p className="text-xs text-purple-300/80">
                You can add these extras during your package booking checkout.
              </p>
            </div>

            <button
              onClick={() => onSelectPackageToBook('silver')}
              className="px-5 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-white text-xs font-bold border border-purple-400/40 transition-colors"
            >
              Start Custom Booking →
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOUND_ADD_ONS.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-xl bg-[#140529] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{addon.name}</h4>
                    <span className="font-mono font-bold text-purple-300 text-xs shrink-0 ml-2">
                      +₹{addon.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-purple-300/70 mt-1.5 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-purple-900/40 flex justify-between items-center text-[11px] text-purple-400 font-mono">
                  <span>Category: {addon.category.toUpperCase()}</span>
                  <span className="text-purple-300">Available on all packages</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
