import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  PenTool, 
  Video, 
  Code2, 
  Share2, 
  MoreHorizontal, 
  ArrowRight, 
  Star, 
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  Briefcase,
  Building2,
  Trophy,
  User,
  FileText,
  Wallet,
  ChevronDown,
  TrendingUp
} from 'lucide-react';

interface TeenHomeProps {
  onLogin: () => void;
  onSignUp: () => void;
  onExploreProjects: (category?: string) => void;
  onSwitchToCompany?: () => void;
}

const testimonials = [
  {
    id: 1,
    name: 'Ananya',
    age: 16,
    role: 'Content Writer',
    quote: 'Funngro helped me turn my skills into earnings. I love the flexibility and the support!',
    rating: 5,
    avatar: '/avatar_neha.png'
  },
  {
    id: 2,
    name: 'Arjun',
    age: 15,
    role: 'Graphic Designer',
    quote: 'I earned my first income at 15! Funngro gave me confidence and new skills.',
    rating: 5,
    avatar: '/avatar_ravi.png'
  },
  {
    id: 3,
    name: 'Rohan',
    age: 17,
    role: 'Video Editor',
    quote: 'The projects are fun and help me learn new things every day. Getting paid directly is awesome!',
    rating: 5,
    avatar: '/avatar_amit.png'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function TeenHome({ onLogin, onSignUp, onExploreProjects, onSwitchToCompany }: TeenHomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen font-sans transition-colors duration-300">
      
      {/* Navbar Section */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-display text-2xl font-bold text-[#0F172A] flex items-center">
              funn<span className="text-[#6C4DF6]">gro</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#64748B]">
            <button onClick={() => onExploreProjects()} className="hover:text-[#6C4DF6] transition-colors cursor-pointer">Find Work</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#6C4DF6] transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => scrollToSection('success-stories')} className="hover:text-[#6C4DF6] transition-colors cursor-pointer">Success Stories</button>
            <button onClick={() => alert('Blog coming soon!')} className="hover:text-[#6C4DF6] transition-colors cursor-pointer">Blog</button>
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowResources(!showResources)}
                onMouseEnter={() => setShowResources(true)}
                className="hover:text-[#6C4DF6] transition-colors cursor-pointer font-medium text-sm flex items-center gap-1 text-[#64748B]"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`} />
              </button>
              
              {showResources && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50"
                  onMouseLeave={() => setShowResources(false)}
                >
                  <button onClick={() => { setShowResources(false); alert('Guides coming soon!'); }} className="text-left px-4 py-2 hover:bg-[#F8FAFC] text-[#0F172A] hover:text-[#6C4DF6] rounded-lg text-sm transition-colors cursor-pointer">Guides</button>
                  <button onClick={() => { setShowResources(false); alert('Templates coming soon!'); }} className="text-left px-4 py-2 hover:bg-[#F8FAFC] text-[#0F172A] hover:text-[#6C4DF6] rounded-lg text-sm transition-colors cursor-pointer">Templates</button>
                  <button onClick={() => { setShowResources(false); alert('Webinars coming soon!'); }} className="text-left px-4 py-2 hover:bg-[#F8FAFC] text-[#0F172A] hover:text-[#6C4DF6] rounded-lg text-sm transition-colors cursor-pointer">Webinars</button>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {onSwitchToCompany && (
              <button
                onClick={onSwitchToCompany}
                className="px-4.5 py-2 border border-[#6C4DF6]/35 text-[#6C4DF6] hover:bg-[#6C4DF6]/5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
              >
                Company Portal
              </button>
            )}
            <button 
              onClick={onLogin} 
              className="px-5 py-2 text-[#64748B] hover:text-[#6C4DF6] font-semibold text-sm transition-colors cursor-pointer"
            >
              Login
            </button>
            <button 
              onClick={onSignUp} 
              className="px-5 py-2.5 bg-[#6C4DF6] hover:bg-[#5237CE] text-white rounded-[24px] font-semibold text-sm transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#0F172A] hover:text-[#6C4DF6] p-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-[#E2E8F0] overflow-hidden shadow-inner"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onExploreProjects(); }}
                className="text-left text-[#0F172A] hover:text-[#6C4DF6] font-medium text-base py-1 cursor-pointer"
              >
                Find Work
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); scrollToSection('how-it-works'); }}
                className="text-left text-[#0F172A] hover:text-[#6C4DF6] font-medium text-base py-1 cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); scrollToSection('success-stories'); }}
                className="text-left text-[#0F172A] hover:text-[#6C4DF6] font-medium text-base py-1 cursor-pointer"
              >
                Success Stories
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); alert('Blog coming soon!'); }}
                className="text-left text-[#0F172A] hover:text-[#6C4DF6] font-medium text-base py-1 cursor-pointer"
              >
                Blog
              </button>
              
              <div className="border-t border-[#E2E8F0] my-2 pt-4 flex flex-col gap-4">
                {onSwitchToCompany && (
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); onSwitchToCompany(); }}
                    className="w-full text-center px-4 py-2.5 bg-[#F0EDFF] text-[#6C4DF6] hover:bg-[#6C4DF6] hover:text-white font-semibold text-sm transition-all rounded-full cursor-pointer"
                  >
                    Company Portal
                  </button>
                )}
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onLogin(); }}
                  className="w-full text-center px-4 py-2.5 text-[#0F172A] hover:text-[#6C4DF6] font-semibold text-sm transition-colors border border-[#E2E8F0] rounded-full cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onSignUp(); }}
                  className="w-full text-center px-4 py-2.5 bg-[#6C4DF6] hover:bg-[#5237CE] text-white font-semibold text-sm transition-all rounded-[24px] shadow-md cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-[#F8FAFC]">
        {/* Subtle purple blur decoration */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[450px] h-[450px] bg-[#6C4DF6]/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0EDFF] text-[#6C4DF6] text-xs font-semibold mb-6 border border-[#6C4DF6]/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>For Teens Only</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-[#0F172A]">
                Work. Learn.<br />
                <span className="text-[#6C4DF6]">Earn.</span> Repeat.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-[#64748B] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Join thousands of teenagers who are earning, learning and building their future with Funngro.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button 
                  onClick={() => onExploreProjects()} 
                  className="w-full sm:w-auto bg-[#6C4DF6] hover:bg-[#5237CE] text-white font-semibold px-8 py-4 rounded-[24px] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  Find Work Now <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="w-full sm:w-auto border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] hover:border-[#6C4DF6]/30 font-semibold px-8 py-4 rounded-[24px] transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  How It Works
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-6 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-[10px]">✓</span>
                  <span>100% Safe</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-[10px]">✓</span>
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-[10px]">✓</span>
                  <span>Earn from Home</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-[10px]">✓</span>
                  <span>Skill Development</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative w-full max-w-md md:max-w-lg aspect-square">
                
                {/* Decorative background circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#6C4DF6]/10 to-[#8B5CF6]/5 blur-xl"></div>
                
                {/* Generated Teen Image */}
                <img 
                  src="/teen_hero_laptop.png" 
                  alt="Teen working on laptop" 
                  className="w-full h-full object-contain relative z-10 animate-float"
                />

                {/* Floating Card 1: Earnings */}
                <div className="absolute top-[15%] left-[-5%] z-20 bg-white border border-[#E2E8F0] px-5 py-3 rounded-[24px] flex items-center gap-3 animate-float shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold">Earned by Teens</div>
                    <div className="text-base font-bold text-[#0F172A]">₹50,000+</div>
                  </div>
                </div>

                {/* Floating Card 2: Empowered */}
                <div className="absolute bottom-[20%] right-[-5%] z-20 bg-white border border-[#E2E8F0] px-5 py-3 rounded-[24px] shadow-sm animate-float-delayed">
                  <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-bold mb-1">Teens Empowered</div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-base font-bold text-[#0F172A]">10,000+</div>
                    <div className="flex -space-x-2.5 overflow-hidden ml-2">
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover" src="/avatar_ravi.png" alt="Teen" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover" src="/avatar_neha.png" alt="Teen" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover" src="/avatar_amit.png" alt="Teen" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute top-[35%] right-[5%] z-20 w-11 h-11 rounded-full bg-[#6C4DF6] flex items-center justify-center text-white shadow-lg shadow-[#6C4DF6]/30 animate-bounce">
                  <Award className="w-5 h-5" />
                </div>
                <div className="absolute bottom-[35%] left-[5%] z-20 w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white shadow-lg shadow-[#8B5CF6]/30 animate-float">
                  <Trophy className="w-4.5 h-4.5" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Popular Work Categories
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Choose work you love and get paid for it.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Category Card 1 */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects('Graphic Design')}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-[#6C4DF6]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#6C4DF6] transition-colors">
                  Graphic Design
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Design logos, posters, banners & more
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Category Card 2 */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects('Content Writing')}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <PenTool className="w-6 h-6 text-orange-550" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#6C4DF6] transition-colors">
                  Content Writing
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Write blogs, articles and social posts
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Category Card 3 */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects('Video Editing')}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Video className="w-6 h-6 text-rose-550" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#6C4DF6] transition-colors">
                  Video Editing
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Edit reels, videos and short clips
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Category Card 4 */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects('Web Development')}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Code2 className="w-6 h-6 text-blue-550" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#6C4DF6] transition-colors">
                  Web Development
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Build websites and landing pages
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Category Card 5 */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects('Social Media')}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Share2 className="w-6 h-6 text-emerald-555" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#6C4DF6] transition-colors">
                  Social Media
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Manage posts and grow pages
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            {/* Category Card 6 - More */}
            <motion.div 
              variants={cardVariants}
              onClick={() => onExploreProjects()}
              className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  <MoreHorizontal className="w-6 h-6 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2.5">
                  More Categories
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Explore more exciting jobs
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C4DF6] group-hover:gap-2 transition-all mt-6">
                Explore All <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              How It Works
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Start your journey in 4 simple steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[28%] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#E2E8F0] z-0"></div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            >
              {/* Step 1 */}
              <motion.div variants={cardVariants} className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 relative text-center flex flex-col items-center">
                <div className="relative w-16 h-16 mb-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <User className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">1</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-[#0F172A]">Create Profile</h3>
                <p className="text-[#64748B] text-xs max-w-xs leading-relaxed">
                  Sign up and build your teen profile.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={cardVariants} className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 relative text-center flex flex-col items-center">
                <div className="relative w-16 h-16 mb-6 rounded-full bg-purple-50 flex items-center justify-center text-[#6C4DF6] shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Briefcase className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6C4DF6] text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">2</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-[#0F172A]">Find Work</h3>
                <p className="text-[#64748B] text-xs max-w-xs leading-relaxed">
                  Browse projects that match your skills.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div variants={cardVariants} className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 relative text-center flex flex-col items-center">
                <div className="relative w-16 h-16 mb-6 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <FileText className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">3</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-[#0F172A]">Submit Work</h3>
                <p className="text-[#64748B] text-xs max-w-xs leading-relaxed">
                  Complete the work and submit on time.
                </p>
              </motion.div>

              {/* Step 4 */}
              <motion.div variants={cardVariants} className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#6C4DF6]/20 hover:-translate-y-1 transition-all duration-300 relative text-center flex flex-col items-center">
                <div className="relative w-16 h-16 mb-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Wallet className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-550 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">4</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-[#0F172A]">Get Paid</h3>
                <p className="text-[#64748B] text-xs max-w-xs leading-relaxed">
                  Earn money directly in your account.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
              Success Stories
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Real teens. Real stories. Real impact.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto px-4">
            
            {/* Carousel Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white p-8 sm:p-12 shadow-sm relative hover:border-[#6C4DF6]/20 transition-all duration-305"
            >
              <div className="absolute top-6 left-6 text-[#6C4DF6]/20 font-serif text-8xl leading-none select-none">“</div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#F0EDFF] shadow-md"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#0F172A] text-lg sm:text-xl italic font-medium mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-base font-extrabold text-[#0F172A]">
                      {testimonials[activeTestimonial].name}, {testimonials[activeTestimonial].age}
                    </h4>
                    <p className="text-[#64748B] text-sm font-medium">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows inside card */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <button 
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:text-[#6C4DF6] transition-all cursor-pointer bg-[#F8FAFC] hover:bg-[#F0EDFF] shadow-sm border border-[#E2E8F0] p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:text-[#6C4DF6] transition-all cursor-pointer bg-[#F8FAFC] hover:bg-[#F0EDFF] shadow-sm border border-[#E2E8F0] p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer border-none ${
                    activeTestimonial === index ? 'bg-[#6C4DF6] w-6' : 'bg-[#E2E8F0]'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
          >
            {/* Stat 1 */}
            <div className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md hover:border-[#6C4DF6]/20 transition-all duration-300 w-full">
              <div className="w-12 h-12 rounded-full bg-[#F0EDFF] flex items-center justify-center text-[#6C4DF6] shadow-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-display">50,000+</div>
                <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Teen Users</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md hover:border-[#6C4DF6]/20 transition-all duration-300 w-full">
              <div className="w-12 h-12 rounded-full bg-[#F0EDFF] flex items-center justify-center text-[#6C4DF6] shadow-sm shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-display">10,000+</div>
                <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Projects Completed</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md hover:border-[#6C4DF6]/20 transition-all duration-300 w-full">
              <div className="w-12 h-12 rounded-full bg-[#F0EDFF] flex items-center justify-center text-[#6C4DF6] shadow-sm shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-display">500+</div>
                <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Companies Hiring</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group bg-white p-8 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md hover:border-[#6C4DF6]/20 transition-all duration-300 w-full">
              <div className="w-12 h-12 rounded-full bg-[#F0EDFF] flex items-center justify-center text-[#6C4DF6] shadow-sm shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-extrabold text-[#0F172A] font-display">₹5 Crore+</div>
                <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Earned by Teens</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Purple Gradient Banner */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] rounded-[24px] p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 leading-tight text-white">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Join Funngro and start working on real projects today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                  <button 
                    onClick={onSignUp} 
                    className="bg-white text-[#6C4DF6] font-bold px-8 py-3.5 rounded-[24px] hover:bg-slate-50 transition-all duration-300 shadow-sm hover:scale-[1.02] border-none cursor-pointer"
                  >
                    Sign Up Now <ArrowRight className="w-4 h-4 inline ml-1" />
                  </button>
                  <button 
                    onClick={onLogin} 
                    className="border border-white/45 text-white font-bold px-8 py-3.5 rounded-[24px] hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Large floating Trophy Graphic on the right */}
              <div className="relative hidden lg:flex items-center justify-center w-48 h-48 shrink-0">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <Trophy className="w-24 h-24 text-amber-300 animate-bounce relative z-10" />
                <Sparkles className="w-6 h-6 text-white/40 absolute -top-2 left-6 animate-pulse" />
                <Sparkles className="w-5 h-5 text-white/50 absolute bottom-2 right-4 animate-float" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section - Light Background */}
      <footer className="bg-white text-[#64748B] py-16 border-t border-[#E2E8F0] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-8">
            {/* Column 1 — Brand */}
            <div className="col-span-2">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-block mb-4 cursor-pointer bg-transparent border-none p-0 text-left">
                <span className="font-display text-xl font-bold tracking-tight text-[#0F172A] flex items-center">
                  funn<span className="text-[#6C4DF6]">gro</span>
                </span>
              </button>

              <p className="text-[#64748B] text-sm leading-relaxed max-w-sm mb-6">
                Empowering teenagers by connecting them with meaningful work opportunities and helping businesses grow.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-[#F0EDFF] transition-all duration-300 text-[#64748B] hover:text-[#6C4DF6]"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-[#F0EDFF] transition-all duration-300 text-[#64748B] hover:text-[#6C4DF6]"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-[#F0EDFF] transition-all duration-300 text-[#64748B] hover:text-[#6C4DF6]"
                >
                  <YouTubeIcon />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-[#F0EDFF] transition-all duration-300 text-[#64748B] hover:text-[#6C4DF6]"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>

            {/* Column 2 — For Teens */}
            <div>
              <h4 className="text-[#0F172A] font-bold text-sm mb-4">For Teens</h4>
              <ul className="flex flex-col gap-3 text-sm list-none p-0 m-0">
                <li>
                  <button onClick={() => onExploreProjects()} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">
                    Find Work
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('success-stories')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">
                    Success Stories
                  </button>
                </li>
                <li>
                  <button onClick={() => alert('Blog coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">
                    Teen Blog
                  </button>
                </li>
                <li>
                  <button onClick={onSignUp} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">
                    Join Now
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 — Support */}
            <div>
              <h4 className="text-[#0F172A] font-bold text-sm mb-4">Support</h4>
              <ul className="flex flex-col gap-3 text-sm list-none p-0 m-0">
                <li><button onClick={() => alert('Help Center coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Help Center</button></li>
                <li><button onClick={() => alert('Safety Center coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Safety Center</button></li>
                <li><button onClick={() => alert('Payment Info coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Payment Info</button></li>
                <li><button onClick={() => alert('Terms & Conditions coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Terms & Conditions</button></li>
                <li><button onClick={() => alert('Privacy Policy coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Privacy Policy</button></li>
              </ul>
            </div>

            {/* Column 4 — Resources */}
            <div>
              <h4 className="text-[#0F172A] font-bold text-sm mb-4">Resources</h4>
              <ul className="flex flex-col gap-3 text-sm list-none p-0 m-0">
                <li><button onClick={() => alert('Blog coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Blog</button></li>
                <li><button onClick={() => alert('Guides coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Guides</button></li>
                <li><button onClick={() => alert('Templates coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Templates</button></li>
                <li><button onClick={() => alert('Webinars coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Webinars</button></li>
              </ul>
            </div>

            {/* Column 5 — Company */}
            <div>
              <h4 className="text-[#0F172A] font-bold text-sm mb-4">Company</h4>
              <ul className="flex flex-col gap-3 text-sm list-none p-0 m-0">
                <li><button onClick={() => alert('About Us coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">About Us</button></li>
                <li><button onClick={() => alert('Careers coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Careers</button></li>
                <li><button onClick={() => alert('Press Kit coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Press Kit</button></li>
                <li><button onClick={() => alert('Contact Us coming soon!')} className="text-[#64748B] hover:text-[#6C4DF6] transition-colors duration-200 cursor-pointer text-left bg-transparent border-none p-0">Contact Us</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>© 2024 Funngro. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#6C4DF6] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#6C4DF6] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#6C4DF6] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
