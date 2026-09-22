import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, MessageCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const [size, setSize] = useState<string>('');
  const [imageIdx, setImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0]);
      setImageIdx(0);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMsg = `Hi Trends Hub! I'm interested in the ${product.name} (Size: ${size}, ₹${product.price}). Is it available?`;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#15181d] border border-white/10 rounded-3xl shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              {/* Image carousel */}
              <div className="relative aspect-[3/4] md:aspect-auto bg-[#0d0f12]">
                <img src={product.images[imageIdx]} alt={product.name} className="w-full h-full object-cover" />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImageIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setImageIdx((i) => (i + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === imageIdx ? 'bg-[#FF9900] w-4' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                    <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                  </div>
                  <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-[#FF9900] text-[#FF9900]' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{product.rating} ({product.review_count} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-3xl font-bold text-white">₹{product.price}</span>
                  {product.original_price && (
                    <>
                      <span className="text-lg text-gray-500 line-through">₹{product.original_price}</span>
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#FF3E00]/20 text-[#FF9900] rounded-full">{discount}% OFF</span>
                    </>
                  )}
                </div>

                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{product.description}</p>

                {/* Size selector */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all ${
                          size === s
                            ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white shadow-lg shadow-[#FF9900]/20'
                            : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#FF9900]/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-6 space-y-3">
                  <button
                    onClick={handleAdd}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all"
                  >
                    {added ? <><Check className="w-4 h-4" /> Added to Cart!</> : <><ShoppingBag className="w-4 h-4" /> Add to Cart</>}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-[#FF3E00] text-[#FF3E00]' : ''}`} />
                      {isWishlisted(product.id) ? 'Wishlisted' : 'Wishlist'}
                    </button>
                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-gray-500">
                  <span>COD Available</span>
                  <span>•</span>
                  <span>Premium Quality</span>
                  <span>•</span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
