import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { FindTutors } from "./pages/FindTutors";
import { HowItWorks } from "./pages/HowItWorks";
import { Pricing } from "./pages/Pricing";
import { ParentDashboard } from "./pages/ParentDashboard";
import { TutorDashboard } from "./pages/TutorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { TutorOnboarding } from "./pages/TutorOnboarding";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { useFirebase } from "./contexts/FirebaseContext";

function ProtectedRoute({ children, allowedRole }: { children: any; allowedRole?: string }) {
  const { user, profile, loading } = useFirebase();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && profile?.role !== allowedRole) {
    // Redirect to appropriate dashboard based on role
    if (profile?.role === "parent") return <Navigate to="/parent" replace />;
    if (profile?.role === "tutor") return <Navigate to="/tutor" replace />;
    if (profile?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isDashboard = ["/parent", "/tutor", "/admin"].some(path => 
    location.pathname === path || location.pathname.startsWith(path + "/")
  ) && location.pathname !== "/tutors"; // Explicitly exclude /tutors which shares the prefix

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tutors" element={<FindTutors />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage isSignup />} />
          <Route path="/parent/*" element={
            <ProtectedRoute allowedRole="parent">
              <ParentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tutor/onboarding" element={
            <ProtectedRoute allowedRole="tutor">
              <TutorOnboarding />
            </ProtectedRoute>
          } />
          <Route path="/tutor/*" element={
            <ProtectedRoute allowedRole="tutor">
              <TutorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
