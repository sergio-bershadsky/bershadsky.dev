import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const NeonCard: React.FC<NeonCardProps> = ({ children, className, variant = 'primary' }) => {
  const borderColors = {
    primary: 'border-primary/50 hover:border-primary',
    secondary: 'border-secondary/50 hover:border-secondary',
    accent: 'border-accent/50 hover:border-accent',
  };

  const glowColors = {
    primary: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
    secondary: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    accent: 'hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative bg-card/80 backdrop-blur-md border p-6 overflow-hidden transition-all duration-300",
        borderColors[variant],
        glowColors[variant],
        className
      )}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
      {children}
    </motion.div>
  );
};

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]",
    secondary: "bg-transparent border border-secondary text-secondary hover:bg-secondary/10 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg font-bold tracking-widest uppercase"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-display clip-path-slant cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      style={{
        clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const ScrollingChar: React.FC<{ target: string; delay?: number }> = ({ target, delay = 0 }) => {
  const [char, setChar] = React.useState(target);
  const internalTarget = React.useRef(target);

  React.useEffect(() => {
    if (internalTarget.current === target) return;
    
    const start = internalTarget.current.charCodeAt(0);
    const end = target.charCodeAt(0);
    const direction = end > start ? 1 : -1;
    let current = start;

    // Small delay before starting the scroll for this specific character
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (current === end) {
          clearInterval(interval);
          internalTarget.current = target;
          return;
        }
        
        current += direction;
        // Skip some characters to make it faster/look like random glitching if distance is far
        if (Math.abs(end - current) > 5 && Math.random() > 0.5) {
             current += direction; 
        }
        
        setChar(String.fromCharCode(current));
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <span>{char}</span>;
};

export const NameGlitch: React.FC = () => {
  const [text, setText] = React.useState("SERGEY");
  const [targetWord, setTargetWord] = React.useState("SERGIO");
  const [isDeleting, setIsDeleting] = React.useState(true);
  const [isWaiting, setIsWaiting] = React.useState(false);

  React.useEffect(() => {
    if (isWaiting) return;

    const timeout = setTimeout(() => {
      const currentText = text;
      
      if (isDeleting) {
        if (currentText === "SERG") {
          setIsDeleting(false);
        } else {
          setText(currentText.slice(0, -1));
        }
      } else {
        // Typing
        if (currentText === targetWord) {
          setIsWaiting(true);
          setTimeout(() => {
            setTargetWord(prev => prev === "SERGEY" ? "SERGIO" : "SERGEY");
            setIsDeleting(true);
            setIsWaiting(false);
          }, 2000);
        } else {
          setText(targetWord.slice(0, currentText.length + 1));
        }
      }
    }, isDeleting ? 100 : 150); // Faster delete, slower type

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isWaiting, targetWord]);

  return (
    <div className="relative inline-block group h-[1em]">
       {/* Use a fixed height container to prevent layout shifts if possible, though h1 handles it */}
      <span className="relative z-10">{text}</span>
      <span className="animate-pulse ml-1 inline-block w-[0.1em] h-[0.8em] bg-primary align-middle" />
      
      {/* Glitch layers for the current text */}
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12 relative">
    <h2 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground font-mono mt-2 text-lg tracking-wider uppercase">
        // {subtitle}
      </p>
    )}
    <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
  </div>
);
