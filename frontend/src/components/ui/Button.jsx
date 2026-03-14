import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Button = forwardRef(
  ({ children, className, variant = "primary", size = "md", icon, iconPosition = "left", ...props }, ref) => {
    
    // Base styles applied to all buttons
    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-bold italic transition duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl overflow-hidden group";
    
    // Size variations
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-10 py-5 text-lg",
    };

    // Variant variations
    const variants = {
      primary: "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary/90 hover:scale-105",
      secondary: "bg-secondary text-white shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:bg-secondary/90 hover:scale-105",
      outline: "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:scale-105",
      ghost: "bg-transparent text-text/60 hover:text-text hover:bg-white/5",
      glass: "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:scale-105 shadow-xl shadow-black/20",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {/* Shine effect for primary/secondary buttons */}
        {(variant === "primary" || variant === "secondary") && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0" />
        )}
        
        {/* Content wrapper to stay above shine */}
        <span className="relative z-10 flex items-center gap-2">
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
