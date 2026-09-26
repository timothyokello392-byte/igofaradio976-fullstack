import React, { useState } from 'react';
import { Newspaper, Sprout, Users, GraduationCap, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { NEWS_ITEMS, STATION_INFO } from '../data/stationData';
import { NewsItem } from '../types';

export const CommunityNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const categories = ['All', 'Agriculture', 'Community', 'Youth & Education'];

  const filteredNews = selectedCategory === 'All'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(n => n.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Agriculture': return <Sprout className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Youth & Education': return <GraduationCap className="w-3.5 h-3.5 text-sky-400" />;
      default: return <Users className="w-3.5 h-3.5 text-brand-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            Voice of Malera News Desk
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
            Teso Community & Farming Updates
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Local news, modern agricultural advisory, crop prices, and youth stories from Bukedea District and eastern Uganda.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Callout Banner for Farmers */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex-shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Asuban Farmer's Notice
            </span>
            <h3 className="text-base font-bold text-white font-heading">
              Have crop produce or livestock to announce on 97.6 FM?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Broadcast your farming alerts, tractor services, or market updates during our 6:00 AM agricultural segment.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20IGOFARADIO,%20I%20have%20an%20agricultural%20announcement%20for%20Malera/Bukedea`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
        >
          Submit Farming Notice
        </a>
      </div>

      {/* News list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400">
                  {item.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-heading group-hover:text-brand-300 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>By {item.author}</span>
              <button
                onClick={() => setActiveArticle(item)}
                className="text-brand-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Read more <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {getCategoryIcon(activeArticle.category)}
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl font-bold text-white font-heading mb-2">
              {activeArticle.title}
            </h2>

            <div className="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800 flex items-center gap-3">
              <span>Reported by {activeArticle.author}</span>
              <span>•</span>
              <span>{activeArticle.date}</span>
            </div>

            <div className="text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>{activeArticle.summary}</p>
              <p>
                Listeners across Malera, Bukedea, Kumi, and Soroti can tune into IGOFARADIO 97.6 FM daily during the live news segment for follow-up interviews and expert commentary.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
