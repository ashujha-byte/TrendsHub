import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AnnouncementBar } from './AnnouncementBar';

// --- 1. LUXURY ROYAL BROWN & GOLD LOGO ---
export function TrendsHubLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible"
      >
        <defs>
          <linearGradient id="crownGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="trendsMetallic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="hubMocha" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          <linearGradient id="swooshBrown" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 3D CROWN */}
        <g transform="translate(230, 4) scale(0.95)">
          <path
            d="M 12 55 L 0 20 L 25 35 L 45 5 L 65 35 L 90 20 L 78 55 Z"
            fill="url(#crownGold)"
            stroke="#FDE68A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M 10 55 Q 45 61 80 55 L 77 62 Q 45 68 13 62 Z"
            fill="#451A03"
          />
          <circle cx="45" cy="5.5" r="3" fill="#FFF" />
          <circle cx="0" cy="20" r="2.5" fill="#FDE68A" />
          <circle cx="90" cy="20" r="2.5" fill="#FDE68A" />
        </g>

        {/* 3D DROP SHADOWS */}
        <text x="12" y="118" fill="#000000" fontFamily="'Impact', 'Montserrat Black', sans-serif" fontWeight="900" fontSize="84" letterSpacing="1" fontStyle="italic">
          TRENDS
        </text>
        <text x="332" y="118" fill="#1C0A00" fontFamily="'Impact', 'Montserrat Black', sans-serif" fontWeight="900" fontSize="88" letterSpacing="2" fontStyle="italic">
          HUB
        </text>

        {/* FOREGROUND TEXT */}
        <text x="8" y="114" fill="url(#trendsMetallic)" stroke="#0F172A" strokeWidth="2.2" fontFamily="'Impact', 'Montserrat Black', sans-serif" fontWeight="900" fontSize="84" letterSpacing="1" fontStyle="italic">
          TRENDS
        </text>
        <text x="328" y="114" fill="url(#hubMocha)" stroke="#271004" strokeWidth="2.5" fontFamily="'Impact', 'Montserrat Black', sans-serif" fontWeight="900" fontSize="88" letterSpacing="2" fontStyle="italic">
          HUB
        </text>

        {/* SWOOSH */}
        <path d="M 130 134 Q 300 120 480 96" stroke="url(#swooshBrown)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 180 137 Q 320 126 440 108" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}

// --- 2. HEADER WITHOUT ANY BOTTOM BORDER/LINE ---
export function Navbar() {
  const { cartCount, wishlist, setCurrentPage, currentPage, setCartOpen, setAuthOpen, session, setSearchOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop Collection', id: 'shop' },
    { label: 'About', id: 'about' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId as any);
    setMobileMenu(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full border-none">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <header
        className={`w-full border-none transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-[#0c0a09]/95 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-[#120d09]/80 via-[#0c0a09]/40 to-transparent backdrop-blur-[3px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 sm:h-20">
            
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 cursor-pointer focus:outline-none py-1"
              aria-label="Trends Hub"
            >
              <TrendsHubLogo className="h-9 sm:h-12 lg:h-14 w-auto drop-shadow-md" />
            </motion.button>

            {/* Desktop Search */}
           <form
  onSubmit={handleSearchSubmit}
  className="hidden md:flex flex-1 max-w-xl relative items-center select-none"
>
  {/* Outer 3D Layer with Ambient Glow & Embossed Bevel */}
  <div className="relative w-full flex items-center rounded-2xl p-[1.5px] bg-gradient-to-b from-[#784d2b]/60 via-[#2d1b11]/80 to-[#120a06] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,225,180,0.15)] group transition-all duration-300 hover:shadow-[0_12px_30px_-4px_rgba(197,138,82,0.25)]">
    
    {/* Inner Recessed Container */}
    <div className="relative w-full flex items-center rounded-[14px] bg-gradient-to-b from-[#110d0a]/95 via-[#18110b]/90 to-[#140e09]/95 backdrop-blur-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* Subtle Search Lead Icon */}
      <div className="pl-4 pr-1 text-[#a86535] group-focus-within:text-[#e0a96d] transition-colors pointer-events-none">
        <Search className="w-4 h-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
      </div>

      {/* 3D Inset Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for luxury Kurtis, ethnic sets..."
        className="w-full bg-transparent text-stone-100 text-sm placeholder:text-stone-500 pl-2 pr-20 py-2.5 focus:outline-none tracking-wide"
      />

      {/* Decorative Keyboard Shortcut Badge (Ctrl + K) */}
      <div className="hidden lg:flex items-center gap-1 mr-2 px-2 py-0.5 rounded-md bg-[#241710]/80 border border-[#4a2e1d]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] pointer-events-none">
        <span className="text-[10px] font-mono text-[#c58a52]/80">⌘K</span>
      </div>

      {/* 3D Elevated Pill Button */}
      <button
        type="submit"
        onClick={() => setSearchOpen(true)}
        className="relative my-1 mr-1 h-9 px-5 rounded-xl bg-gradient-to-b from-[#d49757] via-[#a86535] to-[#6d3916] text-[#0a0705] font-black tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4)] active:scale-[0.97] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] hover:brightness-110 transition-all cursor-pointer"
        aria-label="Search"
      >
        <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">SEARCH</span>
      </button>

    </div>
  </div>
</form>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-[#e0a96d]' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#c58a52] to-[#8c5028] rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-stone-300 hover:text-[#e0a96d] hover:bg-stone-800/40 transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Profile */}
              <button
                onClick={() => {
                  if (!session) { setAuthOpen(true); return; }
                  handleNavClick('profile');
                }}
                className="p-2 sm:p-2.5 rounded-xl text-stone-300 hover:text-[#e0a96d] hover:bg-[#261912]/50 transition-all"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  if (!session) { setAuthOpen(true); return; }
                  handleNavClick('profile');
                }}
                className="relative p-2 sm:p-2.5 rounded-xl text-stone-300 hover:text-[#e0a96d] hover:bg-[#261912]/50 transition-all"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8c5028] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#291a12] to-[#3a251a] border border-[#523424] hover:border-[#a86535] text-stone-100 transition-all shadow-md"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#e0a96d]" />
                {cartCount > 0 && (
                  <span className="bg-[#a86535] text-black text-xs font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden p-2 text-stone-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-[#120d09]/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === item.id
                        ? 'bg-[#291a12] text-[#e0a96d]'
                        : 'text-stone-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}