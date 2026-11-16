import React from 'react';
import { Volume2, ShieldCheck, Heart, PhoneCall, Mail, MapPin, Disc, Instagram, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenSoundDemo: () => void;
  onOpenDjangoHub?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSoundDemo, onOpenDjangoHub }) => {
  return (
    <footer className="bg-[#05010a] border-t border-purple-500/20 text-purple-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <div className="w-full h-full bg-[#0d021a] rounded-[10px] flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-base font-black tracking-wider text-white">
                  CHINTAMANI SOUND
                </span>
                <span className="text-[10px] block uppercase font-bold tracking-widest text-purple-400">
                  LLOYD LEE SERIES • DOLBY SOUND SYSTEMS
                </span>
              </div>
            </div>

            <p className="text-purple-300/80 leading-relaxed max-w-sm">
              Official live concert sound, high-excursion horn subwoofers, line arrays, and digital console acoustics for grand weddings, Gavdev Sohala, Varat, and Ganpati/Durga Devi festivals across Maharashtra.
            </p>

            <div className="p-3 rounded-xl bg-[#110321] border border-purple-500/20 space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2 text-white font-bold">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Lhasurne, Koregaon — Satara, Maharashtra</span>
              </div>
              <div className="text-purple-300/80">
                At Post Lhasurne, Taluka Koregaon, Dist. Satara 415501
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 border border-pink-500/40 text-pink-200 font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@chintamani_soundsatara</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="tel:+919175136546"
                className="px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 font-mono font-bold flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
                <span>+91 91751 36546</span>
              </a>

              <button
                onClick={onOpenSoundDemo}
                className="px-3 py-1.5 rounded-lg bg-[#140529] hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 font-semibold flex items-center gap-1.5"
              >
                <Disc className="w-3.5 h-3.5 text-purple-400" />
                <span>Dolby Sub Bass Test</span>
              </button>

              {onOpenDjangoHub && (
                <button
                  onClick={onOpenDjangoHub}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5"
                >
                  <span>Python & Django DB</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 3: Packages */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">
              Sound Packages
            </h4>
            <ul className="space-y-2 text-purple-300/80">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('packages');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Simple Package (3,500W)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('packages');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Silver Package (9,000W) ★
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('packages');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Gold Package (24,000W)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('bookings');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-purple-400 font-bold"
                >
                  Online Booking Engine →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2 text-purple-300/80">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  About LLOYD LEE Acoustics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Live Stage Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Desk & Helpline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Invoicing */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">
              Verified Payments
            </h4>
            <p className="text-purple-300/80 leading-relaxed">
              Integrated UPI, Cards & NetBanking with instant GST Tax Invoices dispatched via SMS and Email.
            </p>
            <div className="p-2.5 rounded-xl bg-[#110321] border border-purple-500/20 text-[10px] text-purple-300 font-mono space-y-1">
              <div>✓ Base: Lhasurne, Koregaon (Satara)</div>
              <div>✓ GSTIN Registered Business</div>
              <div>✓ 256-Bit SSL Encrypted</div>
              <div>✓ Instant Booking Gatepass</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-purple-400/80 text-[11px]">
          <div>
            © {new Date().getFullYear()} Chintamani Sound (LLOYD LEE Series) • Lhasurne, Koregaon - Satara, Maharashtra.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
              target="_blank"
              rel="noreferrer"
              className="text-pink-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram: @chintamani_soundsatara</span>
            </a>
            <span>•</span>
            <a href="tel:+919175136546" className="text-purple-300 hover:text-white font-mono">
              +91 91751 36546
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
