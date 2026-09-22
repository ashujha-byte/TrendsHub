export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="30%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#e8e8e8" />
          <stop offset="70%" stopColor="#a8a8a8" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="40%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FF3E00" />
        </linearGradient>
        <filter id="textShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FF9900" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Crown */}
      <g transform="translate(195, 2)">
        <path d="M2 18 L8 4 L14 12 L20 2 L26 12 L32 4 L38 18 Z" fill="url(#orangeGrad)" />
        <rect x="2" y="18" width="36" height="3" rx="1" fill="url(#orangeGrad)" />
        <circle cx="8" cy="4" r="2" fill="#FFD700" />
        <circle cx="20" cy="2" r="2" fill="#FFD700" />
        <circle cx="32" cy="4" r="2" fill="#FFD700" />
      </g>
      {/* TRENDS - metallic silver, slanted */}
      <text
        x="4"
        y="52"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontSize="28"
        fontWeight="900"
        fontStyle="italic"
        fill="url(#silverGrad)"
        transform="skewX(-8)"
        letterSpacing="1"
      >
        TRENDS
      </text>
      {/* HUB - bold fiery orange-yellow */}
      <text
        x="178"
        y="52"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontSize="28"
        fontWeight="900"
        fill="url(#orangeGrad)"
        filter="url(#textShadow)"
        letterSpacing="0"
      >
        HUB
      </text>
      {/* Tagline */}
      <text
        x="6"
        y="68"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fontWeight="400"
        fill="#888"
        letterSpacing="2"
      >
        SITAMARHI&apos;S TRENDING FASHION STORE
      </text>
    </svg>
  );
}
