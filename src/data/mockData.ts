export interface Project {
  id: string;
  title: string;
  companyName: string;
  category: string;
  budget: number;
  duration: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  description: string;
  datePosted: string;
  color: string;
}

export interface Application {
  id: string;
  projectId: string;
  projectTitle: string;
  companyName: string;
  budget: number;
  status: 'Applied' | 'Shortlisted' | 'Accepted' | 'Rejected';
  appliedDate: string;
  coverLetter: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'client';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  clientName: string;
  companyName: string;
  projectTitle: string;
  avatarColor: string;
  messages: Message[];
  unread?: boolean;
}

export interface Transaction {
  id: string;
  projectTitle: string;
  companyName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending';
  invoiceId: string;
}

export interface UserProfile {
  name: string;
  age: number;
  skills: string[];
  education: string;
  portfolio: { title: string; link: string; description: string }[];
  avatar: string;
}

export const mockCategories = [
  { name: 'Graphic Design', icon: 'Palette', desc: 'Design logos, posters, banners & more', color: 'from-purple-500/20 to-indigo-500/20' },
  { name: 'Content Writing', icon: 'PenTool', desc: 'Write blogs, articles and social posts', color: 'from-orange-500/20 to-amber-500/20' },
  { name: 'Video Editing', icon: 'Video', desc: 'Edit reels, videos and short clips', color: 'from-rose-500/20 to-pink-500/20' },
  { name: 'Web Development', icon: 'Code2', desc: 'Build websites and landing pages', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Social Media', icon: 'Share2', desc: 'Manage posts and grow pages', color: 'from-emerald-500/20 to-teal-500/20' }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Logo and Branding Kit',
    companyName: 'FreshBites Cafe',
    category: 'Graphic Design',
    budget: 2500,
    duration: '5 days',
    skillLevel: 'Beginner',
    skills: ['Canva', 'Illustrator', 'Logo Design'],
    description: 'We need a clean, modern logo for our local cafe. The brand stands for healthy food, fresh ingredients, and cozy vibes. You will need to provide a primary logo, secondary logo, color palette, and basic social media profile templates.',
    datePosted: '2026-06-07',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
  },
  {
    id: 'p2',
    title: 'Blog Posts for Tech Blog',
    companyName: 'DevLearn',
    category: 'Content Writing',
    budget: 3000,
    duration: '7 days',
    skillLevel: 'Intermediate',
    skills: ['SEO Writing', 'Technical Writing', 'Research'],
    description: 'Looking for a teen writer to write 3 engaging blog posts (800-1000 words each) about starting coding in high school. Must understand basic web development concepts and be able to write in a friendly, conversational tone.',
    datePosted: '2026-06-06',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
  },
  {
    id: 'p3',
    title: 'Instagram Reel Editing',
    companyName: 'FitLife Studio',
    category: 'Video Editing',
    budget: 4000,
    duration: '4 days',
    skillLevel: 'Intermediate',
    skills: ['Premiere Pro', 'CapCut', 'Reels'],
    description: 'Edit 5 raw workouts into short-form, fast-paced Instagram Reels with text overlay, trending audio sync, and smooth transitions. Captions and hashtags list should also be provided.',
    datePosted: '2026-06-06',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
  },
  {
    id: 'p4',
    title: 'Landing Page for Startup',
    companyName: 'SaaSify',
    category: 'Web Development',
    budget: 8000,
    duration: '10 days',
    skillLevel: 'Advanced',
    skills: ['HTML/CSS', 'Tailwind CSS', 'JavaScript'],
    description: 'Help us build a responsive single-page marketing website for our new SaaS product. Figma designs will be provided. The code should be clean, semantic, and mobile-friendly.',
    datePosted: '2026-06-05',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
  },
  {
    id: 'p5',
    title: 'Social Media Manager',
    companyName: 'GlowSkin Co.',
    category: 'Social Media',
    budget: 5000,
    duration: '15 days',
    skillLevel: 'Beginner',
    skills: ['Instagram', 'Canva', 'Scheduling'],
    description: 'Manage our Instagram page for 2 weeks. Design 10 post creatives using our brand colors, write captions, schedule posts, and reply to comments daily.',
    datePosted: '2026-06-05',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
  },
  {
    id: 'p6',
    title: 'Flyer and Poster Design',
    companyName: 'EventHub',
    category: 'Graphic Design',
    budget: 1500,
    duration: '3 days',
    skillLevel: 'Beginner',
    skills: ['Canva', 'Graphic Design'],
    description: 'Design an digital flyer and printable poster for a local battle-of-the-bands concert. The design should be energetic, retro, and clear.',
    datePosted: '2026-06-04',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
  },
  {
    id: 'p7',
    title: 'YouTube Video Editor',
    companyName: 'TechTalk Channel',
    category: 'Video Editing',
    budget: 6000,
    duration: '8 days',
    skillLevel: 'Intermediate',
    skills: ['FCPX', 'Premiere Pro', 'Sound Effects'],
    description: 'Edit a 12-minute tech review vlog. Cut out pauses, add zoom-ins, color grade the footage, add background music tracks, and implement descriptive text cards throughout.',
    datePosted: '2026-06-04',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
  },
  {
    id: 'p8',
    title: 'Product Descriptions Writer',
    companyName: 'ShopCart',
    category: 'Content Writing',
    budget: 2000,
    duration: '5 days',
    skillLevel: 'Beginner',
    skills: ['Copywriting', 'Creative Writing'],
    description: 'Write catchy and persuasive product descriptions for 20 new eco-friendly kitchenware items on our Shopify store. Word count: 100-150 words per item.',
    datePosted: '2026-06-03',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
  },
  {
    id: 'p9',
    title: 'Portfolio Website Development',
    companyName: 'Architects Ink',
    category: 'Web Development',
    budget: 10000,
    duration: '14 days',
    skillLevel: 'Advanced',
    skills: ['React', 'CSS', 'Responsive Design'],
    description: 'Create a highly visual, modern portfolio website for a freelance architect. Needs a grid gallery, an about page, and a contact page. High-quality imagery will be provided.',
    datePosted: '2026-06-03',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
  },
  {
    id: 'p10',
    title: 'TikTok Content Creator',
    companyName: 'FashionPulse',
    category: 'Social Media',
    budget: 4500,
    duration: '10 days',
    skillLevel: 'Intermediate',
    skills: ['Content Creation', 'TikTok Video'],
    description: 'Create 6 short videos showcasing our new summer apparel collection. Can use self-recorded aesthetic shots or compilation videos. Sound choice must match Gen-Z trends.',
    datePosted: '2026-06-02',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
  },
  {
    id: 'p11',
    title: 'T-Shirt Mockup Designs',
    companyName: 'ThreadTrend',
    category: 'Graphic Design',
    budget: 3500,
    duration: '6 days',
    skillLevel: 'Intermediate',
    skills: ['Photoshop', 'Apparel Design'],
    description: 'Design 5 street-style graphic prints for our upcoming oversized t-shirt drop. Deliverables must be editable high-res PSD files along with mockups.',
    datePosted: '2026-06-02',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
  },
  {
    id: 'p12',
    title: 'Copywriting for Landing Page',
    companyName: 'GrowSaaS',
    category: 'Content Writing',
    budget: 4000,
    duration: '5 days',
    skillLevel: 'Intermediate',
    skills: ['Copywriting', 'SEO'],
    description: 'Draft the sales copywriting for a SaaS analytics tool landing page. Needs a header, feature descriptions, FAQ page text, and compelling CTAs.',
    datePosted: '2026-06-01',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
  },
  {
    id: 'p13',
    title: 'Promo Video Editing',
    companyName: 'LaunchPad Incubator',
    category: 'Video Editing',
    budget: 7500,
    duration: '6 days',
    skillLevel: 'Advanced',
    skills: ['After Effects', 'Premiere Pro', 'Motion Graphics'],
    description: 'Edit a 1-minute high-energy promotional video for a student pitch competition. Needs animations, logo reveal, dynamic background music, and fast cuts.',
    datePosted: '2026-06-01',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
  },
  {
    id: 'p14',
    title: 'Simple WordPress Setup',
    companyName: 'PetStore Local',
    category: 'Web Development',
    budget: 5000,
    duration: '7 days',
    skillLevel: 'Beginner',
    skills: ['WordPress', 'Elementor'],
    description: 'Install WordPress and configure a basic website template for a local pet grooming service. Customize colors, add contact details, and input 5 default pages.',
    datePosted: '2026-05-31',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
  },
  {
    id: 'p15',
    title: 'Pinterest Board Curator',
    companyName: 'DecoDreams',
    category: 'Social Media',
    budget: 2000,
    duration: '7 days',
    skillLevel: 'Beginner',
    skills: ['Pinterest', 'Canva'],
    description: 'Pin and organize 100 high-quality interior design images on our brand Pinterest boards. Design 15 custom Pins on Canva to link back to our store.',
    datePosted: '2026-05-31',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
  },
  {
    id: 'p16',
    title: 'Business Card & Stationary',
    companyName: 'LexConsult',
    category: 'Graphic Design',
    budget: 1800,
    duration: '4 days',
    skillLevel: 'Beginner',
    skills: ['Illustrator', 'Branding'],
    description: 'Create corporate-style business cards and letterhead mockups for a small legal consulting firm. The look should be minimal and trustworthy.',
    datePosted: '2026-05-30',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
  },
  {
    id: 'p17',
    title: 'Newsletter Content Writer',
    companyName: 'FinFuture',
    category: 'Content Writing',
    budget: 3500,
    duration: '6 days',
    skillLevel: 'Intermediate',
    skills: ['Newsletter Writing', 'Finance basics'],
    description: 'Draft 2 editions of a bi-weekly newsletter explaining basic stock market and cryptocurrency terms in simple language for teenagers.',
    datePosted: '2026-05-30',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
  },
  {
    id: 'p18',
    title: 'Vlog Editing for Travel Channel',
    companyName: 'Wanderlust Vlogs',
    category: 'Video Editing',
    budget: 5000,
    duration: '7 days',
    skillLevel: 'Intermediate',
    skills: ['Premiere Pro', 'Color Grading'],
    description: 'Edit a 15-minute cinematic travel vlog from raw footage. Stabilize shaky shots, apply a warm summer preset color grading, and add lofi bg music.',
    datePosted: '2026-05-29',
    color: 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
  },
  {
    id: 'p19',
    title: 'Interactive Quiz Page (React)',
    companyName: 'EduQuest',
    category: 'Web Development',
    budget: 9000,
    duration: '10 days',
    skillLevel: 'Advanced',
    skills: ['React', 'JavaScript', 'State Management'],
    description: 'Code a React component that runs a 10-question multiple-choice quiz. Needs a timer, animated transitions, score calculation, and result breakdown screen.',
    datePosted: '2026-05-29',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
  },
  {
    id: 'p20',
    title: 'Facebook Ad Creative Manager',
    companyName: 'Local Gym Co.',
    category: 'Social Media',
    budget: 3000,
    duration: '8 days',
    skillLevel: 'Intermediate',
    skills: ['Ad Creatives', 'Facebook Ads'],
    description: 'Design 6 high-conversion image ad templates on Canva targeting college students for a local fitness membership offer.',
    datePosted: '2026-05-28',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    projectId: 'p4',
    projectTitle: 'Landing Page for Startup',
    companyName: 'SaaSify',
    budget: 8000,
    status: 'Shortlisted',
    appliedDate: '2026-06-05',
    coverLetter: "Hi SaaSify, I've built multiple landing pages in React and Tailwind CSS. You can see my portfolio links below..."
  },
  {
    id: 'app-2',
    projectId: 'p13',
    projectTitle: 'Promo Video Editing',
    companyName: 'LaunchPad Incubator',
    budget: 7500,
    status: 'Accepted',
    appliedDate: '2026-06-02',
    coverLetter: "I have 2 years of experience editing short promotional videos using After Effects. I can edit this with very high energy."
  },
  {
    id: 'app-3',
    projectId: 'p20',
    projectTitle: 'Facebook Ad Creative Manager',
    companyName: 'Local Gym Co.',
    budget: 3000,
    status: 'Rejected',
    appliedDate: '2026-05-29',
    coverLetter: "I'd love to help design Facebook Ads. I've designed several social media creatives for other local clients."
  }
];

export const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    clientName: 'Siddharth (SaaSify)',
    companyName: 'SaaSify',
    projectTitle: 'Landing Page for Startup',
    avatarColor: 'bg-blue-500',
    messages: [
      { id: 'm1', sender: 'client', text: 'Hi Aryan! We reviewed your cover letter for our landing page project. Your portfolio looks great.', timestamp: '2026-06-06T10:30:00Z' },
      { id: 'm2', sender: 'user', text: 'Thank you Siddharth! I am really excited about this project. I can write semantic, accessible HTML/CSS with clean Tailwind styling.', timestamp: '2026-06-06T10:32:00Z' },
      { id: 'm3', sender: 'client', text: 'Awesome. Can you show us some React samples that you have built? Especially with responsive layouts.', timestamp: '2026-06-06T10:34:00Z' },
      { id: 'm4', sender: 'user', text: 'Sure! I built a personal portfolio site and a quiz dashboard. You can see them here: github.com/aryansharma-dev', timestamp: '2026-06-06T10:35:00Z' },
      { id: 'm5', sender: 'client', text: 'Excellent! We are shortlisting you. We will finalize our decision by tomorrow. Talk soon.', timestamp: '2026-06-06T10:36:00Z' }
    ]
  },
  {
    id: 'conv-2',
    clientName: 'Karan (LaunchPad)',
    companyName: 'LaunchPad Incubator',
    projectTitle: 'Promo Video Editing',
    avatarColor: 'bg-purple-500',
    unread: true,
    messages: [
      { id: 'm6', sender: 'client', text: 'Hey Aryan! Your pitch video sample was exactly what we were looking for.', timestamp: '2026-06-04T14:10:00Z' },
      { id: 'm7', sender: 'user', text: 'Hi Karan! Glad to hear that. I can start working on the edits as soon as you share the raw footages.', timestamp: '2026-06-04T14:15:00Z' },
      { id: 'm8', sender: 'client', text: 'Awesome. We have accepted your application. Sending over the raw files now. Let me know when you receive them!', timestamp: '2026-06-05T09:00:00Z' }
    ]
  }
];

export const initialTransactions: Transaction[] = [
  { id: 'tx-1', projectTitle: 'Pinterest Board Curator', companyName: 'DecoDreams', amount: 2000, date: '2026-06-07', status: 'Completed', invoiceId: 'INV-2026-004' },
  { id: 'tx-2', projectTitle: 'Promo Video Editing', companyName: 'LaunchPad Incubator', amount: 7500, date: '2026-06-05', status: 'Pending', invoiceId: 'INV-2026-005' },
  { id: 'tx-3', projectTitle: 'TikTok Content Creator', companyName: 'FashionPulse', amount: 4500, date: '2026-05-28', status: 'Completed', invoiceId: 'INV-2026-003' },
  { id: 'tx-4', projectTitle: 'Facebook Ad Creative Manager', companyName: 'Local Gym Co.', amount: 3000, date: '2026-05-25', status: 'Completed', invoiceId: 'INV-2026-002' },
  { id: 'tx-5', projectTitle: 'Logo and Branding Kit', companyName: 'FreshBites Cafe', amount: 2500, date: '2026-06-08', status: 'Pending', invoiceId: 'INV-2026-006' }
];

export const initialProfile: UserProfile = {
  name: 'Aryan Sharma',
  age: 16,
  skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Figma', 'Video Editing'],
  education: 'Class 11, Greenwoods High School',
  portfolio: [
    { title: 'Personal Portfolio Site', link: 'https://aryan-sharma.dev', description: 'A sleek portfolio website built with React and Tailwind CSS.' },
    { title: 'Quiz Dashboard App', link: 'https://eduquiz-aryan.vercel.app', description: 'Interactive quiz portal with dashboard statistics.' }
  ],
  avatar: '' // Will load default styled initials placeholder if empty
};
