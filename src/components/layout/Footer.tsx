import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Logo size="sm" />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting African families with verified, high-quality tutors for personalized learning experiences. Building better futures, one lesson at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">For Parents</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/tutors" className="hover:text-primary transition-colors">Find a Tutor</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Plans & Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Parent FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">For Tutors</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/become-tutor" className="hover:text-primary transition-colors">Become a Tutor</Link></li>
              <li><Link to="/tutor-guidelines" className="hover:text-primary transition-colors">Teaching Guidelines</Link></li>
              <li><Link to="/tutor-resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/tutor-faq" className="hover:text-primary transition-colors">Tutor FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>support@olibschildstudy.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+234 800 OLIDS EDU</span>
              </li>
              <li>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Subscribe to our newsletter</h4>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90">
                      Join
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Olibs ChildStudy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
