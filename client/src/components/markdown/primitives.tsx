import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const DiagramFrame = ({
  children,
  figNumber,
  title,
  label,
  variant = 'primary'
}: {
  children: React.ReactNode;
  figNumber: string;
  title: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}) => {
  const colors = {
    primary: 'border-primary/30 text-primary',
    secondary: 'border-secondary/30 text-secondary',
    accent: 'border-accent/30 text-accent'
  };

  return (
    <div className={`my-8 border ${colors[variant].split(' ')[0]} rounded-lg bg-black/40 p-5 notranslate`} translate="no">
      <div className={`text-sm font-mono ${colors[variant].split(' ')[1]} mb-4 flex justify-between`}>
        <span>FIG {figNumber} // {title}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
      {children}
    </div>
  );
};

export const DiagramBox = ({ 
  children, 
  icon: Icon, 
  variant = 'primary',
  className = ''
}: { 
  children: React.ReactNode; 
  icon?: React.ElementType;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}) => {
  const colors = {
    primary: 'border-primary bg-primary/10 text-primary',
    secondary: 'border-secondary bg-secondary/10 text-secondary',
    accent: 'border-accent bg-accent/10 text-accent'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center p-4 border rounded-lg ${colors[variant]} ${className}`}>
      {Icon && <Icon className="w-6 h-6 mb-2" />}
      <span className="font-mono text-sm text-center">{children}</span>
    </div>
  );
};

export const TwoColumnComparison = ({
  left,
  right,
  leftLabel,
  rightLabel,
  leftColor = 'red',
  rightColor = 'green'
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
  leftColor?: 'red' | 'gray' | 'white';
  rightColor?: 'green' | 'primary' | 'secondary';
}) => {
  const leftColors = {
    red: 'border-red-500/30 bg-red-500/10 text-red-400',
    gray: 'border-white/10 bg-white/5 text-gray-400',
    white: 'border-white/20 bg-white/5 text-white'
  };
  const rightColors = {
    green: 'border-green-500/30 bg-green-500/10 text-green-400',
    primary: 'border-primary/30 bg-primary/10 text-primary',
    secondary: 'border-secondary/30 bg-secondary/10 text-secondary'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className={`p-3 border rounded ${leftColors[leftColor]}`}>
        <div className="font-mono text-xs uppercase mb-2">{leftLabel}</div>
        {left}
      </div>
      <div className={`p-3 border rounded ${rightColors[rightColor]}`}>
        <div className="font-mono text-xs uppercase mb-2">{rightLabel}</div>
        {right}
      </div>
    </div>
  );
};

export const StepList = ({
  steps,
  showArrows = true
}: {
  steps: Array<{
    number?: number;
    label: string;
    description?: string;
    color?: 'gray' | 'secondary' | 'yellow' | 'green' | 'primary' | 'accent';
  }>;
  showArrows?: boolean;
}) => {
  const getColor = (color: string = 'gray') => {
    const colors: Record<string, string> = {
      gray: 'border-white/20 bg-white/5 text-gray-400',
      secondary: 'border-secondary/50 bg-secondary/20 text-secondary',
      yellow: 'border-yellow-500/50 bg-yellow-500/20 text-yellow-400',
      green: 'border-green-500/50 bg-green-500/20 text-green-400',
      primary: 'border-primary/50 bg-primary/20 text-primary',
      accent: 'border-accent/50 bg-accent/20 text-accent'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          {step.number !== undefined && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border ${getColor(step.color)}`}>
              {step.number}
            </div>
          )}
          <div className="flex-1">
            <div className={`font-mono text-xs uppercase ${getColor(step.color).split(' ')[2]}`}>
              {step.label}
            </div>
            {step.description && (
              <div className="text-xs text-gray-500 italic">"{step.description}"</div>
            )}
          </div>
          {showArrows && i < steps.length - 1 && (
            <ArrowDown className="w-4 h-4 text-gray-600" />
          )}
        </div>
      ))}
    </div>
  );
};

export const IconRow = ({
  items,
  icon: DefaultIcon
}: {
  items: Array<{
    icon?: React.ElementType;
    label: string;
    description: string;
  }>;
  icon?: React.ElementType;
}) => (
  <div className="space-y-2">
    {items.map((item, i) => {
      const Icon = item.icon || DefaultIcon;
      return (
        <div key={i} className="flex items-center gap-3 p-2 border border-white/10 rounded bg-white/5">
          {Icon && <Icon className="w-4 h-4 text-secondary flex-shrink-0" />}
          <span className="font-mono text-sm text-white w-28">{item.label}</span>
          <span className="text-xs text-gray-400">{item.description}</span>
        </div>
      );
    })}
  </div>
);

export const FolderTree = ({
  rootName,
  rootIcon: RootIcon,
  folders,
  label
}: {
  rootName: string;
  rootIcon: React.ElementType;
  folders: any[];
  label?: string;
}) => {
  const renderNode = (node: any, depth: number = 0) => {
    const Icon = node.icon;
    const isFolder = node.children;
    
    return (
      <div key={node.name} className={depth > 0 ? 'ml-5' : ''}>
        <div className="flex items-center gap-2 py-0.5">
          <Icon className={`w-4 h-4 ${node.color} flex-shrink-0`} />
          <span className={`font-mono text-sm ${isFolder ? 'text-white' : 'text-gray-400'}`}>
            {node.name}
          </span>
          {node.comment && (
            <span className="text-xs text-gray-500 hidden sm:inline">// {node.comment}</span>
          )}
        </div>
        {node.children && (
          <div className="border-l border-white/10 ml-2">
            {node.children.map((child: any) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="my-8 border border-primary/30 rounded-lg bg-black/40 p-5 notranslate" translate="no">
      <div className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
        <RootIcon className="w-4 h-4 text-primary" />
        <span>{rootName}</span>
        {label && <span className="text-xs text-muted-foreground ml-auto">{label}</span>}
      </div>
      <div className="space-y-0.5">
        {folders.map(folder => renderNode(folder))}
      </div>
    </div>
  );
};

export const ScrollableDiagram = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full max-w-full overflow-hidden ${className}`}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/80 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-primary/50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-black/80 border border-white/20 rounded-full text-white/70 hover:text-white hover:border-primary/50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
