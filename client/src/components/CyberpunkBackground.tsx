import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FallingCoin: React.FC<{ 
  delay: number; 
  left: number; 
  duration: number; 
  size: number;
  wobble: number;
}> = ({ delay, left, duration, size, wobble }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: '120vh', 
        opacity: [0, 1, 1, 1, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for gravity feel
      }}
      style={{ 
        left: `${left}%`,
        perspective: '500px',
        perspectiveOrigin: 'center',
      }}
      className="absolute top-0"
    >
      {/* Horizontal wobble container */}
      <motion.div
        animate={{
          x: [-wobble, wobble, -wobble],
        }}
        transition={{
          duration: duration * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 3D Rotation container */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            rotateX: [-15, 15, -15],
          }}
          transition={{
            rotateY: {
              duration: duration * 0.4,
              repeat: Infinity,
              ease: "linear",
            },
            rotateX: {
              duration: duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{ 
            width: size, 
            height: size,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Coin - Front face */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'linear-gradient(145deg, #fff7cc 0%, #ffd700 15%, #daa520 40%, #b8860b 60%, #996515 80%, #704214 100%)',
              boxShadow: `
                inset 0 2px ${size * 0.1}px rgba(255,255,255,0.6),
                inset 0 -2px ${size * 0.1}px rgba(0,0,0,0.3),
                0 0 ${size * 0.3}px rgba(255,215,0,0.5),
                0 ${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.4)
              `,
              backfaceVisibility: 'hidden',
              transform: 'translateZ(2px)',
            }}
          >
            {/* Embossed rim */}
            <div 
              className="absolute rounded-full"
              style={{
                inset: size * 0.06,
                border: `${size * 0.04}px solid`,
                borderColor: 'rgba(139,90,43,0.5) rgba(218,165,32,0.3) rgba(218,165,32,0.3) rgba(139,90,43,0.5)',
              }}
            />
            {/* Inner circle with symbol */}
            <div 
              className="absolute rounded-full flex items-center justify-center"
              style={{
                inset: size * 0.18,
                background: 'linear-gradient(145deg, #ffd700 0%, #daa520 50%, #b8860b 100%)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(255,255,255,0.3)',
              }}
            >
              <span 
                className="font-bold"
                style={{ 
                  fontSize: size * 0.35,
                  color: '#8B4513',
                  textShadow: '0 1px 0 rgba(255,215,0,0.5)',
                }}
              >
                ₿
              </span>
            </div>
            {/* Primary shine */}
            <div 
              className="absolute rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent"
              style={{
                top: size * 0.08,
                left: size * 0.12,
                width: size * 0.35,
                height: size * 0.25,
                transform: 'rotate(-30deg)',
              }}
            />
            {/* Secondary shine */}
            <div 
              className="absolute rounded-full bg-white/30"
              style={{
                top: size * 0.15,
                left: size * 0.55,
                width: size * 0.12,
                height: size * 0.08,
                filter: 'blur(1px)',
              }}
            />
          </div>

          {/* Coin - Back face */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'linear-gradient(145deg, #daa520 0%, #b8860b 30%, #996515 60%, #704214 100%)',
              boxShadow: `
                inset 0 2px ${size * 0.1}px rgba(255,255,255,0.4),
                inset 0 -2px ${size * 0.1}px rgba(0,0,0,0.4),
                0 0 ${size * 0.2}px rgba(255,215,0,0.4)
              `,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(2px)',
            }}
          >
            {/* Back pattern */}
            <div 
              className="absolute rounded-full"
              style={{
                inset: size * 0.15,
                border: `${size * 0.03}px solid rgba(139,90,43,0.4)`,
              }}
            />
            <div 
              className="absolute rounded-full flex items-center justify-center"
              style={{
                inset: size * 0.25,
                background: 'linear-gradient(145deg, #b8860b 0%, #996515 100%)',
              }}
            >
              <span style={{ fontSize: size * 0.3, color: '#704214' }}>★</span>
            </div>
          </div>

          {/* Coin edge (thickness) */}
          <div 
            className="absolute rounded-full"
            style={{
              inset: 0,
              background: 'linear-gradient(90deg, #996515 0%, #b8860b 50%, #996515 100%)',
              transform: 'translateZ(-1px) scaleX(0.1)',
              transformOrigin: 'center',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CoinWaterfall: React.FC = () => {
  const coins = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      left: 5 + Math.random() * 90,
      duration: 4 + Math.random() * 4,
      size: 20 + Math.random() * 24,
      wobble: 5 + Math.random() * 15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((coin) => (
        <FallingCoin
          key={coin.id}
          delay={coin.delay}
          left={coin.left}
          duration={coin.duration}
          size={coin.size}
          wobble={coin.wobble}
        />
      ))}
    </div>
  );
};

export const CyberpunkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,2,33,1)_0%,rgba(5,1,15,1)_100%)]" />

      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[100px] opacity-30 mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] opacity-30 mix-blend-screen"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-accent/15 rounded-full blur-[120px] opacity-30 mix-blend-screen"
      />

      {/* Falling Coins Waterfall */}
      <CoinWaterfall />
      
      {/* Grid Overlay (preserved from original design but lighter) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
      />
      
      {/* Scanlines (very subtle) */}
      <div className="absolute inset-0 z-[50] pointer-events-none scanlines opacity-[0.03]" />
    </div>
  );
};
