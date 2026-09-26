import React, { useState } from 'react';
import { Radio, Phone, MessageCircle, Menu, X, Share2, MapPin } from 'lucide-react';
import { STATION_INFO } from '../data/stationData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const navItems = [
    { id: 'player', label: 'Live Stream' },
    { id: 'schedule', label: 'Programs & Schedule' },
    { id: 'charts', label: 'Top 10 Charts' },
    { id: 'shoutouts', label: 'Listener Shoutouts' },
    { id: 'news', label: 'Teso News & Farming' },
    { id: 'presenters', label: 'Presenters' },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IGOFARADIO 97.6 FM - Voice of Malera',
          text: 'Tune in live to IGOFARADIO 97.6 FM, Ateker Community Radio broadcasting from Malera, Bukedea, Uganda!',
          url: window.location.href,
        });
      } catch (e) {
        // user canceled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top micro-bar */}
      <div className="bg-gradient-to-r from-brand-900/60 via-slate-900 to-brand-950/60 border-b border-slate-800/80 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              Malera • Bukedea • Teso
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              Daily Live Broadcast 8 PM - 10 PM EAT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px]">
              <span>Languages:</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Ateso</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">English</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Swahili</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-xs"
              title="Share station stream"
            >
              <Share2 className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share Radio'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Frequency */}
          <div 
            onClick={() => setActiveTab('player')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-600 text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Radio className="w-6 h-6" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                  IGOFARADIO
                </span>
                <span className="px-2 py-0.5 rounded-md bg-brand-500/20 border border-brand-500/40 text-brand-300 font-extrabold text-xs font-mono">
                  97.6 FM
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                Voice of Malera • Ateker Community
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-slate-800/90 text-brand-400 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action buttons (Hotline + Contact) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${STATION_INFO.phone}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
              title="Call studio directly"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>Studio: {STATION_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Station</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenContact}
              className="sm:hidden p-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30"
              aria-label="Contact studio"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={`tel:${STATION_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-brand-400" />
              Call Studio: {STATION_INFO.phone}
            </a>
            <a
              href={`https://wa.me/${STATION_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-950"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp Studio Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
