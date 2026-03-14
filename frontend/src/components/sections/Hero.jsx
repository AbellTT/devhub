import { ArrowRight, Code, Zap, Globe } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10 pt-2 md:pt-0">
        {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8 hover:border-primary/30 transition-colors cursor-default"
      >
        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-widest text-text/50 italic">
          v1.0 is now live
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-8xl font-black text-center tracking-tighter leading-[0.9] max-w-5xl mb-8 selection:bg-primary selection:text-white"
      >
        Where code <br />
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">
          comes to life.
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-text/50 text-xl md:text-2xl text-center max-w-2xl mb-12 font-medium leading-relaxed italic"
      >
        Join the most exclusive community for elite developers to showcase projects, 
        collaborate on ideas, and grow their impact.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-6 sm:px-0"
      >
        <Link to="/signup" className="w-full sm:w-auto">
          <Button 
            size="lg" 
            className="w-full"
            icon={<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />} 
            iconPosition="right"
          >
            Become a Member
          </Button>
        </Link>

        <Button variant="glass" size="lg" className="w-full sm:w-auto">
          Explore Projects
        </Button>
      </motion.div>

      {/* Trust Badges / Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-700"
      >
        <StatItem icon={<Code className="w-5 h-5" />} label="10k+ Repos" />
        <StatItem icon={<Zap className="w-5 h-5" />} label="Fast API" />
        <StatItem icon={<Globe className="w-5 h-5" />} label="Global Devs" />
        <StatItem icon={<UserPlus className="w-5 h-5" />} label="Daily Joins" />
      </motion.div>
      </div>
    </section>
  );
}

function StatItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg text-primary">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-text italic underline decoration-primary/30 underline-offset-4">
        {label}
      </span>
    </div>
  );
}

function UserPlus({ className }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="16" x2="22" y1="11" y2="11" />
    </svg>
  );
}
