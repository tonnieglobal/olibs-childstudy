import { useState, useMemo } from "react";
import { Search, Filter, Star, MapPin, BookOpen, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../components/ui/Logo";

const SUBJECTS = ["All", "Mathematics", "English", "Physics", "Chemistry", "Biology", "Coding", "Music"];
const LEVELS = ["All", "Primary", "Secondary", "IGCSE/SAT", "Undergraduate"];

const TUTORS = [
  {
    id: 1,
    name: "Dr. Sarah Adebayo",
    subject: "Mathematics",
    level: "IGCSE/SAT",
    rating: 4.9,
    reviews: 124,
    price: 5000,
    image: "https://i.pravatar.cc/150?u=sarah",
    bio: "Ex-university lecturer with 10+ years experience in helping students crush difficult Math concepts.",
    tags: ["Patient", "Result-Oriented"]
  },
  {
    id: 2,
    name: "John Smith",
    subject: "Physics",
    level: "Secondary",
    rating: 4.8,
    reviews: 89,
    price: 4500,
    image: "https://i.pravatar.cc/150?u=john",
    bio: "Passionate about making Physics fun and relatable using real-world experiments and clear logic.",
    tags: ["Fun", "Interactive"]
  },
  {
    id: 3,
    name: "Blessing Okoro",
    subject: "English",
    level: "Primary",
    rating: 5.0,
    reviews: 56,
    price: 3500,
    image: "https://i.pravatar.cc/150?u=blessing",
    bio: "Specialist in diction and creative writing for young learners. Making every word count.",
    tags: ["Creative", "Child-Friendly"]
  },
  {
    id: 4,
    name: "David Chen",
    subject: "Coding",
    level: "Undergraduate",
    rating: 4.7,
    reviews: 42,
    price: 8000,
    image: "https://i.pravatar.cc/150?u=david",
    bio: "Full-stack developer teaching Python, JS and Data Structures. Let's build something cool.",
    tags: ["Technical", "Fast-Paced"]
  }
];

export function FindTutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const filteredTutors = useMemo(() => {
    return TUTORS.filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tutor.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = subjectFilter === "All" || tutor.subject === subjectFilter;
      const matchesLevel = levelFilter === "All" || tutor.level === levelFilter;
      return matchesSearch && matchesSubject && matchesLevel;
    });
  }, [searchQuery, subjectFilter, levelFilter]);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-bold text-xs uppercase tracking-widest"
          >
            <Logo size="sm" showText={false} /> Browse High-Quality Educators
          </motion.div>
          <h1 className="text-5xl font-black text-ink mb-4 tracking-tighter">Find Your Perfect Tutor</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">
            Connecting you with verified, vetted, and passionate teachers across Africa.
          </p>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl mb-12">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search by name, subject, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-medium tracking-tight"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Subject</label>
              <select 
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-primary"
              >
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Academic Level</label>
              <select 
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-primary"
              >
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTutors.map((tutor) => (
              <motion.div
                layout
                key={tutor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img src={tutor.image} alt={tutor.name} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-gray-50 group-hover:ring-primary/20 transition-all" />
                    <div className="absolute -bottom-2 -right-2 bg-secondary text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs">
                      {tutor.rating}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Starting at</span>
                    <span className="text-2xl font-black text-primary">₦{tutor.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">/ per hour</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-ink mb-1">{tutor.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-wider rounded-lg border border-primary/10">
                      {tutor.subject}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <BookOpen size={12} /> {tutor.level}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm italic mb-6 line-clamp-2">
                  "{tutor.bio}"
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tutor.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 bg-ink text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn">
                  View Full Profile <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTutors.length === 0 && (
          <div className="p-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-ink mb-2">No tutors found</h3>
            <p className="text-gray-400 max-w-sm mx-auto italic">We couldn't find any tutors matching your current filters. Try relaxing your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
