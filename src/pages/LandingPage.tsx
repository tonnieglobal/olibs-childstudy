import { motion } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Users, MessageSquare, Play, CheckCircle2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  const testimonials = [
    {
      name: "Mrs. Adebayo",
      role: "Parent",
      content: "Olibs ChildStudy has helped my daughter improve so much in Maths and English. The tutors are patient and highly professional.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=adebayo"
    },
    {
      name: "Tunde Williams",
      role: "Tutor",
      content: "As a private tutor, this platform has given me the tools to manage my classes effectively and reach more students across Africa.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=tunde"
    }
  ];

  return (
    <div className="bg-surface overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full font-bold text-sm mb-8 w-fit mx-auto lg:mx-0 border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Trusted by 5,000+ African Families
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-ink mb-8 leading-[1.05]">
              Unlock Your Child’s <br />
              <span className="text-primary italic">True Potential</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Connecting parents with verified, high-quality tutors for a safe, transparent, and personalized learning experience tailored for African excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/signup?role=parent"
                className="flex-1 lg:flex-none px-10 py-5 bg-primary text-white text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                <span>Start Trial Lesson</span>
                <ArrowRight size={24} />
              </Link>
              <Link
                to="/signup?role=tutor"
                className="flex-1 lg:flex-none px-10 py-5 bg-white border-2 border-gray-100 text-gray-700 text-xl font-bold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                Browse Tutors
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className={`w-12 h-12 rounded-full border-4 border-surface ${['bg-blue-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100'][i-1]}`}></div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-bold text-ink block text-base">4.9/5 Average Rating</span>
                from parents across Africa
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 w-full max-w-[500px] aspect-[4/5] bg-white rounded-[3rem] shadow-2xl border border-primary/5 p-6 mx-auto">
               <div className="w-full h-full bg-[#FFEEDD] rounded-[2rem] overflow-hidden relative border border-primary/10">
                  <img 
                    src="https://picsum.photos/seed/olibs_girl/800/1000" 
                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" 
                    alt="Happy Child" 
                  />
                  
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-primary/10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Class Quality</p>
                      <p className="text-sm font-bold text-ink">Verified Success</p>
                    </div>
                  </div>
               </div>

               {/* Floating Stats Card */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4"
               >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-ink tracking-tight">1,200+</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Elite Tutors</p>
                  </div>
               </motion.div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Partners Bar */}
      <section className="h-32 bg-white border-y border-gray-100 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
          <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] shrink-0">Partner Integrations:</div>
          <div className="flex gap-16 opacity-30 grayscale filter contrast-125 overflow-hidden whitespace-nowrap">
             <span className="text-3xl font-black tracking-tighter">PAYSTACK</span>
             <span className="text-3xl font-black tracking-tighter">FLUTTERWAVE</span>
             <span className="text-3xl font-black tracking-tighter">STRIPE</span>
             <span className="text-3xl font-black tracking-tighter invisible md:visible">VISA</span>
             <span className="text-3xl font-black tracking-tighter invisible lg:visible">MASTERCARD</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Why Choose Olibs ChildStudy?</h2>
            <p className="text-gray-500 text-lg">Safe, transparent, and technology-driven learning platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Verified Tutors", desc: "Every tutor undergoes rigorous background checks and subject assessments.", icon: ShieldCheck, color: "bg-blue-50 text-blue-600" },
              { title: "Personalized Learning", desc: "Curriculums tailored to your child's pace, style, and academic goals.", icon: Star, color: "bg-yellow-50 text-yellow-600" },
              { title: "Progress Monitoring", desc: "Real-time updates, reports, and class recordings for quality assurance.", icon: CheckCircle2, color: "bg-green-50 text-green-600" },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all"
              >
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ink rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl text-white font-black mb-12 tracking-tight">Voices of <br /><span className="text-primary italic">Excellence</span></h2>
                <div className="space-y-8">
                  {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 group hover:bg-white/10 transition-colors">
                      <p className="text-white/90 text-lg italic mb-8 leading-relaxed">"{t.content}"</p>
                      <div className="flex items-center gap-4">
                        <img src={t.avatar} className="w-14 h-14 rounded-2xl border-2 border-primary/20" alt={t.name} />
                        <div>
                          <p className="text-white font-bold text-lg">{t.name}</p>
                          <p className="text-primary font-bold text-xs uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block text-center">
                <div className="inline-block p-12 rounded-[3.5rem] bg-primary shadow-2xl shadow-primary/20 transform rotate-3">
                  <div className="text-9xl font-black text-white mb-2">4.9</div>
                  <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={32} className="fill-white text-white" />)}
                  </div>
                  <p className="text-xl font-bold text-white uppercase tracking-widest">Tutor Average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Floating Button */}
      <a
        href="https://wa.me/234800000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageSquare size={32} />
      </a>
    </div>
  );
}
