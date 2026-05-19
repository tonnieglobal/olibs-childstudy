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
          <Route path="/parent/*" element={<ParentDashboard />} />
          <Route path="/tutor/onboarding" element={<TutorOnboarding />} />
          <Route path="/tutor/*" element={<TutorDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
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
