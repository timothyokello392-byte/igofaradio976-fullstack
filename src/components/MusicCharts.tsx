import React, { useState } from 'react';
import { Trophy, ThumbsUp, Radio, Flame, Sparkles, MessageCircle } from 'lucide-react';
import { TOP_TRACKS, STATION_INFO } from '../data/stationData';
import { SongTrack } from '../types';

export const MusicCharts: React.FC = () => {
  const [tracks, setTracks] = useState<SongTrack[]>(() => {
    const saved = localStorage.getItem('igofa_chart_votes');
    return saved ? JSON.parse(saved) : TOP_TRACKS;
  });
  const [votedMap, setVotedMap] = useState<{ [id: string]: boolean }>({});

  const handleVote = (id: string) => {
    if (votedMap[id]) return;
    setVotedMap(prev => ({ ...prev, [id]: true }));
    const updated = tracks.map(t => t.id === id ? { ...t, votes: t.votes + 1 } : t);
    // Sort by votes
    updated.sort((a, b) => b.votes - a.votes);
    const reRanked = updated.map((t, idx) => ({ ...t, rank: idx + 1 }));
    setTracks(reRanked);
    localStorage.setItem('igofa_chart_votes', JSON.stringify(reRanked));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            Official Teso Airplay Countdown
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
            Top 10 Ateker & Ugandan Charts
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Voted weekly by IGOFARADIO 97.6 FM listeners across Malera, Bukedea, Soroti, and worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
          <Flame className="w-4 h-4 text-brand-500" />
          <span>Chart updates daily at 9:00 PM EAT</span>
        </div>
      </div>

      <div className="space-y-3">
        {tracks.map((track) => {
          const isVoted = !!votedMap[track.id];
          return (
            <div
              key={track.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                track.rank === 1
                  ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : track.rank === 2
                  ? 'bg-slate-900/80 border-slate-700/80'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl font-black font-heading text-lg ${
                    track.rank === 1
                      ? 'bg-gradient-to-br from-amber-400 to-brand-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : track.rank === 2
                      ? 'bg-slate-700 text-white'
                      : track.rank === 3
                      ? 'bg-amber-800/60 text-amber-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{track.rank}
                </div>

                {/* Song Details */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white font-heading">
                      {track.title}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-brand-300 border border-slate-700">
                      {track.genre}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* Vote & Request Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                <div className="text-right sm:mr-2">
                  <div className="text-xs font-bold text-white">
                    {track.votes.toLocaleString()} votes
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    Community Score
                  </div>
                </div>

                <button
                  onClick={() => handleVote(track.id)}
                  disabled={isVoted}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isVoted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-brand-500/15 hover:bg-brand-500 text-brand-300 hover:text-white border border-brand-500/30'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isVoted ? 'Voted' : 'Vote'}</span>
                </button>

                <a
                  href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Please%20play%20track%20%23${track.rank}%20${encodeURIComponent(track.title)}%20by%20${encodeURIComponent(track.artist)}%20on%20IGOFARADIO%2097.6%20FM`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-emerald-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
                  title="Request on air via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Request</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
