import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

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

interface CTAProps {
  onHireTeens: () => void;
  onBookDemo: () => void;
}

const CTA = ({ onHireTeens, onBookDemo }: CTAProps) => {
  return (
    <section id="cta" className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Inner card with gradient background */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #6C4DF6 0%, #5237CE 50%, #3D1FA8 100%)',
          }}
        >
          {/* === Decorative Background Elements === */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-sm pointer-events-none" />
          <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-white/5 blur-sm pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.03] pointer-events-none" />

          {/* Small floating dots */}
          <div className="absolute top-12 right-20 w-3 h-3 rounded-full bg-white/20 animate-float pointer-events-none" />
          <div className="absolute top-24 left-16 w-2 h-2 rounded-full bg-white/15 animate-float-delayed pointer-events-none" />
          <div className="absolute bottom-16 left-1/3 w-2.5 h-2.5 rounded-full bg-white/20 animate-float pointer-events-none" />
          <div className="absolute bottom-28 right-1/4 w-2 h-2 rounded-full bg-white/10 animate-float-delayed pointer-events-none" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/25 animate-float pointer-events-none" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Radial glow behind content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.06] rounded-full blur-3xl pointer-events-none" />

          {/* === Content === */}
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center">
            {/* Decorative icon */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Rocket className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={1.8} />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-white max-w-2xl mx-auto"
            >
              Ready to Hire Top Teen Talent?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-xl mx-auto leading-relaxed"
            >
              Post your project today and get it done with quality, creativity and reliability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary button */}
              <button
                onClick={onHireTeens}
                className="group inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5 hover:scale-[1.03] text-base cursor-pointer"
              >
                Hire Teens Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary button */}
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-8 py-3.5 rounded-full border border-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 text-base cursor-pointer"
              >
                Book a Demo
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
