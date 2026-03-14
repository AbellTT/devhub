import { useState, useEffect } from "react";
import { Search, User, Menu, X, LogIn, UserPlus, Bell, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] px-6 py-4",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl italic">D</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DevHub
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink label="Explore" />
          <NavLink label="Community" />
          <NavLink label="Showcase" />
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          
          {/* Guest View */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" icon={<LogIn className="w-4 h-4" />}>
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" icon={<UserPlus className="w-4 h-4" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-text/60"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg/95 backdrop-blur-2xl border-b border-white/10 p-8 lg:hidden flex flex-col gap-6"
          >
            <MobileNavLink label="Explore" />
            <MobileNavLink label="Community" />
            <MobileNavLink label="Showcase" />
            <hr className="border-white/5" />
            <div className="flex flex-col gap-4">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button variant="primary" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ label }) {
  return (
    <a href="#" className="relative group py-2">
      <span className="text-sm font-semibold text-text/60 group-hover:text-text transition-colors italic">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
    </a>
  );
}

function MobileNavLink({ label }) {
  return (
    <a href="#" className="text-2xl font-black text-text/40 hover:text-text transition-colors italic uppercase tracking-tighter">
      {label}
    </a>
  );
}

function IconButton({ icon }) {
  return (
    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-text/40 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-colors duration-300">
      {icon}
    </button>
  );
}
