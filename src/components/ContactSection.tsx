import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  Volume2,
  Sparkles,
  Instagram,
  Navigation,
  ExternalLink,
  Radio
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState('Satara / Pune');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  const googleMapsDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Lhasurne+Koregaon+Satara+Maharashtra+India";

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-[#090114] relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct Audio Hotline, Instagram & Production Yard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            CONTACT CHINTAMANI SOUND
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80 leading-relaxed">
            Connect directly with our master sound engineers in <strong>Lhasurne, Koregaon (Satara)</strong>. Explore live event video reels on Instagram, reserve your date, or visit our sound rig yard.
          </p>
        </div>

        {/* TOP CONTACT CARDS: Instagram, Direct Hotline, WhatsApp, Mail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Instagram Official Card */}
          <a
            href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-gradient-to-br from-[#240628] via-[#1a0529] to-[#0f041d] border border-pink-500/40 hover:border-pink-400/80 shadow-[0_0_25px_rgba(236,72,153,0.25)] transition-all hover:scale-[1.03] group block"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white shadow-md">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                Official IG
              </span>
            </div>
            <div className="mt-4">
              <div className="text-[11px] text-pink-300 font-mono">@chintamani_soundsatara</div>
              <h4 className="text-base font-bold text-white group-hover:text-pink-200 transition-colors">
                Instagram Reels & Live
              </h4>
              <p className="text-[11px] text-purple-300/80 mt-1">
                Watch daily stage setups, tractor trailers & festival sound checks.
              </p>
              <div className="mt-3 inline-flex items-center text-xs text-pink-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </a>

          {/* Hotline Card */}
          <a
            href="tel:+919175136546"
            className="p-5 rounded-2xl bg-[#0f041d] border border-purple-500/30 hover:border-purple-400/70 shadow-lg transition-all hover:scale-[1.03] group block"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
                <PhoneCall className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                24/7 Active
              </span>
            </div>
            <div className="mt-4">
              <div className="text-[11px] text-purple-400 font-mono">Lead Engineer Direct</div>
              <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-mono">
                +91 91751 36546
              </h4>
              <p className="text-[11px] text-purple-300/80 mt-1">
                Instant booking confirmation & stage hardware technical consultation.
              </p>
              <div className="mt-3 inline-flex items-center text-xs text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Call Hotline Now</span>
                <PhoneCall className="w-3 h-3 ml-1" />
              </div>
            </div>
          </a>

          {/* WhatsApp Direct Card */}
          <a
            href="https://wa.me/919175136546?text=Hello%20Chintamani%20Sound,%20I%20want%20to%20inquire%20about%20LLOYD%20LEE%20Series%20sound%20packages%20for%20my%20event."
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-[#0a1811] border border-emerald-500/40 hover:border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:scale-[1.03] group block"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Instant Reply
              </span>
            </div>
            <div className="mt-4">
              <div className="text-[11px] text-emerald-400 font-mono">WhatsApp Fast Chat</div>
              <h4 className="text-base font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                Chat with Sound Chief
              </h4>
              <p className="text-[11px] text-emerald-300/80 mt-1">
                Receive instant rate cards, setup photos, and customized event quotes.
              </p>
              <div className="mt-3 inline-flex items-center text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Open WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </a>

          {/* Official Invoicing & Email Card */}
          <a
            href="mailto:bookings@chintamanisound.in"
            className="p-5 rounded-2xl bg-[#0f041d] border border-purple-500/30 hover:border-purple-400/70 shadow-lg transition-all hover:scale-[1.03] group block"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                Official RFP
              </span>
            </div>
            <div className="mt-4">
              <div className="text-[11px] text-purple-400 font-mono">Corporate & Mandap Contracts</div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                bookings@chintamanisound.in
              </h4>
              <p className="text-[11px] text-purple-300/80 mt-1">
                Tax invoices, GST billing documentation, and corporate proposals.
              </p>
              <div className="mt-3 inline-flex items-center text-xs text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>Send Formal Email</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </a>
        </div>

        {/* 🗺️ REAL-TIME GOOGLE MAP & INQUIRY FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Real-Time Location & Google Map Embed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0f041d] border border-purple-500/30 shadow-2xl space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Real-Time Base Location
                    </h3>
                    <div className="text-xs text-purple-300 font-medium">
                      Lhasurne, Koregaon — Satara, Maharashtra
                    </div>
                  </div>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-purple-600/30 transition-all hover:scale-105 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Live Directions</span>
                </a>
              </div>

              {/* Exact Address Box */}
              <div className="p-4 rounded-xl bg-[#150529] border border-purple-500/20 text-xs space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span>Chintamani Sound & LLOYD LEE Audio Rig Yard</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900 text-purple-300 font-mono">
                    HQ & Yard
                  </span>
                </div>
                <p className="text-purple-200/90 leading-relaxed font-sans">
                  At Post Lhasurne, Taluka Koregaon,
                  <br />
                  District Satara, Maharashtra 415501, India.
                </p>
                <div className="pt-2 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-purple-300 font-mono">
                  <span>Coordinates: <strong>17.7011° N, 74.1795° E</strong></span>
                  <span className="text-emerald-400 font-bold">✓ Rig Dispatch Active</span>
                </div>
              </div>

              {/* Real-time Embedded Google Map */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 shadow-inner bg-black">
                {/* Map Header Overlay */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold flex items-center space-x-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Live GPS Pin: Lhasurne, Koregaon (Satara)</span>
                  </div>

                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto px-2.5 py-1 rounded-lg bg-purple-950/90 hover:bg-purple-900 text-purple-200 text-[11px] font-semibold border border-purple-400/40 flex items-center gap-1 shadow-md"
                  >
                    <span>Full Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Map iframe embed for Lhasurne, Koregaon, Satara, Maharashtra */}
                <div className="w-full h-72 sm:h-80">
                  <iframe
                    title="Chintamani Sound Real Time Google Map - Lhasurne Koregaon Satara"
                    src="https://maps.google.com/maps?q=Lhasurne%2C%20Koregaon%2C%20Satara%2C%20Maharashtra%20415501&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full filter contrast-[1.05]"
                  ></iframe>
                </div>

                {/* Bottom Map Status Bar */}
                <div className="px-4 py-2.5 bg-[#120326] border-t border-purple-500/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-purple-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Trailer Loading & Logistics: Mon-Sun 24/7</span>
                  </div>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-300 hover:text-white font-bold underline"
                  >
                    Open in Google Maps App →
                  </a>
                </div>
              </div>

              {/* Instagram Follow Bar */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-indigo-950/40 border border-pink-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-pink-600/30 text-pink-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Follow @chintamani_soundsatara</div>
                    <div className="text-[11px] text-pink-300/80">Tag us in your event videos & reels</div>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shrink-0 shadow-md transition-all hover:scale-105"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Inquiry Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0f041d] border border-purple-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Send Event Inquiry</h3>
                <p className="text-xs text-purple-300/80 mt-0.5">
                  Our audio engineers in Lhasurne, Koregaon will call you back within 15 minutes.
                </p>
              </div>
              <span className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
                Satara Desk
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#140529] border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-purple-200 max-w-sm mx-auto">
                  Thank you! Our sound engineer from the Lhasurne Koregaon yard will contact you shortly on your phone/WhatsApp.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Watch Instagram Reels</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sagar Patil / Event Organizer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91751 36546"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-purple-200 mb-1">Tentative Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white font-mono focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-purple-200 mb-1">City / Venue Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Satara, Koregaon, Karad, Pune, Mumbai, Kolhapur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-purple-200 mb-1">Event Audio Requirements</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your event (Birthday, Gavdev Sohala, Varat, Ganpati Festival, DJ Night), crowd size & venue..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#17062e] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry for Immediate Audio Callback</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
