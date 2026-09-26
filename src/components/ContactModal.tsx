import React, { useState } from 'react';
import { X, Phone, MessageCircle, Mail, MapPin, Radio, Send, Check } from 'lucide-react';
import { STATION_INFO } from '../data/stationData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('Studio Shoutout & Feedback');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
              Connect with IGOFARADIO 97.6 FM
            </h2>
            <p className="text-xs text-slate-400">
              Studio Hotline, Advertisements, Music Submissions & Community Desk
            </p>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          <a
            href={`https://wa.me/${STATION_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/30 transition-colors"
          >
            <div className="p-2.5 rounded-lg bg-emerald-500 text-white">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400">WhatsApp Studio</div>
              <div className="text-xs text-white font-mono">{STATION_INFO.phone}</div>
            </div>
          </a>

          <a
            href={`tel:${STATION_INFO.phone}`}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            <div className="p-2.5 rounded-lg bg-brand-500 text-white">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-400">Live Call Desk</div>
              <div className="text-xs text-white font-mono">{STATION_INFO.phone}</div>
            </div>
          </a>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
            <div className="p-2.5 rounded-lg bg-sky-500 text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-sky-400">Station Email</div>
              <div className="text-xs text-white font-mono truncate">{STATION_INFO.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
            <div className="p-2.5 rounded-lg bg-amber-500 text-slate-950">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400">Location</div>
              <div className="text-xs text-white">Malera, Bukedea, Uganda</div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Message Transmitted!</h4>
            <p className="text-xs text-emerald-300">
              Thank you for reaching out. The production team and Tiger King Lokide have received your dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Purpose / Topic</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="Studio Shoutout & Feedback">Studio Shoutout & Feedback</option>
                <option value="Station Advertising & Sponsoring">Station Advertising & Sponsorship</option>
                <option value="Artist Music Submission">Artist Music Submission</option>
                <option value="Community / Farming Announcement">Community / Farming Announcement</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Timothy"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone / Email</label>
                <input
                  type="text"
                  placeholder="e.g. +256 ... or email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Message *</label>
              <textarea
                required
                rows={3}
                placeholder="Write your note to the station..."
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Station</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
