import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo size="md" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/tutors" className="text-gray-600 hover:text-primary font-semibold transition-colors">Find Tutors</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary font-semibold transition-colors">How it Works</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary font-semibold transition-colors">Pricing</Link>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="px-6 py-2.5 rounded-full border-2 border-gray-100 hover:border-primary text-gray-700 font-bold transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-8 py-2.5 bg-secondary text-white font-bold rounded-full shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
                Join Now
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" className="block px-3 py-4 text-lg font-medium text-gray-700 border-b border-gray-50">Home</Link>
              <Link to="/tutors" className="block px-3 py-4 text-lg font-medium text-gray-700 border-b border-gray-50">Find Tutors</Link>
              <Link to="/how-it-works" className="block px-3 py-4 text-lg font-medium text-gray-700 border-b border-gray-50">How it Works</Link>
              <Link to="/pricing" className="block px-3 py-4 text-lg font-medium text-gray-700 border-b border-gray-50">Pricing</Link>
              <div className="pt-4 grid grid-cols-2 gap-4 text-center">
                <Link to="/login" className="py-4 text-primary font-bold border border-primary rounded-xl">Sign In</Link>
                <Link to="/signup" className="py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20">Join Now</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
