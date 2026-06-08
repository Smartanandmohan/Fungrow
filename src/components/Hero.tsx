import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, Shield } from 'lucide-react';

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const floatingCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const trustBadges = [
  'Verified Teens',
  'Safe & Secure',
  'Quality Work',
  'On-Time Delivery',
];

interface HeroProps {
  onHireTeens: () => void;
  onBookDemo: () => void;
}

const Hero = ({ onHireTeens, onBookDemo }: HeroProps) => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #f8f6ff 0%, #ffffff 100%)',
        }}
      />

      {/* Decorative blurred circles */}
      <div className="absolute -z-5 top-20 -left-32 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute -z-5 bottom-10 right-0 w-[500px] h-[500px] bg-brand/8 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute -z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Pill badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-light text-brand text-sm font-medium border border-brand/10">
                ⚡ For Companies
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.1] tracking-tight mt-6"
            >
              Hire Skilled Teens.
              <br />
              <span
                className="text-gradient bg-gradient-to-r from-brand via-brand-dark to-brand"
              >
                Get Work Done.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Funngro connects you with verified, talented teenagers who deliver
              quality work, on time and at affordable prices.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-3"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-brand" strokeWidth={2.5} />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onHireTeens}
                className="group inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 text-base cursor-pointer"
              >
                Hire Teens Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-3.5 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-0.5 text-base cursor-pointer"
              >
                Book a Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right side – hero image + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Hero image */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src="/hero_working_together.png"
                alt="Teens working together"
                className="w-full h-auto rounded-2xl shadow-xl shadow-brand/10 object-cover"
              />

              {/* Floating card 1 – Projects Completed */}
              <motion.div
                variants={floatingCardVariants}
                initial="hidden"
                animate="visible"
                className="glass-card animate-float absolute -left-6 sm:-left-8 bottom-12 sm:bottom-16 rounded-2xl px-5 py-4 flex items-center gap-3 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xl font-bold font-display text-gray-900">
                    10,000+
                  </p>
                  <p className="text-xs text-gray-500">Projects Completed</p>
                </div>
              </motion.div>

              {/* Floating card 2 – Client Rating */}
              <motion.div
                variants={floatingCardVariants}
                initial="hidden"
                animate="visible"
                className="glass-card animate-float-delayed absolute -top-4 -right-4 sm:-top-5 sm:-right-6 rounded-2xl px-5 py-4 flex items-center gap-3 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="text-xl font-bold font-display text-gray-900">
                    4.8/5
                  </p>
                  <p className="text-xs text-gray-500">Client Rating</p>
                </div>
              </motion.div>

              {/* Floating card 3 – Secure Platform */}
              <motion.div
                variants={floatingCardVariants}
                initial="hidden"
                animate="visible"
                className="glass-card animate-float absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-6 rounded-2xl px-5 py-3.5 flex items-center gap-3 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Secure Platform
                  </p>
                  <p className="text-xs text-gray-500">Verified & Trusted</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
