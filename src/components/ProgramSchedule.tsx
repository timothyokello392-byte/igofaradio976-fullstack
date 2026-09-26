import React, { useState } from 'react';
import { Clock, Calendar, Radio, Bell, User, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, STATION_INFO } from '../data/stationData';

export const ProgramSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [reminders, setReminders] = useState<{ [id: string]: boolean }>({});

  const daysOfWeek = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleReminder = (id: string, title: string) => {
    setReminders(prev => {
      const nextState = !prev[id];
      if (nextState) {
        // notification feedback
        alert(`Reminder set for "${title}". Tune in on 97.6 FM or stream live!`);
      }
      return { ...prev, [id]: nextState };
    });
  };

  const filteredPrograms = selectedDay === 'All'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.days.includes(selectedDay));

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-2">
            <Radio className="w-3.5 h-3.5" />
            97.6 FM Broadcast Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
            Weekly Program Schedule
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Broadcasting 24/7 online and across Teso Sub-Region with live evening shows daily from 8 PM to 10 PM EAT.
          </p>
        </div>

        {/* Day filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrograms.map((program) => {
          const isReminded = !!reminders[program.id];
          return (
            <div
              key={program.id}
              className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-200 ${
                program.isLiveNow
                  ? 'bg-gradient-to-br from-slate-900 via-brand-950/20 to-slate-900 border-brand-500/50 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/30'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80'
              }`}
            >
              {/* Highlight ribbon for flagship show */}
              {program.isLiveNow && (
                <div className="absolute top-0 right-0">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-l from-emerald-600 to-emerald-500 text-white font-black text-[11px] uppercase tracking-wider rounded-bl-xl shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    FLAGSHIP SHOW
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
                    {program.genre}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {program.title}
                  </h3>
                </div>
              </div>

              {/* Host & Timing */}
              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-amber-300">
                  <User className="w-3.5 h-3.5 text-brand-400" />
                  {program.host}
                </span>

                <span className="flex items-center gap-1.5 font-semibold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {program.timeSlot}
                </span>

                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {program.days.join(', ')}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                {program.description}
              </p>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {program.isLiveNow ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Listen now on 97.6 FM
                    </span>
                  ) : (
                    <button
                      onClick={() => toggleReminder(program.id, program.title)}
                      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        isReminded
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      {isReminded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Reminder active</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-slate-400" />
                          <span>Set reminder</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <a
                  href={`https://wa.me/${STATION_INFO.whatsappNumber}?text=Hello%20Lokide,%20I%20want%20to%20request%20a%20song%20on%20${encodeURIComponent(program.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                >
                  Request on this show &rarr;
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
