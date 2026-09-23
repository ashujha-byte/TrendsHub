import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// --- 1. SHARP 3D "TRENDS HUB" LOGO (NO GLOW) ---
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
          {/* Crown Gradient */}
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="45%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          {/* TRENDS Metallic Chrome Gradient */}
          <linearGradient id="trendsChrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* HUB Fire/Gold Gradient */}
          <linearGradient id="hubFire" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF500" />
            <stop offset="45%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#FF2E00" />
          </linearGradient>

          {/* Swoosh Gradient */}
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FF9900" />
            <stop offset="85%" stopColor="#FF3E00" />
            <stop offset="100%" stopColor="#FF3E00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 3D CROWN */}
        <g transform="translate(230, 4) scale(0.95)">
          <path
            d="M 12 55 L 0 20 L 25 35 L 45 5 L 65 35 L 90 20 L 78 55 Z"
            fill="url(#crownGrad)"
            stroke="#FFE082"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M 10 55 Q 45 61 80 55 L 77 62 Q 45 68 13 62 Z"
            fill="#E65100"
          />
          <circle cx="45" cy="5.5" r="3" fill="#FFF" />
          <circle cx="0" cy="20" r="2.5" fill="#FFE57F" />
          <circle cx="90" cy="20" r="2.5" fill="#FFE57F" />
        </g>

        {/* 3D DROP SHADOWS */}
        <text
          x="12"
          y="118"
          fill="#05070a"
          fontFamily="'Impact', 'Montserrat Black', sans-serif"
          fontWeight="900"
          fontSize="84"
          letterSpacing="1"
          fontStyle="italic"
        >
          TRENDS
        </text>

        <text
          x="332"
          y="118"
          fill="#450a00"
          fontFamily="'Impact', 'Montserrat Black', sans-serif"
          fontWeight="900"
          fontSize="88"
          letterSpacing="2"
          fontStyle="italic"
        >
          HUB
        </text>

        {/* TRENDS (Chrome Metallic) */}
        <text
          x="8"
          y="114"
          fill="url(#trendsChrome)"
          stroke="#1e293b"
          strokeWidth="2.5"
          fontFamily="'Impact', 'Montserrat Black', sans-serif"
          fontWeight="900"
          fontSize="84"
          letterSpacing="1"
          fontStyle="italic"
        >
          TRENDS
        </text>

        {/* HUB (Fire Solid 3D - NO GLOW) */}
        <text
          x="328"
          y="114"
          fill="url(#hubFire)"
          stroke="#9a2c02"
          strokeWidth="2.5"
          fontFamily="'Impact', 'Montserrat Black', sans-serif"
          fontWeight="900"
          fontSize="88"
          letterSpacing="2"
          fontStyle="italic"
        >
          HUB
        </text>

        {/* Crisp Swoosh */}
        <path
          d="M 130 134 Q 300 120 480 96"
          stroke="url(#swooshGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 180 137 Q 320 126 440 108"
          stroke="#FFD54F"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

// --- 2. CLEAN NAVBAR (RESPONSIVE FOR MOBILE & DESKTOP) ---
export function Navbar() {
  const { cartCount, wishlist, setCurrentPage, currentPage, setCartOpen, setAuthOpen, session, setSearchOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0c10]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.8)]'
          : 'bg-[#0a0c10] border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 sm:h-20">
          
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 cursor-pointer focus:outline-none py-1"
            aria-label="Trends Hub"
          >
            <TrendsHubLogo className="h-9 sm:h-12 lg:h-14 w-auto" />
          </motion.button>

          {/* Large Center Search Bar (Kewal Desktop/Tablet par dikhega) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl relative items-center"
          >
            <div className="relative w-full flex items-center group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full bg-[#161a22] text-white text-sm placeholder:text-gray-400 pl-4 pr-14 py-2.5 rounded-l-lg border border-r-0 border-white/15 focus:outline-none focus:border-[#FF9900] transition-colors"
              />
              <button
                type="submit"
                onClick={() => setSearchOpen(true)}
                className="h-[42px] px-5 bg-gradient-to-r from-[#FF9900] to-[#FF3E00] hover:brightness-110 text-white rounded-r-lg flex items-center justify-center transition-all shadow-md shadow-orange-950/40"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-[#FF9900]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#FF9900] to-[#FF3E00] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile Search Icon Button (Ye search modal trigger karega) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-[#FF9900] hover:bg-white/[0.04] transition-colors"
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
              className="p-2 sm:p-2.5 rounded-xl text-gray-300 hover:text-[#FF9900] hover:bg-white/[0.04] transition-all"
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
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-300 hover:text-[#FF9900] hover:bg-white/[0.04] transition-all"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF3E00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF9900]/15 to-[#FF3E00]/15 border border-[#FF9900]/30 hover:border-[#FF9900] text-gray-200 transition-all"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
              {cartCount > 0 && (
                <span className="bg-[#FF3E00] text-white text-xs font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[#0e1117] border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-[#FF9900]/20 to-[#FF3E00]/20 text-[#FF9900] border-l-4 border-[#FF9900]'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
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
  );
}