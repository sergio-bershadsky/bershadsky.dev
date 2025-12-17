import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FallingCoin: React.FC<{ delay: number; left: number; duration: number; size: number }> = ({ delay, left, duration, size }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0, rotateY: 0 }}
      animate={{ 
        y: '110vh', 
        opacity: [0, 1, 1, 0.5, 0],
        rotateY: 720,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ left: `${left}%` }}
      className="absolute top-0"
    >
      <div 
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Coin glow */}
        <div 
          className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md"
          style={{ transform: 'scale(1.5)' }}
        />
        {/* Coin body */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border-2 border-yellow-200/50 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
          style={{ 
            backgroundImage: 'linear-gradient(135deg, #fde047 0%, #facc15 30%, #eab308 70%, #ca8a04 100%)',
          }}
        >
          {/* Coin inner circle / symbol */}
          <div className="absolute inset-[20%] rounded-full border border-yellow-700/30 flex items-center justify-center">
            <span className="text-yellow-800/60 font-bold" style={{ fontSize: size * 0.4 }}>₿</span>
          </div>
          {/* Shine effect */}
          <div className="absolute top-[10%] left-[15%] w-[25%] h-[25%] rounded-full bg-white/40 blur-[1px]" />
        </div>
      </div>
    </motion.div>
  );
};

const CoinWaterfall: React.FC = () => {
  const coins = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
      size: 16 + Math.random() * 20,
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
