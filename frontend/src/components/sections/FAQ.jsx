import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
    // State tracks which index is open. null means all are closed.
    const [openIndex, setOpenIndex] = useState(null);
    
    const faqs = [
    {
        question: "Is DevHub free to use?",
        answer: "Yes! DevHub is free for all open-source contributors and individual developers."
    },
    {
        question: "Can I connect my GitHub account?",
        answer: "Absolutely. We are building a deep integration with GitHub to automatically showcase your best repositories."
    },
    {
        question: "How is this different from other networks?",
        answer: "We focus purely on code, projects, and architecture. No algorithms, no ads, just developer-to-developer connection."
    }
    ];

    const toggleFAQ = (index) => {
        // If clicking the currently open one, close it (set to null). Otherwise, open the clicked one.
        setOpenIndex(openIndex === index ? null : index);
    };

    return(
    <section className="w-full py-16 px-6 bg-primary/5 border-y border-primary/20">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black italic mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
                <p className="text-text/60 font-medium leading-relaxed max-w-lg mx-auto">Everything you need to know about the product before you take the plunge.</p>
            </div>
            
            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    
                    return(
                        <div 
                            key={index} 
                            className={`bg-white/5 border rounded-2xl overflow-hidden ${
                                isOpen ? 'border-primary/50 bg-white/10' : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                            }`}
                        >
                            <button 
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left outline-none cursor-pointer group"
                            >
                                <span className={`text-lg font-bold italic ${isOpen ? 'text-primary' : 'text-text group-hover:text-primary/80'}`}>
                                    {faq.question}
                                </span>
                                
                                {/* Rotate the chevron when open */}
                                <motion.div 
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-text/50 group-hover:text-primary/80'}`} />
                                </motion.div>
                            </button>
                            
                            {/* Smooth accordion animation */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-text/60 font-medium leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
    );
}