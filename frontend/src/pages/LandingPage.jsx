import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import FAQ from "../components/sections/FAQ";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-bg selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Public Navbar */}
      <Navbar />
      
      <main>
        {/* Main Landing Page Sections */}
        <Hero />
        <Features />
        <Testimonials />
        <FAQ/>
        <CTA />
      </main>

      {/* Footer Placeholder */}
      <footer className="py-10 border-t border-white/5 flex justify-center">
        <p className="text-text/30 text-[10px] font-bold uppercase tracking-widest italic">
          &copy; 2026 DevHub Community. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
