import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  date: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_80%] lg:flex-[0_0_60%]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: selectedIndex === index ? 1 : 0.25, 
                  y: 0,
                  scale: selectedIndex === index ? 1 : 0.92,
                  filter: selectedIndex === index ? 'blur(0px)' : 'blur(2px)'
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`relative p-8 md:p-10 rounded-lg border transition-all duration-500 ${
                  selectedIndex === index
                    ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/40 shadow-[0_0_40px_rgba(236,72,153,0.2)]'
                    : 'bg-black/40 border-white/10'
                }`}
              >
                <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/30" />
                
                <blockquote className="relative z-10 mb-6">
                  <p className="text-lg md:text-xl leading-relaxed text-[#e5e7eb] text-solid italic pl-8">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                <div className="flex items-center gap-4 pl-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-display font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary font-mono">
                      {testimonial.company} • {testimonial.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-10 p-3 bg-black/80 border border-white/20 rounded-full hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30"
        data-testid="button-testimonial-prev"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-10 p-3 bg-black/80 border border-white/20 rounded-full hover:border-primary/50 hover:bg-primary/10 transition-all disabled:opacity-30"
        data-testid="button-testimonial-next"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? 'bg-primary w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            data-testid={`button-testimonial-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
