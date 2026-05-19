import { motion } from "motion/react";
import { 
  Users, BookOpen, Calendar, CreditCard, 
  Search, Filter, Star, Clock, 
  BarChart3, Settings, Bell, LogOut,
  ChevronRight, PlayCircle
} from "lucide-react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import { Logo } from "../components/ui/Logo";

export function ParentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useFirebase();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const stats = [
    { label: "Active Tutors", value: "3", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Booked Lessons", value: "12", icon: Calendar, color: "text-purple-600 bg-purple-50" },
    { label: "Learning Hours", value: "48h", icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    { label: "Overall Progress", value: "87%", icon: BarChart3, color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <Logo size="sm" />
          </Link>

          <nav className="space-y-1">
            {[
              { label: "Overview", icon: BarChart3, path: "/parent" },
              { label: "Find Tutors", icon: Search, path: "/parent/find" },
              { label: "My Lessons", icon: BookOpen, path: "/parent/lessons" },
              { label: "Billing", icon: CreditCard, path: "/parent/billing" },
              { label: "Reports", icon: BarChart3, path: "/parent/reports" },
              { label: "Settings", icon: Settings, path: "/parent/settings" },
            ].map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    active 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 font-bold hover:gap-4 transition-all w-full"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-ink">Welcome, Mrs. Adebayo! 👋</h1>
              <p className="text-gray-500">Here's how Tolu is progressing this week.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white border border-gray-100 rounded-2xl relative text-gray-500 hover:text-primary transition-colors">
                <Bell size={24} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-12 h-12 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary/10 transition-all">
                <img src="https://i.pravatar.cc/100?u=adebayo" alt="Profile" />
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={
              <div className="space-y-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100"
                    >
                      <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                        <stat.icon size={24} />
                      </div>
                      <p className="text-gray-500 font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-ink mt-1">{stat.value}</h3>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Active Lessons */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold">Upcoming Lessons</h2>
                      <button className="text-primary font-bold hover:underline">View Calendar</button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: "Algebra Basics", tutor: "Mr. Daniel", time: "Today, 4:00 PM", status: "Starting soon" },
                        { title: "English Grammar", tutor: "Mrs. Sarah", time: "Tomorrow, 10:00 AM", status: "Scheduled" },
                      ].map((lesson, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                              <BookOpen size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{lesson.title}</h4>
                              <p className="text-gray-500 text-sm">with {lesson.tutor} • {lesson.time}</p>
                            </div>
                          </div>
                          <button className="px-6 py-3 bg-white text-primary font-bold rounded-xl border border-primary hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                            Join Room <PlayCircle size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Profile */}
                  <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 drop-shadow-2xl">
                      <Logo size="xl" showText={false} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-6">Learning Child</h3>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white/20">
                          <img src="https://i.pravatar.cc/100?u=tolu" alt="Child" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-2xl font-black">Tolu Adebayo</p>
                          <p className="text-white/60">Primary 5 • JS1 Prep</p>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-6 border border-white/10 mb-8 font-mono">
                        <div className="flex justify-between mb-2 text-sm italic">
                            <span>TOTAL PROGRESS</span>
                            <span>87%</span>
                        </div>
                        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "87%" }}
                            className="h-full bg-secondary"
                          ></motion.div>
                        </div>
                      </div>
                      <button className="w-full py-4 bg-white text-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                        Detailed Progress Report <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/find" element={
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <h2 className="text-3xl font-bold">Discover Top Tutors</h2>
                  <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" placeholder="Search subjects..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50">
                      <Filter size={18} /> Filter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[
                    { name: "Mr. Daniel", subject: "Mathematics", rating: 4.9, price: "₦5,000/hr", image: "https://i.pravatar.cc/150?u=daniel" },
                    { name: "Mrs. Sarah", subject: "English Literature", rating: 4.8, price: "₦4,500/hr", image: "https://i.pravatar.cc/150?u=sarah" },
                    { name: "Blessing Okoro", subject: "Physics", rating: 5.0, price: "₦6,000/hr", image: "https://i.pravatar.cc/150?u=blessing" },
                    { name: "Dr. Ahmed", subject: "Chemistry", rating: 4.7, price: "₦7,500/hr", image: "https://i.pravatar.cc/150?u=ahmed" },
                  ].map((tutor, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="relative h-48">
                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-sm">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" /> {tutor.rating}
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-1">{tutor.name}</h4>
                        <p className="text-primary font-semibold text-sm mb-4">{tutor.subject}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-lg font-black text-ink">{tutor.price}</span>
                          <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">
                            Book Trial
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function GraduationCap(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.599 9.084a1 1 0 0 0-.01 1.832l8.57 3.908a2 2 0 0 0 1.673 0l8.588-3.902Z"></path><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-5"></path><path d="M21 17L21 8"></path></svg>
}
