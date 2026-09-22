import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, TrendingUp, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';

function StatCounter({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: React.ReactNode }) {
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
    <div ref={ref} className="flex flex-col items-center sm:items-start">
      <div className="flex items-center gap-2 mb-2 text-[#FF9900]">
        {icon}
        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
          {count.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium text-center sm:text-left">{label}</div>
    </div>
  );
}

export function Hero() {
  const { setCurrentPage } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const y = useTransform(smoothProgress, [0, 1], [0, 100]);
  const opacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07080a]"
    >
      {/* Background Fashion Video with Luxury Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.42] contrast-[1.12]"
        >
          <source src="https://www.pexels.com/download/video/34738710/" type="video/mp4" />
        </video>

        {/* Ambient Dark Shadows & Spotlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/50 to-[#07080a]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/90 via-[#07080a]/40 to-transparent" />
        <div className="absolute -top-32 left-10 w-[550px] h-[550px] bg-gradient-to-br from-[#FF9900]/15 to-transparent rounded-full blur-[140px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-3xl">
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold text-white tracking-tight leading-[1.06] drop-shadow-2xl"
          >
            Modern Luxury, <br />
            <span className="bg-gradient-to-r from-[#FFF5D0] via-[#FFB84C] to-[#FF5E00] bg-clip-text text-transparent">
              Timeless Heritage.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal drop-shadow-md"
          >
            Step into tailored perfection. From masterfully handcrafted ethnic ensembles 
            to contemporary silhouettes, we redefine festive elegance with pristine fabrics, 
            impeccable stitching, and unmatched everyday sophistication.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => setCurrentPage('shop' as any)}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_10px_28px_rgba(255,100,0,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white/90" />
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <a
              href="#store-info"
              className="px-8 py-4 rounded-xl bg-neutral-950/70 backdrop-blur-xl border border-neutral-700/80 text-neutral-200 font-semibold text-sm tracking-wider uppercase hover:border-neutral-500 hover:text-white hover:bg-neutral-900 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
            >
              <MapPin className="w-4 h-4 text-[#FF9900]" />
              <span>Boutique Store</span>
            </a>
          </motion.div>

          {/* Metric Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 sm:gap-12"
          >
            <StatCounter value={4600} suffix="+" label="Clients Served" icon={<Sparkles className="w-4 h-4" />} />
            <StatCounter value={250} suffix="+" label="Original Designs" icon={<TrendingUp className="w-4 h-4" />} />
            <StatCounter value={100} suffix="%" label="Pure Craftsmanship" icon={<ShieldCheck className="w-4 h-4" />} />
          </motion.div>

        </div>
      </motion.div>

      {/* Modern Minimal Scroll Cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60"
      >
        <div className="w-5 h-8 rounded-full border border-neutral-700 flex justify-center p-1">
          <div className="w-1 h-2 bg-[#FF9900] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}