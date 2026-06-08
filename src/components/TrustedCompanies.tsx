import { motion } from "framer-motion";

const companies = [
  { name: "Zepto", className: "font-black text-2xl tracking-tight uppercase" },
  { name: "Delhivery", className: "font-semibold text-2xl tracking-widest lowercase" },
  { name: "Meesho", className: "font-extrabold text-2xl tracking-tight capitalize" },
  { name: "CRED", className: "font-black text-2xl tracking-[0.3em] uppercase" },
  { name: "NYKAA", className: "font-bold text-2xl tracking-wide uppercase italic" },
  { name: "Unacademy", className: "font-semibold text-2xl tracking-tight capitalize" },
  { name: "Lenskart", className: "font-extrabold text-2xl tracking-wider uppercase" },
];

const LogoItem = ({ name, className }: { name: string; className: string }) => (
  <div className="flex items-center justify-center px-8 md:px-12">
    <span
      className={`font-display text-slate-400 select-none whitespace-nowrap transition-colors duration-300 hover:text-slate-600 ${className}`}
    >
      {name}
    </span>
  </div>
);

const TrustedCompanies = () => {
  return (
    <section className="relative bg-slate-50/50 py-16 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <p className="text-center text-slate-500 text-sm font-medium mb-10 md:mb-14">
          Trusted by 500+ Companies and Growing
        </p>

        {/* Marquee wrapper */}
        <div className="relative">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-r from-slate-50/90 to-transparent" />

          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-l from-slate-50/90 to-transparent" />

          {/* Scrolling track */}
          <div className="animate-marquee">
            {/* First set */}
            {companies.map((company) => (
              <LogoItem
                key={`first-${company.name}`}
                name={company.name}
                className={company.className}
              />
            ))}

            {/* Duplicate set for seamless loop */}
            {companies.map((company) => (
              <LogoItem
                key={`second-${company.name}`}
                name={company.name}
                className={company.className}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedCompanies;
