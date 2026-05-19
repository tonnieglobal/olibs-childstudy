import { motion } from "motion/react";
import { Search, Heart, ShieldCheck, Zap, BookOpen, MessageSquare, Video, Star } from "lucide-react";
import { Logo } from "../components/ui/Logo";

const STEPS = [
  {
    icon: <Search className="text-primary" size={32} />,
    title: "1. Search Your Need",
    desc: "Browse our curated list of verified tutors based on subject, level, and location. Read reviews and view introductory videos.",
    color: "bg-primary/5"
  },
  {
    icon: <ShieldCheck className="text-secondary" size={32} />,
    title: "2. Verify & Match",
    desc: "Request a taster session to see if the tutor is a good fit. All our tutors are background-checked and academically verified.",
    color: "bg-secondary/5"
  },
  {
    icon: <Zap className="text-amber-500" size={32} />,
    title: "3. Start Learning",
    desc: "Schedule lessons, pay securely through the platform, and track your child's progress with detailed weekly reports.",
    color: "bg-amber-50"
  }
];

const FEATURES = [
  { icon: <Video />, title: "Live Video Lessons", text: "Interactive one-on-one sessions with shared whiteboard tools." },
  { icon: <MessageSquare />, title: "Instant Messaging", text: "Direct line to your tutor for quick questions outside lesson time." },
  { icon: <BookOpen />, title: "Resource Library", text: "Access thousands of curated learning materials and past questions." },
  { icon: <ShieldCheck />, title: "Secure Payments", text: "Funds are held in escrow until lessons are confirmed complete." },
];

export function HowItWorks() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-8 font-bold text-xs uppercase tracking-widest"
          >
            <Logo size="sm" showText={false} /> Simplified Learning Experience
          </motion.div>
          <h1 className="text-6xl font-black text-ink mb-8 tracking-tighter leading-tight max-w-4xl mx-auto">
            Education tailored to your child's <span className="text-primary">unique heartbeat.</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto italic leading-relaxed">
            We've removed the stress of finding quality education. Here's how Olibs ChildStudy ensures your child's excellence in three simple steps.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 mb-40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                key={i}
                className={`${step.color} p-12 rounded-[3.5rem] border border-gray-100 relative group hover:-translate-y-4 transition-all duration-500`}
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-ink mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed italic">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Olibs Section */}
      <section className="px-6 py-32 bg-ink text-white overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full mb-8 font-bold text-[10px] uppercase tracking-[0.2em] border border-white/10 backdrop-blur-sm">
                Built for Excellence
              </div>
              <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight">
                Built to outperform the <span className="text-secondary italic">traditional classroom.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 italic leading-relaxed">
                Platform features designed by educators, for parents who refuse to settle for average education.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{f.title}</h4>
                      <p className="text-xs text-gray-500 italic">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-800 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students learning" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem]">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-secondary text-secondary" />)}
                    </div>
                    <p className="text-sm italic font-medium">"Olibs completely changed how my son approaches Mathematics. From 40% to 92% in 3 months!"</p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-xs">MA</div>
                      <div>
                        <p className="text-xs font-bold">Mrs. Adekunle</p>
                        <p className="text-[10px] text-gray-500">Lagos, Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="px-6 py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-ink mb-8 tracking-tighter">Ready to start your child's journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-ink text-white rounded-[2rem] font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-ink/20">
              Find a Tutor Now
            </button>
            <button className="px-10 py-5 bg-white border border-gray-100 text-ink rounded-[2rem] font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
              Register as a Tutor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
