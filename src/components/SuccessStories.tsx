import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Ravi Sharma',
    role: 'Marketing Head',
    company: 'Zepto',
    avatar: '/avatar_ravi.png',
    review:
      'Funngro helped us create amazing content for our brand at a very affordable price. Highly recommended!',
  },
  {
    name: 'Neha Verma',
    role: 'Founder',
    company: 'The Bloom Store',
    avatar: '/avatar_neha.png',
    review:
      'The teens are talented, dedicated and easy to work with. Great platform!',
  },
  {
    name: 'Amit Patel',
    role: 'CTO',
    company: 'TechNova',
    avatar: '/avatar_amit.png',
    review:
      'We got our website designed by a teen and the result was beyond our expectations.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 260 : -260,
    opacity: 0,
  }),
};

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 text-amber-400 fill-amber-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  avatar: string;
  review: string;
}

function TestimonialCard({ name, role, company, avatar, review }: TestimonialCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:border-brand/20">
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-brand mb-5 fill-brand-light" strokeWidth={1.5} />

      {/* Review */}
      <p className="italic text-slate-600 leading-relaxed flex-1 mb-6">
        &ldquo;{review}&rdquo;
      </p>

      {/* Star Rating */}
      <StarRating />

      {/* Divider */}
      <div className="border-t border-slate-100 my-5" />

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-light"
        />
        <div>
          <p className="font-semibold text-slate-900 leading-snug">{name}</p>
          <p className="text-sm text-slate-500">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const [[mobileIndex, direction], setMobileIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setMobileIndex(([prev]) => {
      const next = prev + newDirection;
      if (next < 0 || next >= testimonials.length) return [prev, 0];
      return [next, newDirection];
    });
  };

  return (
    <section id="success-stories" className="py-24 md:py-32 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Success <span className="text-brand">Stories</span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed">
            See how businesses are growing with teen talent.
          </p>
        </motion.div>

        {/* Desktop Grid (md+) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden md:grid grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={cardVariants}>
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel (< md) */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={mobileIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              >
                <TestimonialCard {...testimonials[mobileIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              disabled={mobileIndex === 0}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-brand hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                    i === mobileIndex
                      ? 'bg-brand w-5'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              disabled={mobileIndex === testimonials.length - 1}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-brand hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
