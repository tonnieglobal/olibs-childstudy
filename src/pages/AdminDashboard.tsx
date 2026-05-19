import { 
  Users, Shield, BarChart3, 
  CreditCard, LayoutDashboard, 
  UserCheck, AlertTriangle, 
  Search, Bell, Settings, LogOut,
  Mail, MessageSquare, ChevronRight,
  Filter, X
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../contexts/FirebaseContext";
import { Logo } from "../components/ui/Logo";

const SUBJECTS = ["All", "Mathematics", "English", "Further Math", "Physics", "Chemistry", "Biology", "Literature", "Government"];
const STATUSES = ["All", "Pending Review", "Verified", "Declined"];

export function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useFirebase();

  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const stats = [
    { label: "Total Users", value: "12,560", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Pending Tutors", value: "48", icon: Shield, color: "text-purple-600 bg-purple-50" },
    { label: "Active Revenue", value: "₦45.6M", icon: CreditCard, color: "text-green-600 bg-green-50" },
    { label: "Active Disputes", value: "5", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
  ];

  const pendingApprovals = [
    { name: "Blessing Okoro", subject: "English", city: "Lagos", status: "Pending Review" },
    { name: "John Smith", subject: "Physics", city: "Accra", status: "Verified" },
    { name: "Adaeze Uzor", subject: "Further Math", city: "Abuja", status: "Declined" },
    { name: "Tunde Ednut", subject: "Mathematics", city: "Lagos", status: "Pending Review" },
    { name: "Chioma Adeleke", subject: "Biology", city: "Enugu", status: "Verified" },
    { name: "Seyi Shay", subject: "Chemistry", city: "Kaduna", status: "Pending Review" },
  ];

  const filteredTutors = useMemo(() => {
    return pendingApprovals.filter(tutor => {
      const matchesSubject = subjectFilter === "All" || tutor.subject === subjectFilter;
      const matchesStatus = statusFilter === "All" || tutor.status === statusFilter;
      const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tutor.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [subjectFilter, statusFilter, searchQuery]);

  const TutorApprovalsPage = () => (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
            <Filter size={16} className="text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Filters</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Subject</label>
            <select 
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-primary min-w-[150px]"
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-primary min-w-[150px]"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(subjectFilter !== "All" || statusFilter !== "All" || searchQuery !== "") && (
            <button 
              onClick={() => {
                setSubjectFilter("All");
                setStatusFilter("All");
                setSearchQuery("");
              }}
              className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 px-4"
            >
              <X size={14} /> Reset
            </button>
          )}
          <div className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">
            {filteredTutors.length} Responding
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Tutor</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Specialization</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Location</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400">Verification State</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredTutors.map((tutor) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={tutor.name} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6 text-ink">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">
                          {tutor.name[0]}
                        </div>
                        <span className="font-bold">{tutor.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider italic">
                        {tutor.subject}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{tutor.city}</td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                        tutor.status === "Verified" ? "bg-green-50 text-green-600 border-green-100" :
                        tutor.status === "Declined" ? "bg-red-50 text-red-600 border-red-100" : 
                        "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${
                           tutor.status === "Verified" ? "bg-green-500" :
                           tutor.status === "Declined" ? "bg-red-500" : "bg-amber-500"
                         }`}></div>
                         {tutor.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="px-5 py-2.5 bg-ink text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-ink/10">
                        Examine Profile
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredTutors.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                 <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-ink">No matching applicants</h3>
              <p className="text-gray-400 max-w-xs mx-auto mt-2">Adjust your filters or search query to find tutors in the pipeline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - More "System" look */}
      <aside className="w-64 bg-ink text-white hidden lg:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <Logo size="sm" />
          </Link>

          <nav className="space-y-1">
            {[
              { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
              { label: "Tutor Approvals", icon: UserCheck, path: "/admin/tutors" },
              { label: "Users Registry", icon: Users, path: "/admin/users" },
              { label: "Financials", icon: CreditCard, path: "/admin/billing" },
              { label: "Communication", icon: MessageSquare, path: "/admin/communication" },
              { label: "Platform Settings", icon: Settings, path: "/admin/settings" },
            ].map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    active 
                      ? "bg-white/10 text-white" 
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/50 font-bold hover:text-red-400 transition-all w-full"
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
              <h1 className="text-3xl font-bold text-ink">
                {location.pathname === "/admin/tutors" ? "Tutor Verification Pipeline" : "System Oversight"}
              </h1>
              <p className="text-gray-500 italic">
                {location.pathname === "/admin/tutors" ? `Monitoring ${filteredTutors.length} pending applications.` : "Platform state is optimal. 48 actions pending."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Global system search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary w-64 transition-all"
                />
              </div>
              <button className="p-3 bg-white border border-gray-100 rounded-2xl relative text-gray-500 hover:text-primary transition-colors focus:ring-2 focus:ring-primary">
                <Bell size={24} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                      <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                        <stat.icon size={28} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-black text-ink">{stat.value}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                   {/* Pending Approvals Widget */}
                   <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                         <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tight">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            Tutor Pipeline
                         </h2>
                         <Link to="/admin/tutors" className="text-primary font-bold text-sm tracking-widest uppercase bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">Manage All</Link>
                      </div>
                      <div className="divide-y divide-gray-50">
                         {pendingApprovals.slice(0, 3).map((tutor, i) => (
                           <div key={i} className="py-6 flex items-center justify-between group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 font-bold font-mono">
                                    {tutor.name[0]}
                                 </div>
                                 <div>
                                    <p className="font-bold text-lg">{tutor.name}</p>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest">{tutor.subject} • {tutor.city}</p>
                                 </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                                tutor.status === "Verified" ? "bg-green-50 text-green-600 border-green-100" :
                                tutor.status === "Declined" ? "bg-red-50 text-red-600 border-red-100" : 
                                "bg-amber-50 text-amber-600 border-amber-100"
                              }`}>
                                 {tutor.status}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* System Logs / Revenue Overview */}
                   <div className="bg-ink rounded-[2.5rem] p-8 text-white relative flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                         <h2 className="text-2xl font-black uppercase tracking-tight">System Logs</h2>
                         <div className="flex gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-bold text-green-500">REALTIME</span>
                         </div>
                      </div>
                      
                      <div className="flex-1 space-y-4 font-mono text-xs opacity-70">
                         <p className="text-green-400">&gt; [FIREBASE AUTH] User Mrs. Adebayo (u_2938) signed in.</p>
                         <p className="text-blue-400">&gt; [PAYMENT] Webhook from Paystack for tr_9012 (₦12,500).</p>
                         <p className="text-purple-400">&gt; [SYSTEM] Tutor Daniel uploaded intro video (v_293).</p>
                         <p className="text-red-400">&gt; [ALERT] Dispute opened by u_882 (Contract ID: c_293).</p>
                         <p className="text-yellow-400">&gt; [CRON] Newsletter batch #92 dispatched to 12,560 users.</p>
                      </div>

                      <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold uppercase tracking-widest">Platform Integrity</span>
                            <span className="text-green-500 font-bold">99.98%</span>
                         </div>
                         <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[99.98%]"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            } />
            <Route path="/tutors" element={<TutorApprovalsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
