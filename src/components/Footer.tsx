import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

/* Inline SVG social icons since lucide-react no longer ships brand icons */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socialIcons = [
  { Icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: YouTubeIcon, label: 'YouTube', href: '#' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

// Map footer link labels to section IDs or actions
const linkSectionMap: Record<string, string> = {
  'Why Teens': 'why-teens',
  'How It Works': 'how-it-works',
  'Pricing': 'pricing',
  'Resources': 'success-stories',
  'Contact Us': 'cta',
};

interface FooterProps {
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
}

function FooterLinkColumn({
  heading,
  links,
  scrollToSection,
}: {
  heading: string;
  links: string[];
  scrollToSection: (id: string) => void;
}) {
  return (
    <motion.div variants={itemVariants}>
      <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => {
          const sectionId = linkSectionMap[link];
          return (
            <li key={link}>
              {sectionId ? (
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                >
                  {link}
                </button>
              ) : (
                <button
                  onClick={() => alert(`${link} — Coming soon!`)}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                >
                  {link}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function Footer({ scrollToSection, scrollToTop }: FooterProps) {
  const forCompaniesLinks = ['Why Teens', 'How It Works', 'Pricing', 'Resources', 'Contact Us'];
  const supportLinks = ['Help Center', 'Safety Center', 'Payment Policy', 'Terms & Conditions', 'Privacy Policy'];
  const companyLinks = ['About Us', 'Careers', 'Blog', 'Press Kit'];

  return (
    <footer className="bg-[#0f0c1e] text-white">
      <motion.div
        className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <motion.div className="sm:col-span-2 lg:col-span-1" variants={itemVariants}>
            <button onClick={scrollToTop} className="inline-block mb-4 cursor-pointer">
              <span className="font-display text-xl font-bold tracking-tight flex items-center">
                funn<span className="text-brand">gro</span>
              </span>
            </button>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Empowering businesses by connecting them with talented teenagers and helping them get work done.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-brand/20 transition-all duration-300"
                >
                  <span className="text-slate-400 group-hover:text-brand group-hover:scale-110 transition-all duration-300">
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — For Companies */}
          <FooterLinkColumn heading="For Companies" links={forCompaniesLinks} scrollToSection={scrollToSection} />

          {/* Column 3 — Support */}
          <FooterLinkColumn heading="Support" links={supportLinks} scrollToSection={scrollToSection} />

          {/* Column 4 — Company */}
          <FooterLinkColumn heading="Company" links={companyLinks} scrollToSection={scrollToSection} />

          {/* Column 5 — Contact Us */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:hello@funngro.com"
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 shrink-0 text-brand/70" />
                  hello@funngro.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0 text-brand/70" />
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 shrink-0 text-brand/70" />
                Bangalore, India
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-14 pt-6 border-t border-slate-800"
          variants={itemVariants}
        >
          <p className="text-center text-slate-500 text-sm">
            © 2024 Funngro. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
