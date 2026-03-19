import { Link } from "react-router-dom";
import { Cpu, Terminal, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-bg flex selection:bg-primary selection:text-white">
      {/* Left Side - Branding (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 relative bg-primary/5 border-r border-white/5 overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative z-10 p-16 flex flex-col justify-between h-full max-w-2xl">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-2xl italic">D</span>
            </div>
            <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DevHub
            </span>
          </Link>

          {/* Hero Text */}
          <div className="mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black italic mb-6 leading-[1.1]"
            >
              The network for <br />
              <span className="text-primary">elite engineers.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-text/60 italic leading-relaxed"
            >
              Stop scrolling through noise. Start connecting with developers who are actually building the future.
            </motion.p>
          </div>

          {/* Mini Features List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col gap-6"
          >
             <AuthFeature icon={<Terminal />} text="Share code with zero-config syntax highlighting" />
             <AuthFeature icon={<Cpu />} text="Showcase your open-source side projects" />
             <AuthFeature icon={<Zap />} text="Clean REST API access to build your own tools" />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 relative isolate">
        {/* Subtle glow for mobile devices where left side is hidden */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] lg:hidden -z-10" />
        
        <div className="w-full max-w-md">
          {/* Mobile Logo Only */}
          <div className="flex lg:hidden justify-center mb-12">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl italic">D</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-text">DevHub</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-5 text-center lg:text-left">
            <h2 className="text-3xl font-black italic mb-3">{title}</h2>
            <p className="text-text/60 font-medium">{subtitle}</p>
          </div>

          {/* Render the specific auth form (Login or Signup) */}
          {children}

        </div>
      </div>
    </div>
  );
}

function AuthFeature({ icon, text }) {
  return (
    <div className="flex items-center gap-4 text-text/60 group hover:text-text transition-colors">
      <div className="p-2 bg-white/5 rounded-lg text-primary/70 group-hover:text-primary">
        {icon}
      </div>
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
}
