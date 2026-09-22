import { MapPin, Clock, Phone, Navigation, Instagram, Facebook, Mail, ShieldCheck, Sparkles, Award } from 'lucide-react';

// --- EXACT 3D CROWN LOGO FOR FOOTER ---
function FooterLogo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible"
      >
        <defs>
          <linearGradient id="footerCrownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="45%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          <linearGradient id="footerTrendsChrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="footerHubFire" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF500" />
            <stop offset="45%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#FF2E00" />
          </linearGradient>

          <linearGradient id="footerSwooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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
            fill="url(#footerCrownGrad)"
            stroke="#FFE082"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M 10 55 Q 45 61 80 55 L 77 62 Q 45 68 13 62 Z" fill="#E65100" />
          <circle cx="45" cy="5.5" r="3" fill="#FFF" />
          <circle cx="0" cy="20" r="2.5" fill="#FFE57F" />
          <circle cx="90" cy="20" r="2.5" fill="#FFE57F" />
        </g>

        {/* 3D DROP SHADOWS */}
        <text
          x="12"
          y="118"
          fill="#000000"
          fontFamily="'Impact', 'Arial Black', sans-serif"
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
          fill="#3b0800"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="88"
          letterSpacing="2"
          fontStyle="italic"
        >
          HUB
        </text>

        {/* TRENDS (Silver Metallic) */}
        <text
          x="8"
          y="114"
          fill="url(#footerTrendsChrome)"
          stroke="#1e293b"
          strokeWidth="2.5"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="84"
          letterSpacing="1"
          fontStyle="italic"
        >
          TRENDS
        </text>

        {/* HUB (Fire Gradient) */}
        <text
          x="328"
          y="114"
          fill="url(#footerHubFire)"
          stroke="#9a2c02"
          strokeWidth="2.5"
          fontFamily="'Impact', 'Arial Black', sans-serif"
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
          stroke="url(#footerSwooshGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// --- BOUTIQUE STORE INFO SECTION ---
export function StoreInfo() {
  return (
    <section id="store-info" className="py-20 relative overflow-hidden bg-[#07080a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#FF9900] mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Experience Store
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Visit Trends Hub Sitamarhi
          </h2>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Experience our premium ethnic wear, festive kurtis, and contemporary designer collections in person.
          </p>
        </div>

        {/* 2-Column Store Details & Compact Map */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Boutique Narrative & Timings */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF9900]" />
                Sitamarhi&apos;s Signature Fashion Destination
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Trends Hub brings refined royal fabrics, intricate hand-embroidery, and trendsetting festive silhouettes. Visit our boutique store to explore the freshest arrivals and customized tailored fittings.
              </p>

              <div className="flex flex-wrap gap-2.5 text-xs text-neutral-300 pt-1">
                <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Authentic Fabrics
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF9900]" /> Tailored Perfect Fit
                </span>
              </div>
            </div>

            {/* Store Contact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <MapPin className="w-4 h-4 text-[#FF9900] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Address</p>
                <p className="text-xs text-neutral-200 mt-0.5 font-medium">Sahu Chowk, Dumra Rd, Sitamarhi</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <Clock className="w-4 h-4 text-[#FF9900] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Timings</p>
                <p className="text-xs text-neutral-200 mt-0.5 font-medium">10:00 AM - 8:30 PM (Daily)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <Phone className="w-4 h-4 text-[#FF9900] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Contact</p>
                <p className="text-xs text-neutral-200 mt-0.5 font-medium">+91 99999 99999</p>
              </div>
            </div>
          </div>

          {/* Right: Small Google Map */}
          <div className="lg:col-span-5">
            <div className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 shadow-2xl">
              <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-neutral-950">
                <iframe
                  src="https://maps.google.com/maps?q=Sahu+Chowk+Dumra+Road+Sitamarhi+Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Store Location"
                />
              </div>

              <div className="pt-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sahu+Chowk+Dumra+Road+Sitamarhi+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- DUMMY WHATSAPP BUBBLE (Prevents App.tsx from crashing) ---
export function WhatsAppBubble() {
  return null;
}

// --- FOOTER WITH 3D LOGO & SOCIAL MEDIA (INSTA, FB, EMAIL) ---
export function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-neutral-800/80 pt-16 pb-8 text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col with 3D Crown Logo */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <FooterLogo className="h-12 w-auto" />
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Sitamarhi&apos;s trending fashion store. Artisanal kurtis, ethnic celebration sets, and contemporary couture.
            </p>

            {/* Social Media Links: Instagram, Facebook, Email */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#FF9900] hover:border-[#FF9900]/50 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="mailto:support@trendshub.com"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#FF3E00] hover:border-[#FF3E00]/50 transition-all cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Women&apos;s Festive Sets</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Daily Wear Kurtis</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Men&apos;s Ethnic Wear</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Dupatta Sets</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Customer Policies</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Shipping &amp; Delivery</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Return &amp; Exchange</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Boutique Visit</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF9900] flex-shrink-0 mt-0.5" />
                <span>Sahu Chowk, Dumra Road, Sitamarhi, Bihar 843301</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FF9900] flex-shrink-0" />
                <span>10:00 AM - 8:30 PM (Daily)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF9900] flex-shrink-0" />
                <span>+91 99999 99999</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>&copy; 2026 Trends Hub - Sitamarhi. All rights reserved.</p>
          <div className="flex items-center gap-3 font-medium text-neutral-400">
            <span>Cash on Delivery</span>
            <span>&bull;</span>
            <span>Pure Handpicked Fabrics</span>
            <span>&bull;</span>
            <span>Fast Home Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}