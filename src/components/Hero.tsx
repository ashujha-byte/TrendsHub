import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div ref={ref} className="flex flex-col items-start text-left">
      <span 
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.9)'
        }}
      >
        {count.toLocaleString()}{suffix}
      </span>
      <span 
        className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-neutral-300 font-semibold"
        style={{
          textShadow: '0 2px 8px rgba(0,0,0,0.9)'
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const { setCurrentPage } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const y = useTransform(smoothProgress, [0, 1], [0, 80]);
  const opacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-start overflow-hidden bg-[#07080a]"
    >
      {/* Background Fashion Video (Full Clean View) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
        >
          <source src="https://www.pexels.com/download/video/34738710/" type="video/mp4" />
        </video>

        {/* Soft Vignette & Subtle Left-Fade taaki video bilkul clear rahe */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Main Content (Box/Card removed - Pure 3D Pop Typography) */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24"
      >
        <div className="max-w-2xl">
          
          {/* 3D Cutout Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-[76px] font-black text-white tracking-tight leading-[1.04]"
            style={{
              textShadow: '0 4px 8px rgba(0,0,0,0.7), 0 12px 30px rgba(0,0,0,0.9), 0 20px 50px rgba(0,0,0,0.95)'
            }}
          >
            Modern Luxury,Timeless Heritage. <br />
           
          </motion.h1>

          {/* High-Readability 3D Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-100 max-w-xl leading-relaxed font-medium"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 6px 18px rgba(0,0,0,0.95)'
            }}
          >
            Step into tailored perfection. From masterfully handcrafted ethnic ensembles 
            to contemporary silhouettes, we redefine festive elegance with pristine fabrics, 
            impeccable stitching, and unmatched everyday sophistication.
          </motion.p>

          {/* 3D Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => setCurrentPage('shop' as any)}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(255,90,0,0.45)] hover:shadow-[0_12px_35px_rgba(255,90,0,0.6)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden cursor-pointer border border-white/20"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <a
              href="#store-info"
              className="px-8 py-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-wider uppercase hover:border-white/40 hover:bg-black/80 hover:-translate-y-1 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
            >
              <MapPin className="w-4 h-4 text-[#FF9900]" />
              <span>Boutique Store</span>
            </a>
          </motion.div>

          {/* Clean Metric Statistics (Border Line with 3D Numbers) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-7 border-t border-white/20 grid grid-cols-3 gap-6 sm:gap-10"
          >
            <StatCounter value={4600} suffix="+" label="Clients Served" />
            <StatCounter value={250} suffix="+" label="Original Designs" />
            <StatCounter value={100} suffix="%" label="Pure Quality" />
          </motion.div>

        </div>
      </motion.div>

      {/* Modern Minimal Scroll Cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-80"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center p-1 shadow-lg">
          <div className="w-1 h-2 bg-[#FF9900] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}