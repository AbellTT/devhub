import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { ArrowRight, Github } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden isolate">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10" />

      <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-sm md:backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative">
        {/* Glow behind the box */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 to-transparent rounded-[3rem]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight italic">
            Ready to push your <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              career forward?
            </span>
          </h2>
          <p className="text-xl text-text/60 italic leading-relaxed mb-12 max-w-2xl mx-auto">
            Join thousands of developers who are already showcasing their work, 
            finding collaborators, and leveling up their skills.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button 
                  size="lg" 
                  icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />} 
                  iconPosition="right"
                  className="w-full"
              >
                Create Free Account
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button 
                  variant="glass" 
                  size="lg" 
                  icon={<Github className="w-5 h-5" />}
                  className="w-full"
              >
                Log in with GitHub
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-text/40 font-medium italic">
            No credit card required. Free forever for open-source contributors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
