import { motion } from 'framer-motion';
import { Wallet, Lightbulb, Cpu, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Cost Effective',
    description:
      'Get premium-quality deliverables at a fraction of the cost. Teen professionals offer exceptional value without compromising on results.',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Lightbulb,
    title: 'Fresh Perspective',
    description:
      'Tap into Gen-Z creativity and trend awareness. Young minds bring innovative ideas that resonate with modern audiences.',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Cpu,
    title: 'Tech Savvy',
    description:
      'Digital natives who live and breathe technology. From AI tools to social media, they leverage the latest platforms effortlessly.',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Safe',
    description:
      'Every teen is verified and vetted through our trust & safety process. Secure payments and managed workflows ensure peace of mind.',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

export default function WhyHireTeens() {
  return (
    <section id="why-teens" className="py-24 md:py-32 bg-white">
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
            Why Hire Teens on{' '}
            <span className="text-brand">Funngro?</span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed">
            Get high-quality work done while empowering the next generation.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group bg-white rounded-2xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:border-brand/20"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6`}
              >
                <feature.icon
                  className={`w-6 h-6 ${feature.iconColor}`}
                  strokeWidth={1.8}
                />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
