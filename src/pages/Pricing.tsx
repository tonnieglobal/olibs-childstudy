import { Check, Info, ShieldCheck, Zap, Headphones, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "../components/ui/Logo";

const PLANS = [
  {
    name: "Pay-As-You-Go",
    price: "Custom",
    desc: "Perfect for occasional help or specific test prep.",
    features: [
      "Pay only for hours booked",
      "No monthly commitment",
      "Access to all tutors",
      "Digital learning materials",
      "Standard support"
    ],
    cta: "Start Booking",
    featured: false,
    color: "bg-white",
    icon: <Zap className="text-primary" />
  },
  {
    name: "Intensive",
    price: "₦50,000",
    period: "/ per month",
    desc: "For determined students seeking serious growth.",
    features: [
      "Up to 12 hours of tutoring",
      "Customized roadmap",
      "Weekly performance reports",
      "Priority tutor selection",
      "24/7 Question support",
      "Mock Exam access"
    ],
    cta: "Join Intensive",
    featured: true,
    color: "bg-ink",
    icon: <Zap className="text-secondary" />
  },
  {
    name: "Family Bundle",
    price: "₦120,000",
    period: "/ per month",
    desc: "Education for the whole household, simplified.",
    features: [
      "Up to 30 hours total",
      "Shared across 3 children",
      "Dedicated account manager",
      "Flexible schedule swapping",
      "Monthly parent consultation",
      "Lifetime resources access"
    ],
    cta: "Contact Sales",
    featured: false,
    color: "bg-white",
    icon: <ShieldCheck className="text-amber-500" />
  }
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full mb-6 font-bold text-xs uppercase tracking-widest"
          >
            Transparent Pricing Structure
          </motion.div>
          <h1 className="text-6xl font-black text-ink mb-6 tracking-tighter">Invest in their <span className="text-primary italic text-[0.9em]">infinite potential.</span></h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">
            Quality education shouldn't be a luxury. Choose a plan that fits your family's needs and budget.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {PLANS.map((plan, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={plan.name}
              className={`p-10 rounded-[3.5rem] border ${plan.featured ? 'bg-ink text-white border-ink scale-105 shadow-2xl shadow-ink/20' : 'bg-white text-ink border-gray-100 shadow-sm'} relative overflow-hidden`}
            >
              {plan.featured && (
                <div className="absolute top-10 right-[-35px] bg-secondary text-white py-1 px-12 rotate-45 text-[10px] font-black uppercase tracking-widest">
                  Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.featured ? 'bg-white/10' : 'bg-gray-50'}`}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <p className={`text-sm mb-8 italic ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.desc}
              </p>

              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className={`text-xs font-bold uppercase tracking-widest ${plan.featured ? 'text-gray-500' : 'text-gray-400'}`}>{plan.period}</span>}
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.featured ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className={`text-sm font-medium ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                plan.featured ? 'bg-secondary text-white hover:scale-105 shadow-xl shadow-secondary/20' : 'bg-ink text-white hover:bg-primary shadow-lg shadow-black/10'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ/Info Grid */}
        <div className="grid md:grid-cols-2 gap-12 bg-white p-16 rounded-[4rem] border border-gray-100 shadow-xl">
           <div className="flex gap-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <Headphones size={32} />
              </div>
              <div>
                <h4 className="text-xl font-black mb-3">24/7 Dedicated Support</h4>
                <p className="text-gray-500 italic text-sm leading-relaxed">Questions about payments or scheduling? Our Lagos and Accra based teams are always available to help you navigate the platform.</p>
              </div>
           </div>

           <div className="flex gap-6">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <Calendar size={32} />
              </div>
              <div>
                <h4 className="text-xl font-black mb-3">Roll-over Lessons</h4>
                <p className="text-gray-500 italic text-sm leading-relaxed">Unlike other platforms, unused hours in your monthly bundle roll over to the next month. We believe in value for money, guaranteed.</p>
              </div>
           </div>
        </div>

        <div className="mt-20 text-center">
            <p className="text-gray-400 italic flex items-center justify-center gap-2">
              <Info size={16} /> Need a custom plan for a school or organization? <button className="text-primary font-bold hover:underline">Speak with Bulk Sales</button>
            </p>
        </div>
      </div>
    </div>
  );
}
