import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useFirebase } from "../contexts/FirebaseContext";
import { Logo } from "../components/ui/Logo";

export function AuthPage({ isSignup = false }) {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "parent" | "tutor") || "parent";
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { signIn, signInWithEmail, signUpWithEmail } = useFirebase();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    try {
      if (isSignup) {
        await signUpWithEmail(formData.email, formData.password, formData.name, role);
      } else {
        await signInWithEmail(formData.email, formData.password, role);
      }
      if (role === "tutor") navigate("/tutor/onboarding");
      else navigate(`/${role}`);
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
        await signIn(role);
        if (role === "tutor") navigate("/tutor/onboarding");
        else navigate(`/${role}`);
    } catch (e: any) {
        console.error(e);
        setError(e.message || "Google authentication failed. Please try again.");
    } finally {
        setIsLoggingIn(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-stretch">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 bg-white py-12">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-12 lg:hidden">
            <Logo size="sm" />
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl font-extrabold text-ink mb-3 tracking-tight">
              {isSignup ? `Create your ${role} account` : `Welcome back!`}
            </h1>
            <p className="text-gray-500">
              {isSignup 
                ? "Join thousands of families building a brighter future." 
                : "Enter your credentials to access your dashboard."}
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password</label>
                {!isSignup && <a href="#" className="text-sm font-semibold text-primary hover:underline">Forgot?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full py-4 bg-white text-ink border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mb-4"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-sm uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or with email</span></div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSignup ? "Create Account" : "Sign In"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
          </form>

          <footer className="mt-10 text-center">
            <p className="text-gray-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link 
                to={isSignup ? `/login?role=${role}` : `/signup?role=${role}`} 
                className="text-primary font-bold hover:underline"
              >
                {isSignup ? "Sign In" : "Register Now"}
              </Link>
            </p>
          </footer>
        </div>
      </div>

      {/* Right Side: Visual/Context */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="flex items-center justify-center text-white mx-auto mb-10 drop-shadow-2xl">
            <Logo size="xl" showText={false} />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Building the next generation of African excellence.
          </h2>
          <div className="space-y-6">
            {[
              { icon: ShieldCheck, text: "Strictly verified professionals" },
              { icon: CheckCircle2, text: "Curriculum tailored to your child" },
              { icon: CheckCircle2, text: "Secure and transparent system" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-white border border-white/10">
                <item.icon className="text-secondary shrink-0" size={24} />
                <span className="font-semibold text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/50 text-sm font-mono tracking-widest uppercase">
          <span>Olibs ChildStudy v1.0.0</span>
          <span>•</span>
          <span>Educational Excellence</span>
        </div>
      </div>
    </div>
  );
}
