import { ClipboardList, Users, Laptop, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: ClipboardList,
    title: 'Post a Project',
    description: 'Share your requirements in detail.',
  },
  {
    icon: Users,
    title: 'Get Matched',
    description: 'We match you with the best teen for your task.',
  },
  {
    icon: Laptop,
    title: 'Work in Progress',
    description: 'Collaborate and track progress in real-time.',
  },
  {
    icon: CheckCircle2,
    title: 'Get It Done',
    description: 'Receive high-quality work on time.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            Four simple steps to get your project done by talented teens.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-0"
        >
          {/* ── Connecting line (Desktop – horizontal dashed) ── */}
          <div
            className="hidden lg:block absolute top-[44px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] border-t-2 border-dashed border-brand/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* ── Connecting line (Mobile – vertical dashed) ── */}
          <div
            className="lg:hidden absolute top-[56px] bottom-[56px] left-1/2 -translate-x-1/2 border-l-2 border-dashed border-brand/25 pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative z-10 flex flex-col items-center text-center lg:w-1/4 px-4"
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-brand-light to-brand flex items-center justify-center shadow-lg shadow-brand/15">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-brand text-brand text-xs font-bold flex items-center justify-center shadow-sm">
                    {idx + 1}
                  </span>
                </div>

                {/* Text */}
                <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
