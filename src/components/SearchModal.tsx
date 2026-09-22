import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

export function SearchModal() {
  const { searchOpen, setSearchOpen, setCurrentPage, setSelectedCategory } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(6);
      if (data) setResults(data as Product[]);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#15181d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-[#FF9900]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for kurtis, ethnic sets, dupattas..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setSelectedCategory('All');
                      setCurrentPage('shop');
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.category}</p>
                    </div>
                    <span className="text-sm font-bold text-[#FF9900]">₹{p.price}</span>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div className="px-5 py-8 text-center text-gray-500 text-sm">
                No products found for &quot;{query}&quot;
              </div>
            )}

            {!query.trim() && (
              <div className="px-5 py-6">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Festive Kurti', 'Daily Wear', 'Dupatta Set', 'Red Kurti', 'Cotton'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 text-xs text-gray-300 bg-white/5 hover:bg-[#FF9900]/20 hover:text-[#FF9900] rounded-full transition-colors border border-white/5"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
