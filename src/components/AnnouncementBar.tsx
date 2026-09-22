import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#FF9900] via-[#FF6600] to-[#FF3E00] text-white text-xs sm:text-sm">
      <motion.div
        className="flex items-center justify-center gap-2 py-2 px-4 whitespace-nowrap"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="font-medium tracking-wide">
          Special Festive Sale | 
        </span>
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="font-medium tracking-wide hidden sm:inline">
          COD Available | Premium Quality at Best Price
        </span>
      </motion.div>
    </div>
  );
}
