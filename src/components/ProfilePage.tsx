import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Heart, LogOut, Plus, Trash2, Check, ShoppingBag, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import type { Product, Address, OrderRecord } from '@/types';

export function ProfilePage() {
  const { session, setCurrentPage, setAuthOpen, wishlist, toggleWishlist } = useApp();
  const [tab, setTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [profile, setProfile] = useState<{ name: string; phone: string } | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ label: '', full_name: '', phone: '', address_line: '', city: 'Sitamarhi', state: 'Bihar', pincode: '' });

  useEffect(() => {
    if (!session?.user) return;
    async function loadData() {
      const userId = session!.user.id;

      const { data: p } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (p) setProfile({ name: p.name || '', phone: p.phone || '' });

      const { data: o } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (o) setOrders(o as OrderRecord[]);

      const { data: a } = await supabase.from('addresses').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (a) setAddresses(a as Address[]);

      if (wishlist.length > 0) {
        const { data: w } = await supabase.from('products').select('*').in('id', wishlist);
        if (w) setWishlistedProducts(w as Product[]);
      } else {
        setWishlistedProducts([]);
      }
    }
    loadData();
  }, [session, wishlist]);

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-400 text-lg mb-4">Please sign in to view your profile</p>
        <button
          onClick={() => setAuthOpen(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-sm font-semibold"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
  };

  const handleAddAddress = async () => {
    if (!session?.user || !addrForm.label || !addrForm.full_name || !addrForm.address_line) return;
    const { data } = await supabase.from('addresses').insert({
      ...addrForm,
      user_id: session.user.id,
    }).select('*').single();
    if (data) {
      setAddresses((prev) => [data as Address, ...prev]);
      setAddrForm({ label: '', full_name: '', phone: '', address_line: '', city: 'Sitamarhi', state: 'Bihar', pincode: '' });
      setShowAddrForm(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    await supabase.from('addresses').delete().eq('id', id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const tabButton = (label: string, icon: React.ReactNode, key: 'orders' | 'addresses' | 'wishlist', count?: number) => (
    <button
      onClick={() => setTab(key)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        tab === key ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white' : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#FF9900]/30'
      }`}
    >
      {icon}
      {label}
      {count !== undefined && count > 0 && (
        <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-xs">{count}</span>
      )}
    </button>
  );

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF9900] to-[#FF3E00] flex items-center justify-center text-white text-xl font-bold">
              {(profile?.name || session.user.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{profile?.name || 'Trends Hub Customer'}</h1>
              <p className="text-sm text-gray-400">{profile?.phone || session.user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabButton('Orders', <Package className="w-4 h-4" />, 'orders', orders.length)}
          {tabButton('Addresses', <MapPin className="w-4 h-4" />, 'addresses', addresses.length)}
          {tabButton('Wishlist', <Heart className="w-4 h-4" />, 'wishlist', wishlistedProducts.length)}
        </div>

        {/* Content */}
        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No orders yet</p>
                <button onClick={() => setCurrentPage('shop')} className="mt-4 text-[#FF9900] text-sm hover:underline">
                  Start shopping
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-gray-600">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF9900]/10 text-[#FF9900] text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        {order.status}
                      </span>
                      <span className="text-lg font-bold text-white">₹{order.total}</span>
                    </div>
                  </div>
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="space-y-2">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          {item.product_image && (
                            <img src={item.product_image} alt={item.product_name} className="w-12 h-14 rounded-lg object-cover" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-white">{item.product_name}</p>
                            <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm text-gray-400">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'addresses' && (
          <div className="space-y-4">
            {addresses.length === 0 && !showAddrForm && (
              <div className="text-center py-16">
                <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No saved addresses</p>
              </div>
            )}
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{addr.label}</span>
                    {addr.is_default && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FF9900]/10 text-[#FF9900] text-xs">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">{addr.full_name} • {addr.phone}</p>
                  <p className="text-sm text-gray-400 mt-1">{addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}</p>
                </div>
                <button onClick={() => handleDeleteAddress(addr.id)} className="p-2 text-gray-500 hover:text-[#FF3E00] transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {showAddrForm ? (
              <div className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={addrForm.label} onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })} placeholder="Label (Home, Office)" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                  <input value={addrForm.full_name} onChange={(e) => setAddrForm({ ...addrForm, full_name: e.target.value })} placeholder="Full Name" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                  <input value={addrForm.phone} onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })} placeholder="Phone" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                  <input value={addrForm.pincode} onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })} placeholder="Pincode" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                </div>
                <input value={addrForm.address_line} onChange={(e) => setAddrForm({ ...addrForm, address_line: e.target.value })} placeholder="Address Line" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} placeholder="City" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                  <input value={addrForm.state} onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })} placeholder="State" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-[#FF9900]/50" />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddAddress} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-sm font-semibold flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Save Address
                  </button>
                  <button onClick={() => setShowAddrForm(false)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddrForm(true)}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 text-gray-400 text-sm font-medium flex items-center justify-center gap-2 hover:border-[#FF9900]/30 hover:text-[#FF9900] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Address
              </button>
            )}
          </div>
        )}

        {tab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Your wishlist is empty</p>
                <button onClick={() => setCurrentPage('shop')} className="mt-4 text-[#FF9900] text-sm hover:underline flex items-center justify-center gap-1 mx-auto">
                  <ShoppingBag className="w-4 h-4" /> Browse collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
