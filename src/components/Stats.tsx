import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Users, Briefcase, Building2, IndianRupee } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface Stat {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Users, value: 50000, suffix: '+', label: 'Teen Users' },
  { icon: Briefcase, value: 10000, suffix: '+', label: 'Projects Completed' },
  { icon: Building2, value: 500, suffix: '+', label: 'Companies' },
  {
    icon: IndianRupee,
    value: 5,
    prefix: '₹',
    suffix: ' Crore+',
    label: 'Earnings',
  },
];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                  */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { mass: 0.8, stiffness: 60, damping: 18 });

  // Format number with commas
  const display = useTransform(spring, (v: number) => {
    const rounded = Math.round(v);
    return `${prefix}${rounded.toLocaleString('en-IN')}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, motionVal, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-slate-50/70"
    >
      {/* Subtle top/bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-0"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`relative flex flex-col items-center text-center px-4 md:px-8 ${
                idx < stats.length - 1
                  ? 'lg:border-r lg:border-slate-200/80'
                  : ''
              }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mb-5">
                <stat.icon
                  className="w-5 h-5 text-brand"
                  strokeWidth={1.8}
                />
              </div>

              {/* Number */}
              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-1">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </h3>

              {/* Label */}
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
