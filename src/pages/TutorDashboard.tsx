import { motion } from "motion/react";
import { 
  Users, BookOpen, Calendar, Wallet, 
  Video, FileText, CheckCircle2,
  TrendingUp, Bell, LogOut, Settings,
  ChevronRight, ArrowUpRight, MessageCircle
} from "lucide-react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import { Logo } from "../components/ui/Logo";

export function TutorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useFirebase();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const stats = [
    { label: "Total Earnings", value: "₦245,000", icon: Wallet, color: "text-blue-600 bg-blue-50", change: "+18%" },
    { label: "Active Students", value: "14", icon: Users, color: "text-purple-600 bg-purple-50", change: "+2" },
    { label: "Upcoming Classes", value: "6", icon: Calendar, color: "text-yellow-600 bg-yellow-50", change: "This week" },
    { label: "Rating", value: "4.9/5", icon: CheckCircle2, color: "text-green-600 bg-green-50", change: "20+ reviews" },
  ];

  const recentReviews = [
    { name: "Mrs. Adebayo", content: "Great math session! Tolu enjoyed it.", rating: 5, date: "2h ago" },
    { name: "John Doe", content: "Very professional and punctual.", rating: 5, date: "1d ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Same style as Parent */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <Logo size="sm" />
          </Link>

          <nav className="space-y-1">
            {[
              { label: "Overview", icon: TrendingUp, path: "/tutor" },
              { label: "Class Schedule", icon: Calendar, path: "/tutor/schedule" },
              { label: "Students", icon: Users, path: "/tutor/students" },
              { label: "Earnings", icon: Wallet, path: "/tutor/earnings" },
              { label: "Intro Video", icon: Video, path: "/tutor/video" },
              { label: "Settings", icon: Settings, path: "/tutor/settings" },
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
              <h1 className="text-3xl font-bold text-ink">Welcome, Mr. Daniel! ✨</h1>
              <p className="text-gray-500">You have 2 lessons starting in the next 4 hours.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex bg-white px-4 py-2 rounded-xl border border-gray-100 items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-sm font-semibold text-gray-600 italic uppercase tracking-wider">Online & Available</span>
               </div>
              <button className="p-3 bg-white border border-gray-100 rounded-2xl relative text-gray-500 hover:text-primary transition-colors">
                <Bell size={24} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-12 h-12 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary/10 transition-all">
                <img src="https://i.pravatar.cc/100?u=tutor-daniel" alt="Profile" />
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
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
                          <stat.icon size={24} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-gray-500 font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-ink mt-1">{stat.value}</h3>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                  {/* Class List */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Upcoming Classes</h2>
                        <Link to="/tutor/schedule" className="text-primary font-bold hover:underline">View All</Link>
                      </div>
                      <div className="space-y-4">
                        {[
                          { student: "Tolu Adebayo", subject: "Mathematics", time: "Starts in 45 min", type: "Math Specialist" },
                          { student: "Emeka Obi", subject: "Intro Science", time: "Tomorrow, 2:00 PM", type: "Trial Session" },
                        ].map((lesson, i) => (
                          <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary border border-gray-200">
                                <Video size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg">{lesson.student}</h4>
                                <p className="text-gray-500 text-sm">{lesson.subject} • <span className="text-primary font-medium">{lesson.time}</span></p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
                                  Go to Class <ArrowUpRight size={18} />
                                </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Earnings Chart Simplified */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                       <h2 className="text-2xl font-bold mb-6">Earnings Breakdown</h2>
                       <div className="h-48 flex items-end gap-2 px-4">
                          {[40, 60, 30, 80, 90, 50, 70, 85, 45, 95].map((h, i) => (
                            <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className="flex-1 bg-primary/10 rounded-t-lg group relative"
                            >
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₦{h}k</div>
                               <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg transition-all" style={{ height: i === 9 ? '100%' : '20%' }}></div>
                            </motion.div>
                          ))}
                       </div>
                       <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold px-2 uppercase tracking-tighter">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                          <span>Jul</span>
                          <span>Aug</span>
                          <span>Sep</span>
                          <span>Oct</span>
                       </div>
                    </div>
                  </div>

                  {/* Sidebar/Right Panel */}
                  <div className="space-y-8">
                     {/* Feedback Section */}
                     <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                           <MessageCircle size={20} className="text-primary" />
                           Recent Reviews
                        </h3>
                        <div className="space-y-6">
                           {recentReviews.map((review, i) => (
                             <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex justify-between mb-2">
                                   <p className="font-bold">{review.name}</p>
                                   <span className="text-[10px] text-gray-400 font-bold uppercase">{review.date}</span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                   {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-secondary text-secondary" />)}
                                </div>
                                <p className="text-gray-500 text-sm italic">"{review.content}"</p>
                             </div>
                           ))}
                        </div>
                        <button className="w-full mt-6 py-3 border-2 border-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all uppercase text-xs tracking-widest">
                           View All Feedback
                        </button>
                     </div>

                     {/* Profile Completion Wrapper */}
                     <div className="bg-secondary/10 rounded-[2.5rem] p-8 border-2 border-dashed border-secondary/30 relative">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-secondary-foreground">
                              <Video size={20} />
                           </div>
                           <h3 className="font-bold">Next Steps</h3>
                        </div>
                        <p className="text-sm text-secondary-foreground/70 mb-6 leading-relaxed">
                           Upload your <strong className="text-secondary-foreground font-black">Introduction Video</strong> to increase your booking rate by up to 150%.
                        </p>
                        <button className="w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-secondary/20">
                          Upload Now <Video size={18} />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Star(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
}
