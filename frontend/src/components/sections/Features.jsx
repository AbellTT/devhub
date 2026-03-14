import { Terminal, Users, Cpu, Code2, Globe2, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <Terminal className="w-8 h-8 text-primary" />,
    title: "Developer First",
    description: "Built strictly for the needs of developers. Share code snippets with zero-config syntax highlighting."
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" />,
    title: "Elite Network",
    description: "Connect with industry leaders, senior engineers, and rising stars from around the globe."
  },
  {
    icon: <Cpu className="w-8 h-8 text-accent" />,
    title: "Project Showcases",
    description: "Upload your side projects, get peer reviews, and find open-source contributors easily."
  },
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Clean API Access",
    description: "Build your own tools on top of our platform using our beautifully documented REST architecture."
  },
  {
    icon: <Globe2 className="w-8 h-8 text-secondary" />,
    title: "Global Reach",
    description: "Your posts and projects are indexed fast. Reach thousands of developers instantly."
  },
  {
    icon: <Zap className="w-8 h-8 text-accent" />,
    title: "Lightning Fast",
    description: "Powered by modern edge routing and optimal database queries to ensure a snappy experience."
  }
];

export default function Features() {
  return (
    <section className="py-16 px-6 bg-bg relative isolate">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute max-w-7xl mx-auto inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_50%)] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight italic"
          >
            Everything you need to <span className="text-primary">ship faster.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text/60 italic leading-relaxed"
          >
            We've stripped away the noise of traditional social media. 
            DevHub provides only the tools that actually matter to software engineers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 italic">{feature.title}</h3>
              <p className="text-text/60 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
