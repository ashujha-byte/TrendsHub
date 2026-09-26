import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#1c120c] via-[#2d1b11] to-[#1c120c] text-[#e0a96d] text-xs sm:text-sm">
      <motion.div
        className="flex items-center justify-center gap-2 py-2 px-4 whitespace-nowrap"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#d4af37]" />
        <span className="font-semibold tracking-wider text-stone-200">
          Special Festive Sale | Sitamarhi Boutique
        </span>
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#d4af37]" />
        <span className="font-medium tracking-wide text-[#e0a96d] hidden sm:inline">
          COD Available | Premium Quality at Best Price
        </span>
      </motion.div>
    </div>
  );
}