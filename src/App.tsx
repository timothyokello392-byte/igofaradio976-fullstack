import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgramSchedule } from './components/ProgramSchedule';
import { ShoutoutWall } from './components/ShoutoutWall';
import { MusicCharts } from './components/MusicCharts';
import { CommunityNews } from './components/CommunityNews';
import { PresenterSpotlight } from './components/PresenterSpotlight';
import { ContactModal } from './components/ContactModal';
import { 
  Radio, Phone, MessageCircle, MapPin, Sparkles, Music, 
  Calendar, Newspaper, Heart, Volume2, Globe, ShieldCheck, Flame
} from 'lucide-react';
import { STATION_INFO } from './data/stationData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('player');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showStickyPlayer, setShowStickyPlayer] = useState(false);

  // Monitor scroll to reveal mini sticky player
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowStickyPlayer(true);
      } else {
        setShowStickyPlayer(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Station Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Hero Live Audio Broadcast Deck */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Broadcasting 24/7 Worldwide
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  97.6 FM MALERA
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
                IGOFARADIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-400">97.6 FM</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
                The No.1 Ateker Community Radio live from Malera, Bukedea, Teso Sub-Region, Uganda. Speaking our language, playing our music, serving our community.
              </p>
            </div>

            {/* Quick studio shortcuts */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20Tiger%20King%20Lokide,%20listening%20live%20on%20IGOFARADIO%2097.6%20FM!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Studio</span>
              </a>

              <a
                href={`tel:${STATION_INFO.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                <Phone className="w-4 h-4 text-brand-400" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Audio Player Card */}
          <AudioPlayer />
        </section>

        {/* Tab Navigation Pill Bar */}
        <section className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'player', label: 'Overview & Highlights', icon: Radio },
              { id: 'schedule', label: 'Programs & Times', icon: Calendar },
              { id: 'charts', label: 'Top 10 Chart', icon: Music },
              { id: 'shoutouts', label: 'Listener Shoutouts', icon: MessageCircle },
              { id: 'news', label: 'Teso News & Farming', icon: Newspaper },
              { id: 'presenters', label: 'Presenters & DJ Team', icon: Sparkles },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 ring-2 ring-brand-500/40'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dynamic Tab Contents */}
        {activeTab === 'player' && (
          <div className="space-y-10">
            {/* Quick Station Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
                <div className="text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
                  On-Air Frequency
                </div>
                <div className="text-2xl font-black font-heading text-white">97.6 MHz</div>
                <div className="text-[11px] text-slate-400 mt-1">Malera, Bukedea, Kumi, Soroti</div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Prime Show Hours
                </div>
                <div className="text-2xl font-black font-heading text-white">8 - 10 PM</div>
                <div className="text-[11px] text-slate-400 mt-1">Daily Live with Tiger King Lokide</div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Broadcast Dialects
                </div>
                <div className="text-2xl font-black font-heading text-white">Ateso + 2</div>
                <div className="text-[11px] text-slate-400 mt-1">Ateso, English & Swahili</div>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
                <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Global Stream
                </div>
                <div className="text-2xl font-black font-heading text-white">Zeno.FM HD</div>
                <div className="text-[11px] text-slate-400 mt-1">Streamed in 128kbps stereo</div>
              </div>
            </div>

            {/* Split Section: Today's Lineup & Live Shoutouts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Lineup Highlights */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-400" />
                    Today's Featured Shows
                  </h3>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300"
                  >
                    View All Lineup &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-950/40 to-slate-900 border border-brand-500/40">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        ON AIR NOW (8:00 - 10:00 PM EAT)
                      </span>
                      <span className="font-bold text-brand-300">Tiger King Lokide</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Ateker Night Drive & Community Request Desk
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Live phone call-ins, greetings, traditional rhythms, and community news wrap-up.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-amber-400">UP NEXT AT 06:00 AM EAT</span>
                      <span className="text-slate-400">Papa Stephen</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      Teso Dawn & Farmer's Voice (Asuban)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Local crop market updates, cassava & millet advisory, and morning gospel blessings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Chart Highlight */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Community Hit #1 Track
                  </h3>
                  <button
                    onClick={() => setActiveTab('charts')}
                    className="text-xs font-semibold text-brand-400 hover:text-brand-300"
                  >
                    View Top 10 Charts &rarr;
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black font-heading text-lg flex items-center justify-center">
                      #1
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-heading">
                        Ateker Ayei (Our Land)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Teso All Stars ft. Tiger King Lokide
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Play%20Ateker%20Ayei%20on%2097.6%20FM`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                  >
                    Request on Air
                  </a>
                </div>

                {/* Cultural Message */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-brand-400">Radio Mission:</span> We take pride in preserving Ateker roots and promoting education, agricultural resilience, and unity across Teso, Karamoja, Turkana, and beyond.
                </div>
              </div>
            </div>

            {/* Quick Shoutouts Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-400" />
                  Latest Listener Shoutouts
                </h3>
                <button
                  onClick={() => setActiveTab('shoutouts')}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300"
                >
                  Send a Shoutout &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-white">Emmanuel Oumo</span>
                    <span className="text-brand-400">Malera Town Council</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    "Tuning in loud and clear in Malera! Shoutout to all farmers gathering millet today. Tiger King keep the music playing!"
                  </p>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-white">Mary Christine Akello</span>
                    <span className="text-brand-400">Kampala Diaspora</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    "Listening online from Kampala! I miss home so much, hearing Ateso on IGOFARADIO makes me feel right beside my family."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && <ProgramSchedule />}
        {activeTab === 'charts' && <MusicCharts />}
        {activeTab === 'shoutouts' && <ShoutoutWall />}
        {activeTab === 'news' && <CommunityNews />}
        {activeTab === 'presenters' && <PresenterSpotlight />}
      </main>

      {/* Floating Sticky Audio Bar on Scroll */}
      {showStickyPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <AudioPlayer compact={true} />

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20Lokide,%20listening%20live%20to%2097.6%20FM`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">WhatsApp Live</span>
              </a>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveTab('shoutouts');
                }}
                className="px-3.5 py-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30 hover:bg-brand-500/30 text-xs font-bold transition-all"
              >
                Shoutout Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <Radio className="w-6 h-6 text-brand-500" />
                <span className="text-xl font-black font-heading tracking-tight text-white">
                  IGOFARADIO 97.6 FM
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Ateker Community Radio broadcasting live from Malera Town Council, Bukedea District, Teso Sub-Region, Uganda. Dedicated to Ateker culture, agricultural upliftment, youth empowerment, and 24/7 authentic East African broadcasting.
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-400 font-semibold pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Malera, Bukedea, Eastern Uganda • 97.6 MHz</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Studio Contacts
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <strong className="text-slate-300">Hotline / WhatsApp:</strong>
                  <br />
                  <a href={`tel:${STATION_INFO.phone}`} className="hover:text-brand-400">
                    {STATION_INFO.phone}
                  </a>
                </li>
                <li>
                  <strong className="text-slate-300">Station Email:</strong>
                  <br />
                  <a href={`mailto:${STATION_INFO.email}`} className="hover:text-brand-400">
                    {STATION_INFO.email}
                  </a>
                </li>
                <li>
                  <strong className="text-slate-300">TikTok:</strong> {STATION_INFO.tiktok}
                </li>
                <li>
                  <strong className="text-slate-300">Station Host:</strong> Tiger King Lokide
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Listen Online
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a
                    href={STATION_INFO.zenoPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-400 flex items-center gap-1"
                  >
                    <span>Zeno.FM Stream Page</span>
                    <Globe className="w-3.5 h-3.5 text-brand-400" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="hover:text-brand-400 text-left"
                  >
                    Daily Show Schedule
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('charts')}
                    className="hover:text-brand-400 text-left"
                  >
                    Weekly Music Charts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="hover:text-brand-400 text-left"
                  >
                    Advertise on 97.6 FM
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} IGOFARADIO 97.6 FM. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Voice of Malera</span>
              <span>•</span>
              <span>Ateker Community Radio</span>
              <span>•</span>
              <span>Bukedea, Teso</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact & Advertising Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
