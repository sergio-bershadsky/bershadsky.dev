import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const CyberTree: React.FC<{ color: string; variant: number }> = ({ color, variant }) => {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 40 60" fill="none" className="w-full h-full">
        <rect x="17" y="35" width="6" height="25" fill={color} fillOpacity="0.3" />
        <polygon points="20,2 35,35 5,35" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <polygon points="20,10 30,30 10,30" fill={color} fillOpacity="0.1" />
        <line x1="20" y1="5" x2="20" y2="15" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 40 60" fill="none" className="w-full h-full">
        <rect x="18" y="30" width="4" height="30" fill={color} fillOpacity="0.3" />
        <circle cx="20" cy="18" r="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="20" cy="18" r="10" fill={color} fillOpacity="0.08" />
        <circle cx="14" cy="12" r="2" fill={color} fillOpacity="0.3" />
        <circle cx="26" cy="14" r="1.5" fill={color} fillOpacity="0.25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 70" fill="none" className="w-full h-full">
      <rect x="18" y="40" width="4" height="30" fill={color} fillOpacity="0.3" />
      <polygon points="20,0 38,25 2,25" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <polygon points="20,10 34,32 6,32" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      <polygon points="20,20 30,40 10,40" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
};

const CyberBuilding: React.FC<{ color: string; variant: number }> = ({ color, variant }) => {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 30 50" fill="none" className="w-full h-full">
        <rect x="2" y="10" width="26" height="40" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        <rect x="6" y="15" width="4" height="4" fill={color} fillOpacity="0.4" />
        <rect x="13" y="15" width="4" height="4" fill={color} fillOpacity="0.2" />
        <rect x="20" y="15" width="4" height="4" fill={color} fillOpacity="0.35" />
        <rect x="6" y="23" width="4" height="4" fill={color} fillOpacity="0.15" />
        <rect x="13" y="23" width="4" height="4" fill={color} fillOpacity="0.4" />
        <rect x="20" y="23" width="4" height="4" fill={color} fillOpacity="0.3" />
        <rect x="6" y="31" width="4" height="4" fill={color} fillOpacity="0.3" />
        <rect x="13" y="31" width="4" height="4" fill={color} fillOpacity="0.1" />
        <rect x="20" y="31" width="4" height="4" fill={color} fillOpacity="0.45" />
        <rect x="11" y="40" width="8" height="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
        <line x1="10" y1="2" x2="10" y2="10" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="10" cy="2" r="1" fill={color} fillOpacity="0.5" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 24 40" fill="none" className="w-full h-full">
        <rect x="2" y="5" width="20" height="35" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
        <rect x="5" y="8" width="3" height="5" fill={color} fillOpacity="0.35" />
        <rect x="11" y="8" width="3" height="5" fill={color} fillOpacity="0.2" />
        <rect x="16" y="8" width="3" height="5" fill={color} fillOpacity="0.4" />
        <rect x="5" y="16" width="3" height="5" fill={color} fillOpacity="0.15" />
        <rect x="11" y="16" width="3" height="5" fill={color} fillOpacity="0.35" />
        <rect x="16" y="16" width="3" height="5" fill={color} fillOpacity="0.25" />
        <rect x="5" y="24" width="3" height="5" fill={color} fillOpacity="0.4" />
        <rect x="11" y="24" width="3" height="5" fill={color} fillOpacity="0.1" />
        <rect x="16" y="24" width="3" height="5" fill={color} fillOpacity="0.3" />
        <polygon points="2,5 12,0 22,5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 50 55" fill="none" className="w-full h-full">
      <rect x="2" y="15" width="20" height="40" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.45" />
      <rect x="28" y="25" width="20" height="30" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <rect x="5" y="20" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="11" y="20" width="3" height="3" fill={color} fillOpacity="0.2" />
      <rect x="16" y="20" width="3" height="3" fill={color} fillOpacity="0.35" />
      <rect x="5" y="27" width="3" height="3" fill={color} fillOpacity="0.15" />
      <rect x="11" y="27" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="16" y="27" width="3" height="3" fill={color} fillOpacity="0.25" />
      <rect x="5" y="34" width="3" height="3" fill={color} fillOpacity="0.3" />
      <rect x="11" y="34" width="3" height="3" fill={color} fillOpacity="0.1" />
      <rect x="31" y="30" width="3" height="3" fill={color} fillOpacity="0.35" />
      <rect x="37" y="30" width="3" height="3" fill={color} fillOpacity="0.2" />
      <rect x="43" y="30" width="3" height="3" fill={color} fillOpacity="0.4" />
      <rect x="31" y="37" width="3" height="3" fill={color} fillOpacity="0.25" />
      <rect x="37" y="37" width="3" height="3" fill={color} fillOpacity="0.15" />
      <rect x="43" y="37" width="3" height="3" fill={color} fillOpacity="0.35" />
      <line x1="12" y1="5" x2="12" y2="15" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="12" cy="5" r="1.5" fill={color} fillOpacity="0.5" />
      <line x1="38" y1="18" x2="38" y2="25" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
    </svg>
  );
};

const CyberLampPost: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 16 50" fill="none" className="w-full h-full">
    <rect x="7" y="15" width="2" height="35" fill={color} fillOpacity="0.3" />
    <line x1="8" y1="15" x2="14" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    <circle cx="14" cy="10" r="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
    <circle cx="14" cy="10" r="6" fill={color} fillOpacity="0.05" />
    <rect x="5" y="48" width="6" height="2" fill={color} fillOpacity="0.2" />
  </svg>
);

interface SpriteData {
  id: number;
  type: 'tree' | 'building' | 'lamp';
  variant: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  color: string;
  zIndex: number;
  animDelay: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const COLORS = ['#ec4899', '#06b6d4', '#9333ea', '#8b5cf6', '#ec4899'];

export const CyberpunkRoadSprites: React.FC = () => {
  const sprites = useMemo<SpriteData[]>(() => {
    const rand = seededRandom(42);
    const items: SpriteData[] = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const r = rand();
      const type: SpriteData['type'] = r < 0.4 ? 'tree' : r < 0.8 ? 'building' : 'lamp';
      const variant = Math.floor(rand() * 3);
      const depth = rand();
      const scale = 0.4 + depth * 0.8;
      const yOffset = (1 - depth) * 20;

      items.push({
        id: i,
        type,
        variant,
        x: Math.max(3, Math.min(97, (i / count) * 100 + (rand() - 0.5) * (100 / count) * 0.6)),
        y: yOffset,
        scale,
        opacity: 0.25 + depth * 0.45,
        color: COLORS[Math.floor(rand() * COLORS.length)],
        zIndex: Math.floor(depth * 10),
        animDelay: rand() * 4,
      });
    }

    return items.sort((a, b) => a.zIndex - b.zIndex);
  }, []);

  const renderSprite = (sprite: SpriteData) => {
    const baseSize = sprite.type === 'building' ? 50 : sprite.type === 'lamp' ? 20 : 35;
    const w = baseSize * sprite.scale;
    const h = (sprite.type === 'building' ? 55 : sprite.type === 'lamp' ? 50 : 60) * sprite.scale;

    const drift = sprite.type === 'tree' ? 3 : sprite.type === 'lamp' ? 1.5 : 1;
    const driftDuration = 6 + sprite.animDelay * 3;

    return (
      <motion.div
        key={sprite.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: sprite.opacity,
          y: [0, -drift, 0, drift * 0.5, 0],
        }}
        transition={{
          opacity: { duration: 1.5, delay: sprite.animDelay * 0.3 },
          y: {
            duration: driftDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: sprite.animDelay * 0.3,
          },
        }}
        className="absolute bottom-0"
        style={{
          left: `${sprite.x}%`,
          width: w,
          height: h,
          marginBottom: sprite.y,
          zIndex: sprite.zIndex,
          transform: `translateX(-50%)`,
          filter: sprite.zIndex < 4 ? 'blur(0.5px)' : 'none',
        }}
      >
        {sprite.type === 'tree' && <CyberTree color={sprite.color} variant={sprite.variant} />}
        {sprite.type === 'building' && <CyberBuilding color={sprite.color} variant={sprite.variant} />}
        {sprite.type === 'lamp' && <CyberLampPost color={sprite.color} />}
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-24 md:h-32 overflow-hidden pointer-events-none select-none" data-testid="road-sprites" aria-hidden="true" role="presentation">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
      {sprites.map(renderSprite)}
    </div>
  );
};
