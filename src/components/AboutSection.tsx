import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  ShieldCheck,
  Disc,
  Award,
  Users,
  CheckCircle2,
  Sliders,
  Cpu,
  Flame,
  ArrowRight,
  MapPin,
  Navigation,
  Compass,
  Radio,
  Play,
  Pause,
  Maximize,
  VolumeX,
  Layers,
  Sparkles,
  Activity,
  Truck,
  Clock,
  Zap,
  Code,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/packagesData';

interface AboutSectionProps {
  onBookNow: () => void;
  onOpenSoundDemo: () => void;
  onOpenDjangoHub?: () => void;
}

interface VideoShowcase {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoSrc?: string;
  splPeak: string;
  wattage: string;
  description: string;
}

const CONCERT_VIDEOS: VideoShowcase[] = [
  {
    id: 'vid-1',
    title: 'LLOYD LEE 24,000W RMS Ganpati & Durga Devi (Navratri) Mega Bass Drop',
    category: 'Festival & Ganpati Rig',
    duration: '04:15',
    thumbnail: '/sound5.jpg',
    splPeak: '139.8 dB',
    wattage: '24,000W RMS',
    description: 'Live performance testing of full aluminum stage truss with 8x Sharpy moving heads, matrix LED blinders, and massive LLOYD LEE sub bank.'
  },
  {
    id: 'vid-2',
    title: 'Gavdev Sohala & Varat Miravnuk Mobile Trailer 4-Column Line Array Live',
    category: 'Gavdev & Varat Procession',
    duration: '05:20',
    thumbnail: '/sound2.jpg',
    splPeak: '138.4 dB',
    wattage: '12,000W RMS',
    description: 'Heavy mobile tractor trailer rig in transit delivering extreme long-throw audio across village road rallies with Dhol Tasha synchronization.'
  },
  {
    id: 'vid-3',
    title: 'Live Stage DJ Rig with Diamond Matrix Panels & Sharpy Beam Show',
    category: 'Live DJ & Stage Show',
    duration: '03:42',
    thumbnail: '/sound1.jpg',
    splPeak: '136.5 dB',
    wattage: '18,000W RMS',
    description: 'High-voltage live DJ stage setup with moving beam sharpy fixtures, subwoofers, and digital console FOH mixing.'
  },
  {
    id: 'vid-4',
    title: 'Royal Marriage & Sangeet Varat Dolby Atmos DSP Acoustic Alignment',
    category: 'Marriage & Sangeet',
    duration: '02:50',
    thumbnail: '/sound3.jpg',
    splPeak: '126.0 dB',
    wattage: '9,000W RMS',
    description: 'Festive garland blessing and real-time DSP delay calibration for pure vocal transparency and zero-feedback live wedding orchestra.'
  },
  {
    id: 'vid-5',
    title: 'Tractor-Mounted Mobile Sound Rig Highway Dispatch & Sound Check',
    category: 'Highway Rig Dispatch',
    duration: '04:05',
    thumbnail: '/sound4.jpg',
    splPeak: '137.2 dB',
    wattage: '15,000W RMS',
    description: 'Tractor trailer mobile sound system en-route to mega rural yatra with high-excursion subwoofers and line array columns.'
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBookNow,
  onOpenSoundDemo,
  onOpenDjangoHub
}) => {
  // Geolocation States
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoCity, setGeoCity] = useState<string>('Lhasurne, Koregaon (HQ Yard)');
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [transitHours, setTransitHours] = useState<number>(1);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);

  // Chintamani Sound Lhasurne, Koregaon (Satara) HQ Coordinates
  const HQ_COORDS = { lat: 17.7011, lng: 74.1795 };

  // Video Space States
  const [selectedVideo, setSelectedVideo] = useState<VideoShowcase>(CONCERT_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<'dolby' | 'bass' | 'vocal'>('dolby');
  const [videoProgress, setVideoProgress] = useState<number>(34);

  // Haversine formula calculation
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserCoords({ lat, lng });
        setIsGpsActive(true);
        setIsLocating(false);

        const dist = calculateDistance(HQ_COORDS.lat, HQ_COORDS.lng, lat, lng);
        setDistanceKm(dist);
        setGeoCity(`Live GPS Position (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`);

        // Compute truck transit: ~45 km/hr average for heavy equipment trailer + 1 hr setup loading
        const hours = dist === 0 ? 1 : Math.max(1, Math.round((dist / 45 + 1) * 10) / 10);
        setTransitHours(hours);
      },
      (error) => {
        setIsLocating(false);
        setIsGpsActive(false);
        // Fallback gracefully
        setGeoError('GPS signal access restricted or timeout. You can select preset city below.');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleSelectPresetCity = (cityName: string, lat: number, lng: number) => {
    setUserCoords({ lat, lng });
    setGeoCity(cityName);
    setIsGpsActive(false);
    setGeoError(null);
    const dist = calculateDistance(HQ_COORDS.lat, HQ_COORDS.lng, lat, lng);
    setDistanceKm(dist);
    const hours = dist === 0 ? 1 : Math.max(1, Math.round((dist / 45 + 1) * 10) / 10);
    setTransitHours(hours);
  };

  // Video progress animation when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-[#07010f] relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-3/4 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-20">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Legacy of Acoustic Precision & Tour Rig Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ABOUT CHINTAMANI SOUND
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80 leading-relaxed">
            Pioneering live sound with our signature <strong>LLOYD LEE Series</strong>. We combine tour-grade Dolby acoustic DSP calibration, high-throw line arrays, and digital console engineering to deliver unmatched sound clarity across Maharashtra.
          </p>

          {/* Python & Django Integration Banner Button */}
          {onOpenDjangoHub && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={onOpenDjangoHub}
                className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900/80 border border-purple-400/40 text-purple-200 text-xs font-mono flex items-center space-x-2 transition-all hover:scale-105 shadow-md shadow-purple-900/30"
              >
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span>Powered by <strong>Python & Django Database ORM</strong> • View API Specs</span>
              </button>
            </div>
          )}
        </div>

        {/* 2-COLUMN STORY & DOLBY SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              THE LLOYD LEE SERIES PHILOSOPHY
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Every Beat Felt in Your Chest, Every Lyric Crystal Clear
            </h3>

            <p className="text-sm text-purple-200/80 leading-relaxed">
              Founded with an uncompromising commitment to audio physics, Chintamani Sound custom designs and tunes the LLOYD LEE Series sound rigs. While conventional rental speakers produce harsh ear-piercing treble and muddy bass, our Dolby-aligned line arrays maintain a flat acoustic response curve with 30Hz - 80Hz subwoofer authority.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#130526] border border-purple-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Dolby DSP Alignment</span>
                </div>
                <p className="text-purple-300/70">
                  Phase-matched delay compensation so front and rear audiences hear immersive stereo imaging.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#130526] border border-purple-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Digital Tour Desks</span>
                </div>
                <p className="text-purple-300/70">
                  Allen & Heath SQ6 and Behringer X32 96kHz mixing consoles with remote iPad FOH control.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#130526] border border-purple-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-purple-400" />
                  <span>Horn-Loaded Subwoofers</span>
                </div>
                <p className="text-purple-300/70">
                  Dual 18" high-excursion Italian drivers generating maximum acoustic SPL without distortion.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#130526] border border-purple-500/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Certified Engineers</span>
                </div>
                <p className="text-purple-300/70">
                  Experienced live audio technicians on stage from initial sound check to final curtain.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onBookNow}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
              >
                <span>Book Event Audio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSoundDemo}
                className="px-5 py-3 rounded-xl bg-[#150529] hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <Disc className="w-4 h-4 text-purple-400 animate-spin" />
                <span>Test 40Hz Dolby Bass Drop</span>
              </button>
            </div>
          </div>

          {/* Right Column Specs Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-purple-500/30 via-fuchsia-500/20 to-indigo-500/30 shadow-2xl">
              <div className="rounded-[22px] overflow-hidden bg-[#0d021c] border border-purple-500/30 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
                  <div>
                    <h4 className="text-lg font-bold text-white">Chintamani Sound Rig Specs</h4>
                    <span className="text-xs text-purple-400 font-mono">LOUDLEE SERIES 2026</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                    ACTIVE RIG READY
                  </span>
                </div>

                {/* Acoustic Hardware Meters */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-purple-200 mb-1">
                      <span>Low-Frequency Subwoofer Power (30Hz)</span>
                      <span className="font-mono text-purple-300">98% Ultra-Impact</span>
                    </div>
                    <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-400 w-[98%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-purple-200 mb-1">
                      <span>High-Frequency Vocal Throw (Line Arrays)</span>
                      <span className="font-mono text-purple-300">250+ Meters</span>
                    </div>
                    <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-400 w-[94%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-purple-200 mb-1">
                      <span>Total Harmonic Distortion (THD)</span>
                      <span className="font-mono text-emerald-400">&lt; 0.005% Studio Clean</span>
                    </div>
                    <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[12%]"></div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-4 rounded-xl bg-[#140529] border border-purple-500/20 text-xs text-purple-200/90 italic leading-relaxed">
                  "Our LLOYD LEE Series sound rigs aren’t just loudspeakers; they are full concert engines calibrated to turn any wedding, rally, or band concert into an unforgettable acoustic memory."
                  <div className="mt-2 not-italic font-bold text-purple-300 text-[11px] font-sans">
                    — Founder & Audio Chief, Chintamani Sound
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 DEDICATED CONCERT VIDEO SPACE IN ABOUT US SECTION */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Concert Video Space & Dolby Stage Reels</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              WATCH LLOYD LEE STAGE SHOWCASE IN ACTION
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
              Experience the visual impact and acoustic power of our live stage productions, mobile trailers, line arrays, and massive sub arrays.
            </p>
          </div>

          <div className="rounded-3xl p-1 bg-gradient-to-tr from-purple-600/40 via-indigo-600/30 to-fuchsia-600/40 shadow-2xl">
            <div className="rounded-[22px] bg-[#0c0218] border border-purple-500/30 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Main Video Screen Area */}
                <div className="lg:col-span-8 relative bg-black flex flex-col justify-between min-h-[380px] sm:min-h-[460px]">
                  {/* Video Backdrop / Animated Concert Canvas */}
                  <div className="relative w-full h-full flex-1 overflow-hidden group">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isPlaying ? 'scale-105 brightness-95' : 'brightness-75'
                      }`}
                    />

                    {/* Ambient Stage Lighting Glow Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0218] via-black/30 to-transparent"></div>
                    {isPlaying && (
                      <div className="absolute inset-0 bg-purple-600/15 mix-blend-screen animate-pulse pointer-events-none"></div>
                    )}

                    {/* Active Live Sound VU & SPL Meter Overlay */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        LIVE STAGE REEL
                      </span>

                      <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 text-[10px] font-mono font-bold">
                        ⚡ SPL PEAK: {selectedVideo.splPeak}
                      </span>

                      <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-indigo-200 text-[10px] font-mono font-bold">
                        🔊 {selectedVideo.wattage}
                      </span>
                    </div>

                    {/* Big Center Play / Pause Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-5 sm:p-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-[0_0_40px_rgba(168,85,247,0.8)] border-2 border-white/40 transition-all duration-300 hover:scale-110 active:scale-95 ${
                          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 fill-white" />}
                      </button>
                    </div>

                    {/* Audio Equalizer Spectrum Bar Overlay */}
                    {isPlaying && (
                      <div className="absolute bottom-16 left-6 right-6 flex items-end justify-between h-12 gap-1 z-10 opacity-70 pointer-events-none">
                        {[40, 65, 85, 30, 95, 70, 50, 90, 100, 60, 80, 45, 95, 75, 55, 88, 70, 60].map(
                          (val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-purple-500 via-fuchsia-400 to-indigo-300 rounded-t"
                              style={{
                                height: `${(val * (0.4 + Math.random() * 0.6))}%`,
                                transition: 'height 150ms ease'
                              }}
                            ></div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Video Bottom Playback Control Bar */}
                  <div className="p-4 bg-[#090114] border-t border-purple-500/20 flex flex-col gap-2">
                    {/* Timeline slider */}
                    <div className="w-full bg-purple-950 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-purple-300 pt-1">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-purple-400 transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px] text-purple-400">
                          {isPlaying ? '01:42' : '00:00'} / {selectedVideo.duration}
                        </span>
                        <span className="text-white font-bold text-xs truncate max-w-[200px] sm:max-w-sm">
                          {selectedVideo.title}
                        </span>
                      </div>

                      {/* Sound Profile Selector */}
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setAudioMode('dolby')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            audioMode === 'dolby'
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-950/60 text-purple-400'
                          }`}
                        >
                          Dolby 7.1
                        </button>
                        <button
                          onClick={() => setAudioMode('bass')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            audioMode === 'bass'
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-950/60 text-purple-400'
                          }`}
                        >
                          30Hz Bass
                        </button>
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-1 rounded text-purple-300 hover:text-white"
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Playlist & Specs Sidebar */}
                <div className="lg:col-span-4 p-5 bg-[#100324] border-t lg:border-t-0 lg:border-l border-purple-500/20 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Live Stage Video Feeds</span>
                      <span className="text-[10px] font-mono text-purple-400">4 HD Streams</span>
                    </h4>
                    <p className="text-[11px] text-purple-300/70 mb-3">
                      Select a concert stage reel to switch the active video player:
                    </p>

                    <div className="space-y-2.5">
                      {CONCERT_VIDEOS.map((vid) => {
                        const isSelected = selectedVideo.id === vid.id;
                        return (
                          <div
                            key={vid.id}
                            onClick={() => {
                              setSelectedVideo(vid);
                              setIsPlaying(true);
                            }}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                              isSelected
                                ? 'bg-purple-900/60 border-purple-400 shadow-md ring-1 ring-purple-400'
                                : 'bg-[#16052d] border-purple-900/40 hover:border-purple-600/40 text-purple-300'
                            }`}
                          >
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-black">
                              <img
                                src={vid.thumbnail}
                                alt={vid.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Play className="w-3 h-3 text-white fill-white" />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between text-[10px] text-purple-400 font-mono">
                                <span>{vid.category}</span>
                                <span>{vid.duration}</span>
                              </div>
                              <h5 className="font-bold text-white text-xs truncate mt-0.5">
                                {vid.title}
                              </h5>
                              <div className="text-[10px] text-purple-300/80 truncate">
                                {vid.splPeak} • {vid.wattage}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Video Detail Callout */}
                  <div className="p-3.5 rounded-xl bg-[#090114] border border-purple-500/20 text-xs space-y-1.5">
                    <div className="font-bold text-white text-xs">{selectedVideo.title}</div>
                    <p className="text-[11px] text-purple-300/80 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                    <button
                      onClick={onBookNow}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Book This Sound Rig</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📍 GEOLOCATION & RIG DISPATCH HUB IN ABOUT US SECTION */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>GPS Geolocation & Rig Dispatch Logistics</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              LOCATE CHINTAMANI SOUND & RIG LOGISTICS
            </h3>
            <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
              Use live browser GPS or select your event city to calculate real-time equipment transit duration, trailer dispatch logistics, and nearest engineer depot.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d021c] border border-purple-500/30 shadow-2xl space-y-6">
            {/* Top GPS Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/50 text-purple-300 flex items-center justify-center shrink-0">
                  <Navigation className="w-6 h-6 animate-spin" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">Chintamani Sound & Rig Yard</h4>
                    <span className="px-2 py-0.5 rounded bg-purple-900/80 text-purple-200 border border-purple-500/40 text-[10px] font-mono font-bold">
                      Lhasurne, Koregaon (Satara)
                    </span>
                  </div>
                  <div className="text-xs text-purple-300/80 font-mono mt-0.5">
                    GPS Coordinates: 17.7011° N, 74.1795° E • Lhasurne Rig Depot, Koregaon - Maharashtra
                  </div>
                </div>
              </div>

              {/* Detect Location Button & Instagram link */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 hover:from-pink-600/50 border border-pink-500/40 text-pink-200 font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all hover:scale-105"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@chintamani_soundsatara</span>
                </a>

                <button
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105 shrink-0"
                >
                  <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Acquiring GPS Satellite Lock...' : 'Detect My Live Event Location via GPS'}</span>
                </button>
              </div>
            </div>

            {geoError && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs">
                ⚠️ {geoError}
              </div>
            )}

            {/* City Presets Quick Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300 block">
                Quick Regional Depots & Hubs:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Lhasurne / Koregaon (Satara HQ)', lat: 17.7011, lng: 74.1795 },
                  { name: 'Satara City Depot', lat: 17.6805, lng: 74.0183 },
                  { name: 'Karad Hub', lat: 17.2885, lng: 74.1818 },
                  { name: 'Pune Yard', lat: 18.52043, lng: 73.856744 },
                  { name: 'Kolhapur Depot', lat: 16.705, lng: 74.2433 },
                  { name: 'Mumbai / Thane Hub', lat: 19.076, lng: 72.8777 },
                  { name: 'Solapur Hub', lat: 17.6599, lng: 75.9064 },
                  { name: 'Nashik Depot', lat: 19.9975, lng: 73.7898 }
                ].map((hub) => (
                  <button
                    key={hub.name}
                    onClick={() => handleSelectPresetCity(hub.name, hub.lat, hub.lng)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      geoCity === hub.name
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-[#150529] border border-purple-900/40 text-purple-300 hover:border-purple-500/40'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span>{hub.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Distance & Transit Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#140529] border border-purple-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  SELECTED VENUE LOCATION
                </span>
                <div className="text-sm font-bold text-white truncate">{geoCity}</div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{isGpsActive ? 'High Accuracy GPS Lock' : 'Regional Depot Synced'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140529] border border-purple-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  DISTANCE FROM LHASURNE HQ
                </span>
                <div className="text-xl font-black font-mono text-white">
                  {distanceKm} <span className="text-xs font-normal text-purple-300">KM</span>
                </div>
                <div className="text-[11px] text-purple-300/80">
                  Direct acoustic transit route
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140529] border border-purple-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  RIG TRAILER TRANSIT TIME
                </span>
                <div className="text-xl font-black font-mono text-purple-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-purple-400" />
                  <span>~{transitHours} {transitHours === 1 ? 'Hour' : 'Hours'}</span>
                </div>
                <div className="text-[11px] text-purple-300/80">
                  Includes highway transport & safety loading
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#140529] border border-purple-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                  ASSIGNED SOUND CREW
                </span>
                <div className="text-sm font-bold text-emerald-400">
                  1 Lead Engineer + 4 Techs
                </div>
                <div className="text-[11px] text-purple-300/80">
                  On-site calibration & stage monitor check
                </div>
              </div>
            </div>

            {/* Embedded Live Google Map of Lhasurne Koregaon Satara */}
            <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-black">
              <div className="p-3 bg-[#110324] border-b border-purple-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Real-Time Google Map: Lhasurne, Koregaon (Satara), Maharashtra</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lhasurne+Koregaon+Satara+Maharashtra+India"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-purple-300 hover:text-white font-bold flex items-center gap-1"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-64 sm:h-72">
                <iframe
                  title="Chintamani Sound Real-time Map"
                  src="https://maps.google.com/maps?q=Lhasurne%2C%20Koregaon%2C%20Satara%2C%20Maharashtra%20415501&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Visual Radar & Route Indicator */}
            <div className="p-4 rounded-2xl bg-[#090114] border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3 text-purple-300">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span>
                  <strong>LLOYD LEE Rig Logistics:</strong> Stage audio trailers available for immediate dispatch to{' '}
                  <strong className="text-white">{geoCity}</strong>.
                </span>
              </div>

              <button
                onClick={onBookNow}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 shadow-md transition-all hover:scale-105"
              >
                Reserve LLOYD LEE Rig for This Venue
              </button>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS */}
        <div className="pt-12 border-t border-purple-500/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              What Organizers Say About LLOYD LEE Sound
            </h3>
            <p className="text-xs text-purple-300/70 mt-1">
              Verified client testimonials from live concerts, grand weddings, and DJ festivals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#110321] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-sm">
                      {'★'.repeat(rev.rating)}
                    </div>
                    {rev.verifiedBooking && (
                      <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                        ✓ Verified Booking
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-purple-900/40">
                  <div className="font-bold text-white text-xs">{rev.clientName}</div>
                  <div className="text-[11px] text-purple-400 truncate">{rev.roleOrEvent}</div>
                  <div className="text-[10px] text-purple-500/70 font-mono mt-0.5">{rev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
