import React from 'react';
import {
  Volume2,
  Sparkles,
  ShieldCheck,
  Zap,
  Disc,
  Play,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Speaker,
  Flame,
  Instagram,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { SOUND_PACKAGES } from '../data/packagesData';

interface HeroProps {
  onExplorePackages: () => void;
  onBookNow: (tier?: 'simple' | 'silver' | 'gold') => void;
  onOpenSoundDemo: () => void;
  onViewGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePackages,
  onBookNow,
  onOpenSoundDemo,
  onViewGallery,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 sm:pt-16 sm:pb-28">
      {/* Background Neon Atmospheric Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[140px] mix-blend-screen"></div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 bg-indigo-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Grid line background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f0a3815_1px,transparent_1px),linear-gradient(to_bottom,#1f0a3815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#1c0636]/90 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
              Chintamani Sound • LLOYD LEE Series 2026
            </span>
            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
              Dolby Certified
            </span>
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            FEEL THE CHEST-THUMPING POWER OF{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              DOLBY LLOYD LEE
            </span>{' '}
            STAGE SOUND
          </h1>
          <p className="mt-5 text-base sm:text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
            Experience ultra-high-definition live concert audio, tractor mobile trailers, high-throw line arrays, dual 18" ground-shaking subwoofers, and digital stage mixing for Birthdays, Weddings, Gavdev Sohala, Varat, and Ganpati/Durga Devi Festivals.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onBookNow('silver')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Book Event Package Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 border border-pink-500/40 text-pink-200 font-bold text-sm flex items-center space-x-2 shadow-lg transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@chintamani_soundsatara</span>
            </a>

            <button
              onClick={onOpenSoundDemo}
              className="px-5 py-3.5 rounded-xl bg-[#180530] hover:bg-purple-900/50 border border-purple-500/40 text-purple-200 font-semibold text-sm flex items-center space-x-2 shadow-lg transition-all hover:scale-105"
            >
              <Disc className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Test Dolby Sub Bass</span>
            </button>

            <a
              href="tel:+919175136546"
              className="px-5 py-3.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 font-mono font-bold text-sm flex items-center space-x-1.5 transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-purple-400" />
              <span>+91 91751 36546</span>
            </a>
          </div>

          {/* Location Badge */}
          <div className="mt-5 flex items-center justify-center space-x-2 text-xs text-purple-300/80">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>Base Production Yard: <strong>Lhasurne, Koregaon (Satara), Maharashtra</strong></span>
          </div>

          {/* Live Trust Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#140428]/80 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">24,000W</div>
              <div className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                Max RMS Output
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#140428]/80 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-purple-300 font-mono">30Hz - 80Hz</div>
              <div className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                Ultra Sub-Bass
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#140428]/80 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-white font-mono">500+</div>
              <div className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                Live Concerts & Rallies
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#140428]/80 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">Instant</div>
              <div className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                SMS & Email Tax Receipt
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature Visual Showcase */}
        <div className="mt-14 relative rounded-3xl p-1 bg-gradient-to-b from-purple-500/40 via-purple-900/20 to-transparent shadow-[0_0_60px_rgba(147,51,234,0.25)]">
          <div className="rounded-[22px] overflow-hidden bg-[#0a0114] border border-purple-500/30">
            {/* Top Toolbar */}
            <div className="px-6 py-3 bg-[#130426] border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="text-purple-300/80 font-mono ml-2">
                  LLOYD_LEE_DOLBY_ACOUSTIC_STAGE_ARRAY.DSP
                </span>
              </div>

              <div className="flex items-center space-x-4 font-mono text-[11px] text-purple-300">
                <span>STAGE TRUSS: 40FT HEAVY ALUMINUM</span>
                <span className="text-emerald-400 font-bold">DIGITAL MIXER: ACTIVE 96kHz</span>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Main Image with Gradient Overlay */}
              <div className="lg:col-span-8 relative min-h-[280px] sm:min-h-[380px] bg-black">
                <img
                  src="/sound1.jpg"
                  alt="Chintamani Sound Live Dolby Concert Stage"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0114] via-transparent to-black/40"></div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-600/80 text-white text-xs font-bold backdrop-blur-md">
                      Live Event Rig: LLOYD LEE Series
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      Dual 18" Horn-Loaded Subwoofers + Line Arrays
                    </h3>
                    <p className="text-xs text-purple-200/80">
                      Crystal voice clarity for Gavdev, Varat, Ganpati & Durga Devi Festivals.
                    </p>
                  </div>

                  <button
                    onClick={onViewGallery}
                    className="px-4 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-purple-400/40 text-purple-200 text-xs font-semibold shrink-0 transition-colors"
                  >
                    Explore Live Gallery →
                  </button>
                </div>
              </div>

              {/* Sidebar Quick Package Tiers */}
              <div className="lg:col-span-4 p-5 bg-[#0e021c] border-t lg:border-t-0 lg:border-l border-purple-500/20 flex flex-col justify-between space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                  <span>Available Sound Packages</span>
                  <span className="text-[10px] text-emerald-400 font-mono">ONLINE BOOKING</span>
                </div>

                <div className="space-y-2.5">
                  {SOUND_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onBookNow(pkg.id)}
                      className="p-3 rounded-xl bg-[#150529] hover:bg-purple-900/40 border border-purple-500/20 hover:border-purple-400/50 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                          {pkg.name}
                        </div>
                        <div className="font-mono font-bold text-purple-300 text-xs">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-purple-300/70 mt-1">
                        <span>{pkg.crowdCapacity}</span>
                        <span className="font-mono text-purple-400">{pkg.wattageRMS}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-purple-500/20">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Instant SMS & Tax Invoice on Payment
                    </div>
                    <div className="text-[11px] text-purple-300/70">
                      Explore our full site freely. Register / login when checking out your event package.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
