import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/project',
    description: 'For small businesses getting started',
    features: [
      '1 Project at a time',
      'Basic teen matching',
      'Email support',
      '3-day delivery',
      '1 revision',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹7,999',
    period: '/month',
    description: 'For growing companies',
    features: [
      '5 Projects at a time',
      'Priority matching',
      'Dedicated manager',
      '48-hr delivery',
      'Unlimited revisions',
      'Dashboard access',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Unlimited projects',
      'Dedicated team',
      '24/7 support',
      'Same-day delivery',
      'API access',
      'Custom contracts',
      'Onboarding support',
    ],
    cta: 'Contact Sales',
    popular: false,
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

function handleClick() {
  window.alert('Coming soon! Contact us at hello@funngro.com');
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.03] blur-3xl" />
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
            Simple, Transparent
            <br />
            <span className="text-brand">Pricing</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            No hidden fees. Pay only for the work you need.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative flex flex-col bg-white rounded-2xl border p-8 transition-shadow duration-300 ${
                plan.popular
                  ? 'border-brand ring-2 ring-brand/20 shadow-xl shadow-brand/10'
                  : 'border-slate-100 shadow-sm hover:shadow-lg'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-semibold text-lg text-slate-900">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 mb-1">
                <span className="font-display text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-slate-500 text-base ml-1">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm mb-8">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleClick}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  plan.popular
                    ? 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/25 hover:shadow-brand/40'
                    : 'border-2 border-slate-200 text-slate-700 hover:border-brand hover:text-brand'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
