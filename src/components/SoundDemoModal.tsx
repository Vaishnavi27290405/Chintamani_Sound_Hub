import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Square, Activity, Disc, Sparkles, X, Sliders, ShieldCheck } from 'lucide-react';

interface SoundDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundDemoModal: React.FC<SoundDemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<'bass' | 'surround' | 'concert' | 'vocal'>('bass');
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [bassLevel, setBassLevel] = useState(85);
  const [trebleLevel, setTrebleLevel] = useState(75);
  const [surroundWidth, setSurroundWidth] = useState(90);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const stopAudio = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      if (oscillator2Ref.current) {
        oscillator2Ref.current.stop();
        oscillator2Ref.current.disconnect();
        oscillator2Ref.current = null;
      }
    } catch (e) {}
    setIsPlaying(false);
  };

  const startAudio = (preset = activePreset) => {
    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(masterVolume * 0.4, ctx.currentTime);
      gainNodeRef.current = masterGain;

      let panner: StereoPannerNode | null = null;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        pannerRef.current = panner;
      }

      if (preset === 'bass') {
        // Deep 45Hz sub-bass with 90Hz harmonic
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(42, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(84, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(analyser);
        analyser.connect(ctx.destination);

        osc1.start();
        osc2.start();
        oscillatorRef.current = osc1;
        oscillator2Ref.current = osc2;
      } else if (preset === 'surround') {
        // Spatial swirling 3D Dolby simulation
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(220, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(880, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        // LFO for auto-panning
        if (panner) {
          osc1.connect(filter);
          filter.connect(panner);
          panner.connect(masterGain);
          masterGain.connect(analyser);
          analyser.connect(ctx.destination);

          // Animate panning back and forth
          let pan = -0.8;
          let dir = 0.05;
          const interval = setInterval(() => {
            if (!pannerRef.current || !panner) {
              clearInterval(interval);
              return;
            }
            pan += dir;
            if (pan > 0.8) dir = -0.05;
            if (pan < -0.8) dir = 0.05;
            panner.pan.setValueAtTime(pan, ctx.currentTime);
          }, 60);
        } else {
          osc1.connect(filter);
          filter.connect(masterGain);
          masterGain.connect(analyser);
          analyser.connect(ctx.destination);
        }

        osc1.start();
        oscillatorRef.current = osc1;
      } else if (preset === 'concert') {
        // High punch live kick & chord simulation
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(65, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440, ctx.currentTime);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        masterGain.connect(analyser);
        analyser.connect(ctx.destination);

        osc1.start();
        osc2.start();
        oscillatorRef.current = osc1;
        oscillator2Ref.current = osc2;
      } else {
        // Vocal clarity
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1000, ctx.currentTime);
        osc1.connect(masterGain);
        masterGain.connect(analyser);
        analyser.connect(ctx.destination);
        osc1.start();
        oscillatorRef.current = osc1;
      }

      setIsPlaying(true);
      drawVisualizer();
    } catch (err) {
      console.error('Web Audio error:', err);
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameIdRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0a0214');
      bgGrad.addColorStop(1, '#05010a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height * 0.85);

        // Neon purple & violet gradient for audio spectrum
        const barGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        barGrad.addColorStop(0, '#7e22ce'); // Purple 700
        barGrad.addColorStop(0.5, '#a855f7'); // Purple 500
        barGrad.addColorStop(1, '#e9d5ff'); // Purple 200

        ctx.fillStyle = barGrad;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

        // Subtle glow cap
        ctx.fillStyle = '#f3e8ff';
        ctx.fillRect(x, canvas.height - barHeight - 2, barWidth - 2, 2);

        x += barWidth + 1;
      }
    };

    render();
  };

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        masterVolume * 0.4,
        audioContextRef.current.currentTime
      );
    }
  }, [masterVolume]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0e041c] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#15062b]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600/30 rounded-lg border border-purple-400/40">
              <Disc className={`w-5 h-5 text-purple-300 ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                LoudLee Dolby Audio Lab
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Acoustic Tuning DSP
                </span>
              </h3>
              <p className="text-xs text-purple-300/70">
                Experience the 40Hz deep subwoofer sweep and Dolby spatial frequency dispersion
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Canvas */}
        <div className="p-6">
          <div className="relative rounded-xl border border-purple-500/30 overflow-hidden bg-[#07010e]">
            <canvas
              ref={canvasRef}
              width={600}
              height={140}
              className="w-full h-36 block"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <button
                  onClick={() => startAudio()}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-600/40 hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Dolby Sound Test</span>
                </button>
                <span className="text-xs text-purple-300/80 mt-2">
                  Use headphones or stereo speakers for optimal Dolby experience
                </span>
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => {
                setActivePreset('bass');
                if (isPlaying) startAudio('bass');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activePreset === 'bass'
                  ? 'bg-purple-900/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-[#140626] border-purple-900/50 text-purple-300 hover:border-purple-600/50'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                <span>40Hz Sub-Bass</span>
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              </div>
              <p className="text-xs text-purple-200/60 mt-1 font-mono">Dual 18" Horn Sub</p>
            </button>

            <button
              onClick={() => {
                setActivePreset('surround');
                if (isPlaying) startAudio('surround');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activePreset === 'surround'
                  ? 'bg-purple-900/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-[#140626] border-purple-900/50 text-purple-300 hover:border-purple-600/50'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                <span>Dolby 3D Pan</span>
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              </div>
              <p className="text-xs text-purple-200/60 mt-1 font-mono">Spatial Surround</p>
            </button>

            <button
              onClick={() => {
                setActivePreset('concert');
                if (isPlaying) startAudio('concert');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activePreset === 'concert'
                  ? 'bg-purple-900/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-[#140626] border-purple-900/50 text-purple-300 hover:border-purple-600/50'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                <span>Concert Rig</span>
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              </div>
              <p className="text-xs text-purple-200/60 mt-1 font-mono">Arena Line Array</p>
            </button>

            <button
              onClick={() => {
                setActivePreset('vocal');
                if (isPlaying) startAudio('vocal');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activePreset === 'vocal'
                  ? 'bg-purple-900/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-[#140626] border-purple-900/50 text-purple-300 hover:border-purple-600/50'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                <span>Vocal Clarity</span>
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              </div>
              <p className="text-xs text-purple-200/60 mt-1 font-mono">1kHz Hi-Def Vocal</p>
            </button>
          </div>

          {/* Sliders */}
          <div className="mt-5 p-4 rounded-xl bg-[#130526] border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-200">
              <span className="flex items-center gap-1.5 font-medium">
                <Volume2 className="w-4 h-4 text-purple-400" /> Master Acoustic Gain
              </span>
              <span className="font-mono text-purple-300">{Math.round(masterVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-[#090212] p-2.5 rounded-lg border border-purple-900/40">
                <span className="text-purple-400 block font-mono text-[11px]">BASS RESPONSE</span>
                <span className="text-white font-bold text-sm">30Hz - 120Hz</span>
              </div>
              <div className="bg-[#090212] p-2.5 rounded-lg border border-purple-900/40">
                <span className="text-purple-400 block font-mono text-[11px]">DOLBY DSP</span>
                <span className="text-white font-bold text-sm">Active 96kHz</span>
              </div>
              <div className="bg-[#090212] p-2.5 rounded-lg border border-purple-900/40">
                <span className="text-purple-400 block font-mono text-[11px]">THD DISTORTION</span>
                <span className="text-emerald-400 font-bold text-sm">&lt; 0.005%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-purple-500/20 bg-[#120424]">
          <div className="flex items-center space-x-2 text-xs text-purple-300/80">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Chintamani Sound LoudLee Series Audio Engine</span>
          </div>

          <div className="flex items-center space-x-3">
            {isPlaying ? (
              <button
                onClick={stopAudio}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 text-xs font-semibold transition-colors"
              >
                <Square className="w-3.5 h-3.5" />
                <span>Stop Demo</span>
              </button>
            ) : (
              <button
                onClick={() => startAudio()}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:scale-105 transition-transform"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Sound Test</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
