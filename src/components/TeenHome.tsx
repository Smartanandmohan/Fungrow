import { useState } from 'react';
import { 
  Palette, 
  PenTool, 
  Video, 
  Code2, 
  Share2, 
  MoreHorizontal, 
  ArrowRight, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Clock, 
  Home, 
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { mockCategories } from '../data/mockData';

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

export default function TeenHome({ onLogin, onSignUp, onExploreProjects, onSwitchToCompany }: TeenHomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Graphic Design': return <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Content Writing': return <PenTool className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      case 'Video Editing': return <Video className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case 'Web Development': return <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Social Media': return <Share2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default: return <MoreHorizontal className="w-6 h-6 text-slate-600 dark:text-slate-400" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* Navbar Section */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 dark:bg-slate-900/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-display text-2xl font-bold text-slate-950 dark:text-white flex items-center">
              funn<span className="text-brand">gro</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
            {onSwitchToCompany && (
              <button onClick={onSwitchToCompany} className="hover:text-brand transition-colors cursor-pointer font-bold text-brand dark:text-brand-light">
                Hire Teens
              </button>
            )}
            <button onClick={() => onExploreProjects()} className="hover:text-brand transition-colors cursor-pointer">Find Work</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-brand transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => scrollToSection('success-stories')} className="hover:text-brand transition-colors cursor-pointer">Success Stories</button>
            <a href="#" className="hover:text-brand transition-colors">Blog</a>
            <a href="#" className="hover:text-brand transition-colors">Resources</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-sm font-semibold text-slate-700 hover:text-brand dark:text-slate-200 dark:hover:text-brand transition-colors cursor-pointer">
              Login
            </button>
            <button onClick={onSignUp} className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-dark transition-all duration-300 shadow-md shadow-brand/20 cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-b from-purple-50/50 via-white to-slate-50 dark:from-purple-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-light text-brand text-xs font-semibold mb-6 border border-brand/10 dark:bg-brand/15 dark:text-brand-light">
                <Sparkles className="w-3.5 h-3.5" />
                <span>For Teens Only</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                Work. Learn.<br />
                <span className="text-brand text-gradient bg-gradient-to-r from-brand to-indigo-600 dark:from-brand-light dark:to-indigo-400">Earn.</span> Repeat.
              </h1>
              
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Join thousands of teenagers who are earning, learning, and building their future with Funngro. Apply your talents to real-world projects and get paid securely.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button 
                  onClick={() => onExploreProjects()} 
                  className="w-full sm:w-auto bg-brand text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Find Work Now <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="w-full sm:w-auto border border-brand/35 text-brand dark:text-brand-light hover:bg-brand/5 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  How It Works
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Safe</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-brand" />
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Home className="w-4 h-4 text-blue-500" />
                  <span>Earn from Home</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>Skill Development</span>
                </div>
              </div>
            </div>
            
            {/* Right Illustration */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md md:max-w-lg aspect-square">
                
                {/* Decorative background circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand/20 to-indigo-500/10 blur-xl"></div>
                
                {/* Generated Teen Image */}
                <img 
                  src="/teen_hero_laptop.png" 
                  alt="Teen working on laptop" 
                  className="w-full h-full object-contain relative z-10 animate-float"
                />

                {/* Floating Card 1: Earnings */}
                <div className="absolute top-[15%] left-[-5%] z-20 glass-card dark:glass-card-dark px-4 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Earned by Teens</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">₹50,000+</div>
                  </div>
                </div>

                {/* Floating Card 2: Empowered */}
                <div className="absolute bottom-[20%] right-[-5%] z-20 glass-card dark:glass-card-dark px-4 py-3 rounded-2xl shadow-xl animate-float-delayed">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mb-1">Teens Empowered</div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-base font-bold text-slate-900 dark:text-white">10,000+</div>
                    <div className="flex -space-x-2.5 overflow-hidden ml-2">
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="/avatar_ravi.png" alt="Teen" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="/avatar_neha.png" alt="Teen" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="/avatar_amit.png" alt="Teen" />
                    </div>
                  </div>
                </div>

                {/* Floating Badge: Trophy */}
                <div className="absolute top-[40%] right-[5%] z-20 w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-400/30 animate-bounce">
                  <Award className="w-5.5 h-5.5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-extrabold text-slate-950 dark:text-white mb-3">
              Popular Work Categories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Choose work you love and get paid for it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <div 
                key={category.name} 
                onClick={() => onExploreProjects(category.name)}
                className="group relative cursor-pointer p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 hover:bg-white dark:bg-slate-950/20 dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${category.color} rounded-bl-full opacity-30 group-hover:scale-110 transition-transform duration-300`}></div>
                
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md shadow-slate-100/50 dark:shadow-none mb-4 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(category.name)}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
                  {category.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                  {category.desc}
                </p>
                
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:gap-2 transition-all">
                  Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
            
            {/* More Categories Mock Card */}
            <div 
              onClick={() => onExploreProjects()}
              className="group cursor-pointer p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 hover:bg-white dark:bg-slate-950/20 dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md mb-4 dark:shadow-none">
                  <MoreHorizontal className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  More Categories
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Explore more exciting jobs like Translation, Testing, and Surveys.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:gap-2 transition-all">
                Explore All <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-extrabold text-slate-950 dark:text-white mb-3">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Start your journey in 4 simple steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[28%] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <UserPlus className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-slate-50 dark:border-slate-950">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Create Profile</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  Sign up and build your professional teen profile with your skills.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-brand-light dark:bg-brand/15 flex items-center justify-center text-brand shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Search className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center border-2 border-slate-50 dark:border-slate-950">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Find Work</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  Browse custom projects that match your interests and talents.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center border-2 border-slate-50 dark:border-slate-950">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Submit Work</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  Complete the project, submit the deliverables, and chat with employers.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center border-2 border-slate-50 dark:border-slate-950">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Get Paid</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  Receive earnings directly and securely in your verified account.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-extrabold text-slate-950 dark:text-white mb-3">
              Success Stories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Real teens. Real stories. Real impact.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-4">
            
            {/* Carousel Content */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-8 sm:p-12 shadow-xl shadow-brand/5 relative">
              <div className="absolute top-6 left-6 text-brand/20 dark:text-brand/10 font-serif text-8xl leading-none">“</div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-brand-light dark:border-brand/20 shadow-lg"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-lg sm:text-xl italic font-medium mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      {testimonials[activeTestimonial].name}, {testimonials[activeTestimonial].age}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows inside card */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <button 
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-brand hover:border-brand dark:text-slate-350 dark:hover:text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-brand hover:border-brand dark:text-slate-350 dark:hover:text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === index ? 'bg-brand w-6' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-brand-light dark:bg-slate-950 transition-colors border-t border-b border-brand/5 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mb-2">50,000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Teen Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mb-2">10,000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Companies Hiring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mb-2">₹5 Crore+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Earned by Teens</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box Section */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl shadow-brand/20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-white/80 text-sm sm:text-base">
                  Join Funngro today and start working on real projects that fit your skills and schedule. Build your professional portfolio while you earn!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
                <button 
                  onClick={onSignUp} 
                  className="bg-white text-brand font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Sign Up Now <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={onLogin} 
                  className="border border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <div className="font-display text-2xl font-bold text-white mb-4">
                funn<span className="text-brand">gro</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 max-w-sm">
                Empowering teenagers by connecting them with meaningful work opportunities and helping businesses grow.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.3 1.83c-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.5 20.33 8.89c0-.18 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.517 0-9.388.503a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.503 9.388.503 9.388.503s7.518 0 9.388-.503a3.003 3.003 0 0 0 2.11-2.11c.502-1.87 0-5.837 0-5.837s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">For Teens</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => onExploreProjects()} className="hover:text-white transition-colors text-left cursor-pointer">Find Work</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors text-left cursor-pointer">How It Works</button></li>
                <li><button onClick={() => scrollToSection('success-stories')} className="hover:text-white transition-colors text-left cursor-pointer">Success Stories</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Teen Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Join Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 Funngro. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
