import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, MapPin, Sparkles, MessageCircle, Music } from 'lucide-react';
import { INITIAL_SHOUTOUTS, STATION_INFO } from '../data/stationData';
import { Shoutout } from '../types';

export const ShoutoutWall: React.FC = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(() => {
    const saved = localStorage.getItem('igofa_shoutouts');
    return saved ? JSON.parse(saved) : INITIAL_SHOUTOUTS;
  });

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    localStorage.setItem('igofa_shoutouts', JSON.stringify(shoutouts));
  }, [shoutouts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const fullMessage = songRequest.trim() 
      ? `${message.trim()} [Song Request: 🎵 ${songRequest.trim()}]`
      : message.trim();

    const newShoutout: Shoutout = {
      id: `s-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Teso Sub-Region',
      message: fullMessage,
      timestamp: 'Just now',
      likes: 1,
      tags: songRequest.trim() ? ['SongRequest', 'Listener'] : ['Community', 'Live'],
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setName('');
    setLocation('');
    setMessage('');
    setSongRequest('');
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 5000);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap(prev => ({ ...prev, [id]: true }));
    setShoutouts(prev =>
      prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s)
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          Community Voice & Shoutouts
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
          Live Listener Shoutout Desk
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Send your greetings, dedication, or song request to Tiger King Lokide live on 97.6 FM.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shoutout Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-28">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Post a Live Shoutout
            </h3>

            {successNotice && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                ✅ Your shoutout has been submitted to the 97.6 FM on-air desk!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Name / Radio Nickname *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Bosco from Bukedea"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Location / Village
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Malera Town, Kumi, Kampala, Diaspora"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Song Request (Optional)
                </label>
                <div className="relative">
                  <Music className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Ateker Ayei or Gospel Track"
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Message & Greetings *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Greeting my family in Malera, loving the traditional music tonight..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Shoutout to Presenter</span>
                </button>

                <a
                  href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Radio%20Shoutout:%20Hi%20Tiger%20King%20Lokide,%20I'm%20tuning%20in%20from%20${encodeURIComponent(location || 'Malera')}.%20${encodeURIComponent(message || 'Big greetings!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send via WhatsApp (+256 778 222 238)</span>
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Shoutouts Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>Recent Community Messages ({shoutouts.length})</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {shoutouts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm font-heading">
                        {item.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-brand-300 font-medium bg-brand-500/10 px-2 py-0.5 rounded-md border border-brand-500/20">
                        <MapPin className="w-3 h-3 text-brand-400" />
                        {item.location}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        • {item.timestamp}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      likedMap[item.id]
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likedMap[item.id] ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
