import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star, ShoppingBag, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageIdx, setImageIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setImageIdx(0);
  };

  const wished = isWishlisted(product.id);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const whatsappMsg = `Hi Trends Hub! I'm interested in the ${product.name} (₹${product.price}). Is it available?`;

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="group relative bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#FF9900]/30 transition-colors"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
          <motion.img
            src={product.images[imageIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5" style={{ transform: 'translateZ(30px)' }}>
            {product.badge && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white rounded-full shadow-lg">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 text-[10px] font-bold bg-white/90 text-[#0d0f12] rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Heart className={`w-4 h-4 ${wished ? 'fill-[#FF3E00] text-[#FF3E00]' : 'text-white'}`} />
          </button>

          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" style={{ transform: 'translateZ(30px) translateX(-50%)' }}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setImageIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === imageIdx ? 'bg-[#FF9900] w-4' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover actions */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(50px)' }}>
            <button
              onClick={() => addToCart(product, product.sizes[0])}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3 h-3 fill-[#FF9900] text-[#FF9900]" />
            <span className="text-xs text-gray-400">{product.rating} ({product.review_count})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">₹{product.price}</span>
            {product.original_price && (
              <span className="text-xs text-gray-500 line-through">₹{product.original_price}</span>
            )}
          </div>

          <a
            href={`https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Buy via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
