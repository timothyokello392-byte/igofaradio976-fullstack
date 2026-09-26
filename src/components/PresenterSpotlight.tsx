import React from 'react';
import { Mic, Phone, Mail, Award, MessageCircle, Heart } from 'lucide-react';
import { PRESENTERS, STATION_INFO } from '../data/stationData';

export const PresenterSpotlight: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-2">
          <Mic className="w-3.5 h-3.5" />
          The Voices of IGOFARADIO
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
          Station Presenters & Production Team
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Meet the dedicated team bringing Ateker cultural music, community dialogue, and entertainment from Malera to the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRESENTERS.map((presenter, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={presenter.avatarUrl}
                  alt={presenter.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/40 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1 rounded-lg">
                  <Mic className="w-3 h-3" />
                </span>
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wide">
                  {presenter.role}
                </span>
                <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                  {presenter.name}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-1">
                  🎙️ {presenter.show}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">
              {presenter.bio}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">
                {presenter.contact}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20${encodeURIComponent(presenter.name)},%20loving%20your%20show%20on%20IGOFARADIO%2097.6%20FM!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Send Message</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cultural Heritage Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-brand-950/30 to-slate-900 border border-brand-500/30 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-heading">
            Our Mission in Teso & Ateker Culture
          </h3>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-4xl">
          IGOFARADIO 97.6 FM was founded with the conviction that rural and peri-urban communities in Malera, Bukedea, and the greater Ateker belt deserve a high-fidelity broadcast platform that speaks our language (Ateso, Swahili, English), honors our cultural heritage, supports local agriculture, and gives upcoming talents a global microphone.
        </p>
      </div>
    </div>
  );
};
