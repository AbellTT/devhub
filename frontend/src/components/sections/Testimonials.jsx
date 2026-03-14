import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Frontend Engineer @ Vercel",
    content: "DevHub is exactly what I've been looking for. The lack of ads and algorithms means I only see high-quality content from other engineers.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Open Source Maintainer",
    content: "I started posting my project updates here and the feedback loop has been incredible. The community is supportive and deeply technical.",
    avatar: "SC"
  },
  {
    name: "David Kim",
    role: "Fullstack Developer",
    content: "Finally, a place where I can share my Django APIs without having to explain the basics. The caliber of talent here is unmatched.",
    avatar: "DK"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight italic"
          >
            Loved by <span className="text-secondary">engineers.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-2 text-yellow-500 mb-4"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-current w-6 h-6" />
            ))}
          </motion.div>
          <p className="text-text/60 italic font-medium">
            Based on 500+ reviews from verified developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 shadow-xl"
            >
              <p className="text-lg text-text/80 mb-8 italic leading-relaxed">
                "{item.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-text">{item.name}</h4>
                  <p className="text-xs text-text/50 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
