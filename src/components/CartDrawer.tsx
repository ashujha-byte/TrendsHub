import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, Check, Truck, Wallet } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function CartDrawer() {
  const {
    cart, cartOpen, setCartOpen, updateCartQuantity, removeFromCart,
    cartTotal, couponCode, couponDiscount, applyCoupon, removeCoupon, isCOD, setIsCOD,
    session, setAuthOpen, setCurrentPage, clearCart,
  } = useApp();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const discountAmount = Math.round(cartTotal * couponDiscount);
  const shipping = cartTotal > 999 ? 0 : 49;
  const finalTotal = cartTotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponError('');
      setCouponApplied(true);
      setTimeout(() => setCouponApplied(false), 2000);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (!session) {
      setCartOpen(false);
      setAuthOpen(true);
      return;
    }
    setCartOpen(false);
    setCurrentPage('profile');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full sm:w-[440px] bg-[#0d0f12] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
                <h2 className="text-lg font-bold text-white">Your Cart</h2>
                <span className="text-sm text-gray-500">({cart.length})</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg font-medium">Your cart is empty</p>
                <p className="text-gray-600 text-sm mt-1">Discover our trending collection</p>
                <button
                  onClick={() => { setCartOpen(false); setCurrentPage('shop'); }}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                      <p className="text-sm font-bold text-[#FF9900] mt-1">₹{item.product.price}</p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-400"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-400"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="p-1.5 text-gray-500 hover:text-[#FF3E00] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="p-4 border-t border-white/5 space-y-3">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#FF9900]/10 border border-[#FF9900]/20 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#FF9900]" />
                      <span className="text-sm text-white font-medium">{couponCode}</span>
                      <span className="text-xs text-[#FF9900]">-{Math.round(couponDiscount * 100)}% off</span>
                    </div>
                    <button onClick={() => { removeCoupon(); setCouponInput(''); }} className="text-gray-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <input
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                        placeholder="Coupon code"
                        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none py-3"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors"
                    >
                      {couponApplied ? <Check className="w-4 h-4 text-[#FF9900]" /> : 'Apply'}
                    </button>
                  </div>
                )}
                {couponError && <p className="text-xs text-[#FF3E00]">{couponError}</p>}
                <p className="text-xs text-gray-600">Try: FESTIVE10, TRENDS20, NEWUSER</p>

                {/* Payment method */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCOD(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                      isCOD ? 'bg-[#FF9900]/15 border border-[#FF9900]/30 text-[#FF9900]' : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    COD
                  </button>
                  <button
                    onClick={() => setIsCOD(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                      !isCOD ? 'bg-[#FF9900]/15 border border-[#FF9900]/30 text-[#FF9900]' : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    Online
                  </button>
                </div>

                {/* Summary */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">₹{cartTotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Discount</span>
                      <span className="text-[#FF9900]">-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-white/5">
                    <span className="text-white">Total</span>
                    <span className="text-[#FF9900]">₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all"
                >
                  {session ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                </button>
              </div>
            </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
