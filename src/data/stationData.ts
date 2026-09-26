import { Program, SongTrack, NewsItem, Presenter, Shoutout } from '../types';

export const STATION_INFO = {
  name: "IGOFARADIO 97.6 FM",
  slogan: "Voice of Malera | The No.1 Ateker Community Radio",
  tagline: "Live on air from Malera, Bukedea, Teso Sub-Region, Uganda",
  frequency: "97.6 FM",
  location: "Malera Town Council, Bukedea District, Teso, Eastern Uganda",
  streamUrl: "https://stream.zeno.fm/fzw34id6rzttv",
  zenoPageUrl: "https://zeno.fm/radio/igofaradio976",
  phone: "+256 778 222 238",
  whatsappNumber: "256778222238",
  email: "timothyokello392@gmail.com",
  tiktok: "@tigerkinglokide256",
  languages: ["Ateso", "English", "Swahili"],
  coreGenres: ["Ateker Traditional", "Gospel Hits", "Ugandan Afrobeat", "Kadodi Rhythms"],
};

export const PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "Ateker Night Drive & Request Hour",
    host: "Tiger King Lokide",
    timeSlot: "20:00 - 22:00 EAT",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    description: "The premier flagship show across Teso and diaspora! Live listener call-ins, greetings, top Ugandan & Ateker vibes, and community news wrap-up.",
    genre: "Live Talk & Ateker Hits",
    isLiveNow: true,
  },
  {
    id: "p2",
    title: "Teso Dawn & Farmer's Voice (Asuban)",
    host: "Papa Stephen & Team",
    timeSlot: "06:00 - 09:00 EAT",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    description: "Early morning agricultural updates, cassava, maize & millet market prices in Malera & Kumi, weather alerts, and traditional blessing songs.",
    genre: "Agriculture & Morning Gospel",
  },
  {
    id: "p3",
    title: "Bukedea Midday Express",
    host: "DJ Sparks Teso",
    timeSlot: "11:00 - 14:00 EAT",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    description: "Non-stop energetic rhythms, mid-day shoutouts, community development highlights, and trending Ugandan tracks.",
    genre: "Ugandan Afro-pop & Dance",
  },
  {
    id: "p4",
    title: "Youth Voices & Education Hour",
    host: "Aura Grace & Lokide",
    timeSlot: "15:00 - 17:30 EAT",
    days: ["Mon", "Wed", "Fri", "Sat"],
    description: "Empowering schools, vocational tips, young innovators across Teso, health education, and talent discovery.",
    genre: "Youth & Education",
  },
  {
    id: "p5",
    title: "Ateker Cultural Heritage & Folklore",
    host: "Elders Forum & Tiger King",
    timeSlot: "18:00 - 20:00 EAT",
    days: ["Tue", "Thu", "Sun"],
    description: "Deep dive into Iteso history, proverbs (Awaragasia), clan heritage, peace-building, and authentic acoustic folk instruments (Adungu & Akogo).",
    genre: "Traditional & Culture",
  },
  {
    id: "p6",
    title: "Sunday Divine Worship & Gospel Waves",
    host: "Pastor John & Lokide",
    timeSlot: "07:00 - 12:00 EAT",
    days: ["Sun"],
    description: "Uplifting Sunday spiritual praise, local choir performances, church sermons, and prayers for families and peace.",
    genre: "Gospel & Praise",
  }
];

export const TOP_TRACKS: SongTrack[] = [
  {
    id: "t1",
    rank: 1,
    title: "Ateker Ayei (Our Land)",
    artist: "Teso All Stars ft. Lokide",
    genre: "Ateker Folk / Afro",
    votes: 482,
  },
  {
    id: "t2",
    rank: 2,
    title: "Eong Ngesi (I am blessed)",
    artist: "Sarah Akello",
    genre: "Gospel",
    votes: 395,
  },
  {
    id: "t3",
    rank: 3,
    title: "Bukedea Sweet Home",
    artist: "Young Tiger",
    genre: "East African Beat",
    votes: 341,
  },
  {
    id: "t4",
    rank: 4,
    title: "Kacoke Lokasuban",
    artist: "Ateker Heritage Troupe",
    genre: "Akogo Traditional",
    votes: 289,
  },
  {
    id: "t5",
    rank: 5,
    title: "Peace in Uganda",
    artist: "Malera Youth Choir",
    genre: "Inspirational",
    votes: 254,
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    category: "Agriculture",
    title: "Cassava & Groundnut Harvest Insights for Farmers in Bukedea and Kumi",
    summary: "Agricultural extension officers in Malera advise farmers on post-harvest handling and securing grain stores against unexpected seasonal rainfall.",
    date: "Today, 10:30 AM EAT",
    author: "Malera Ag Desk",
    readTime: "3 min read",
  },
  {
    id: "n2",
    category: "Community",
    title: "IGOFARADIO 97.6 Launches Clean Water Awareness Initiative in Malera Sub-County",
    summary: "Tiger King Lokide and community leaders visited 6 local parishes to spotlight borehole rehabilitation and water sanitation efforts.",
    date: "Yesterday",
    author: "Timothy Okello",
    readTime: "2 min read",
  },
  {
    id: "n3",
    category: "Youth & Education",
    title: "Bukedea Secondary Schools Music and Traditional Dance Festival Announced",
    summary: "Over 15 secondary schools will showcase Iteso cultural heritage, folk songs, and debate competitions broadcast live on 97.6 FM.",
    date: "2 days ago",
    author: "Cultural Desk",
    readTime: "4 min read",
  }
];

export const PRESENTERS: Presenter[] = [
  {
    name: "Tiger King Lokide",
    role: "Lead Station Host & Creative Producer",
    show: "Ateker Night Drive (Daily 8-10 PM EAT)",
    bio: "Passionate broadcaster and voice of Ateker community in Malera and Bukedea. Dedicated to promoting local music, youth talent, and Teso unity worldwide.",
    contact: "+256 778 222 238",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Timothy Okello",
    role: "Founder & Station General Manager",
    show: "Community Development & Leadership Forum",
    bio: "Visionary behind IGOFARADIO 97.6 FM, bridging local voices from Eastern Uganda to listeners globally via digital streams.",
    contact: "timothyokello392@gmail.com",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  }
];

export const INITIAL_SHOUTOUTS: Shoutout[] = [
  {
    id: "s1",
    name: "Emmanuel Oumo",
    location: "Malera Town Council",
    message: "Tuning in loud and clear in Malera! Shoutout to all farmers gathering millet today. Tiger King keep the music playing!",
    timestamp: "10 mins ago",
    likes: 14,
    tags: ["Malera", "AtekerPride"],
  },
  {
    id: "s2",
    name: "Mary Christine Akello",
    location: "Kampala, Uganda",
    message: "Listening online from Kampala! I miss home so much, hearing Ateso on IGOFARADIO makes me feel right beside my family.",
    timestamp: "25 mins ago",
    likes: 21,
    tags: ["Diaspora", "Family"],
  },
  {
    id: "s3",
    name: "Patrick Ilukor",
    location: "Bukedea Central",
    message: "Greetings to the entire Lokide team on 97.6 FM. Please play track #1 Ateker Ayei for my brother in Soroti!",
    timestamp: "42 mins ago",
    likes: 9,
    tags: ["SongRequest", "Soroti"],
  },
  {
    id: "s4",
    name: "Grace Asekenye",
    location: "Nairobi, Kenya",
    message: "Ateker community live and united across the borders! Crystal clear audio stream.",
    timestamp: "1 hour ago",
    likes: 18,
    tags: ["EastAfrica", "LiveRadio"],
  }
];
