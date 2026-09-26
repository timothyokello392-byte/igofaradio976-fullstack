export interface Program {
  id: string;
  title: string;
  host: string;
  timeSlot: string; // e.g. "20:00 - 22:00 EAT"
  days: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  description: string;
  genre: string;
  isLiveNow?: boolean;
}

export interface Shoutout {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
  likes: number;
  tags?: string[];
}

export interface SongTrack {
  id: string;
  rank: number;
  title: string;
  artist: string;
  albumArt?: string;
  genre: string;
  votes: number;
}

export interface NewsItem {
  id: string;
  category: 'Community' | 'Agriculture' | 'Youth & Education' | 'Sports';
  title: string;
  summary: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Presenter {
  name: string;
  role: string;
  show: string;
  bio: string;
  contact: string;
  avatarUrl: string;
}
