import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onLogin: () => void;
  onHireTeens: () => void;
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
}

export default function Navbar({ onLogin, onHireTeens, scrollToSection, scrollToTop }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Teens', id: 'why-teens' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Success Stories', id: 'success-stories' },
    { name: 'Pricing', id: 'pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo — scrolls to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-[#0f0c1e] flex items-center">
            funn<span className="text-brand">gro</span>
          </span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-slate-600 hover:text-brand font-medium text-sm transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          
          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowResources(!showResources)}
              onMouseEnter={() => setShowResources(true)}
              className="text-slate-600 hover:text-brand font-medium text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`} />
            </button>
            
            {showResources && (
              <div 
                className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg p-2 flex flex-col gap-1 z-50"
                onMouseLeave={() => setShowResources(false)}
              >
                <button onClick={() => { setShowResources(false); handleNavClick('success-stories'); }} className="text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-brand rounded-lg text-sm transition-colors cursor-pointer">Case Studies</button>
                <button onClick={() => { setShowResources(false); alert('Blog coming soon!'); }} className="text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-brand rounded-lg text-sm transition-colors cursor-pointer">Blog</button>
                <button onClick={() => { setShowResources(false); alert('Help Center coming soon!'); }} className="text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-brand rounded-lg text-sm transition-colors cursor-pointer">Help Center</button>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onLogin}
            className="px-5 py-2 text-slate-700 hover:text-brand font-semibold text-sm transition-colors cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={onHireTeens}
            className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-md shadow-brand/10 hover:shadow-brand/20 hover:scale-[1.02] cursor-pointer"
          >
            Hire Teens
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-800 hover:text-brand p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-inner"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-slate-700 hover:text-brand font-medium text-base py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="border-t border-slate-100 my-2 pt-4 flex flex-col gap-4">
                <button
                  onClick={() => { setIsOpen(false); onLogin(); }}
                  className="w-full text-center px-4 py-2.5 text-slate-700 hover:text-brand font-semibold text-sm transition-colors border border-slate-200 rounded-full cursor-pointer"
                >
                  Log In
                </button>
                <button 
                  onClick={() => { setIsOpen(false); onHireTeens(); }}
                  className="w-full text-center px-4 py-2.5 bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition-all rounded-full shadow-md cursor-pointer"
                >
                  Hire Teens
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
