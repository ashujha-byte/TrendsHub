import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star, ShoppingCart, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageIdx, setImageIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -7, y: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setImageIdx(0);
  };

  const wished = isWishlisted(product.id);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  // Flipkart Style Add To Cart Handler
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'M');
  };

  // Flipkart Style Direct Buy Now Handler
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'M');
    setCartOpen(true);
  };

  return (
    <div style={{ perspective: '1200px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="group relative bg-[#11141a] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden hover:shadow-[0_16px_35px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col h-full"
      >
        {/* Product Image */}
        <div 
          onClick={() => onQuickView(product)}
          className="relative aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-900" 
          style={{ transform: 'translateZ(25px)' }}
        >
          <img
            src={product.images?.[imageIdx] || (product as any).image_url}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-black bg-[#388e3c] text-white rounded shadow">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition-all z-10 cursor-pointer shadow-md hover:scale-110"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wished ? 'fill-[#ff3e00] text-[#ff3e00]' : 'text-white'}`} />
          </button>

          {/* Quick Preview Hover */}
          <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hidden sm:flex justify-center z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white flex items-center justify-center gap-1 hover:bg-neutral-800"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Product Info & Amazon/Flipkart Buttons */}
        <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              {product.category}
            </span>

            <h3 
              onClick={() => onQuickView(product)}
              className="text-sm font-semibold text-white mt-0.5 line-clamp-1 cursor-pointer hover:text-[#FF9900] transition-colors"
            >
              {product.name}
            </h3>

            {/* Rating Tag (Flipkart Style Green Badge) */}
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#388e3c] text-white text-[10px] font-bold leading-none">
                {product.rating || '4.8'} <Star className="w-2.5 h-2.5 fill-current" />
              </span>
              <span className="text-xs text-neutral-400">({product.review_count || 120})</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-black text-white">₹{product.price.toLocaleString()}</span>
              {product.original_price && (
                <span className="text-xs text-neutral-500 line-through">₹{product.original_price.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* FLIPKART & AMAZON STYLE 2 ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 mt-auto">
            {/* 1. Add To Cart (Flipkart Golden/Yellow button) */}
            <button
              onClick={handleAddToCart}
              className="py-2 px-1 rounded-lg bg-[#ff9f00] hover:bg-[#f39700] active:scale-95 text-black font-bold text-xs flex items-center justify-center gap-1 shadow transition-all cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 fill-current" />
              <span>Add to Cart</span>
            </button>

            {/* 2. Buy Now (Amazon/Flipkart Orange/Red button) */}
            <button
              onClick={handleBuyNow}
              className="py-2 px-1 rounded-lg bg-[#fb641b] hover:bg-[#e85b17] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1 shadow transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}