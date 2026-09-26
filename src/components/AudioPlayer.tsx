import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Radio, Wifi, 
  ExternalLink, MessageCircle, AlertCircle, Clock, Check
} from 'lucide-react';
import { STATION_INFO } from '../data/stationData';

interface AudioPlayerProps {
  onOpenWhatsApp?: () => void;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [listenersCount, setListenersCount] = useState(148);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [showSleepMenu, setShowSleepMenu] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle Audio setup
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.src = STATION_INFO.streamUrl;
    audioRef.current = audio;

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setStreamError(null);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setStreamError('Stream temporarily buffering or connecting to relay. Click play again or use Zeno player fallback.');
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    // Random natural fluctuation for live listeners
    const interval = setInterval(() => {
      setListenersCount(prev => Math.max(120, prev + Math.floor(Math.random() * 5) - 2));
    }, 15000);

    return () => {
      clearInterval(interval);
      audio.pause();
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sleep timer countdown
  useEffect(() => {
    if (sleepTimerMinutes === null) {
      setSleepTimerRemaining(null);
      return;
    }

    setSleepTimerRemaining(sleepTimerMinutes * 60);

    const timer = setInterval(() => {
      setSleepTimerRemaining(prev => {
        if (prev === null || prev <= 1) {
          if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sleepTimerMinutes, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setStreamError(null);
      try {
        // Cache-buster ensures live stream is fresh
        audioRef.current.src = `${STATION_INFO.streamUrl}?t=${Date.now()}`;
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback error:", err);
        setIsLoading(false);
        setIsPlaying(false);
        setStreamError('Browser blocked autoplay or stream is starting. Tap Play again.');
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-400 active:scale-95 text-white transition-all shadow-lg shadow-brand-500/30"
          aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white translate-x-0.5" />
          )}
        </button>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 text-xs text-brand-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE 97.6 FM
          </div>
          <div className="text-sm font-semibold text-slate-100 truncate max-w-[160px]">
            Voice of Malera
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl p-6 md:p-8">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Station Identity & Live Status */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Main Play / Pause Button with Radar Pulse */}
          <div className="relative flex-shrink-0">
            {isPlaying && (
              <span className="absolute -inset-2 rounded-full bg-brand-500/25 animate-ping" />
            )}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-200 shadow-xl ${
                isPlaying
                  ? 'bg-gradient-to-tr from-brand-600 to-brand-400 text-white hover:brightness-110 shadow-brand-500/40 ring-4 ring-brand-500/20'
                  : 'bg-gradient-to-tr from-brand-500 to-amber-500 text-white hover:scale-105 shadow-brand-500/30'
              }`}
              title={isPlaying ? 'Pause live stream' : 'Listen Live 97.6 FM'}
            >
              {isLoading ? (
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-8 h-8 fill-white" />
              ) : (
                <Play className="w-9 h-9 fill-white translate-x-1" />
              )}
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ON AIR
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-brand-400" />
                97.6 MHz
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline-flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                {listenersCount} listening online
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-white font-heading tracking-tight truncate">
              Ateker Night Drive & Community Desk
            </h2>
            <p className="text-sm text-brand-300 font-medium truncate">
              Hosted by <span className="font-bold text-white">Tiger King Lokide</span> • Malera Studio Live
            </p>
          </div>
        </div>

        {/* Center: Equalizer & Audio Wave */}
        <div className="w-full md:w-48 flex flex-col items-center justify-center">
          <div className="flex items-end justify-center gap-1.5 h-10 w-full px-4">
            {[45, 80, 60, 95, 30, 85, 50, 90, 70, 40, 100, 65, 35].map((height, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-brand-500 to-amber-300 animate-pulse'
                    : 'bg-slate-700 h-2'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (isPlaying ? 1 : 0.2)))}%` : '6px',
                  animationDelay: `${(i * 0.1).toFixed(1)}s`,
                  animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-slate-400 mt-2 uppercase">
            {isPlaying ? 'Stereo • 128kbps HD' : 'Click Play to Stream Live'}
          </span>
        </div>

        {/* Right: Controls (Volume, Timer, WhatsApp) */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-700/50 rounded-xl px-3 py-2">
            <button
              onClick={toggleMute}
              className="text-slate-300 hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-brand-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              aria-label="Volume slider"
            />
          </div>

          {/* Sleep Timer Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSleepMenu(!showSleepMenu)}
              className={`p-2.5 rounded-xl border transition-all ${
                sleepTimerRemaining !== null
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white border-slate-700/50'
              }`}
              title="Set Sleep Timer"
            >
              <Clock className="w-4 h-4" />
            </button>

            {showSleepMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                <div className="text-xs font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Sleep Timer
                </div>
                {[15, 30, 45, 60].map(mins => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSleepTimerMinutes(mins);
                      setShowSleepMenu(false);
                    }}
                    className="w-full flex items-center justify-between text-left text-xs font-medium px-2 py-2 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <span>{mins} minutes</span>
                    {sleepTimerMinutes === mins && <Check className="w-3.5 h-3.5 text-brand-400" />}
                  </button>
                ))}
                {sleepTimerMinutes !== null && (
                  <button
                    onClick={() => {
                      setSleepTimerMinutes(null);
                      setShowSleepMenu(false);
                    }}
                    className="w-full text-left text-xs text-rose-400 hover:bg-slate-800 px-2 py-1.5 rounded-lg mt-1 border-t border-slate-800"
                  >
                    Turn off timer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Studio WhatsApp Quick Call */}
          <a
            href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20Tiger%20King%20Lokide,%20I%20am%20listening%20to%20IGOFARADIO%2097.6%20FM!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Studio</span>
          </a>
        </div>
      </div>

      {/* Sleep Timer Bar Indicator */}
      {sleepTimerRemaining !== null && (
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Sleep timer active: stopping broadcast in {formatTimer(sleepTimerRemaining)}
          </span>
          <button
            onClick={() => setSleepTimerMinutes(null)}
            className="text-slate-400 hover:text-white underline text-[11px]"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Error / Fallback Banner */}
      {streamError && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{streamError}</span>
          </div>
          <a
            href={STATION_INFO.zenoPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-brand-400 hover:text-brand-300 underline flex-shrink-0"
          >
            Open on Zeno.FM <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
