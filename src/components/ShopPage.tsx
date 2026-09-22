import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, TrendingUp, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import type { Product, SortOption } from '@/types';

const CATEGORIES = ['All', 'Daily Wear Kurtis', 'Festive Kurti Sets', 'Dupatta Sets'] as const;
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export function ShopPage() {
  const { selectedCategory, setSelectedCategory } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
  const [sort, setSort] = useState<SortOption>('trending');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) { console.error(error); }
      if (data) setProducts(data as Product[]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'trending':
      default:
        result.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.review_count - a.review_count;
        });
    }

    return result;
  }, [products, selectedCategory, selectedSizes, priceRange, sort]);

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-white"
          >
            All Collections
          </motion.h1>
          <p className="text-gray-400 mt-2 text-sm">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white shadow-lg shadow-[#FF9900]/20'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#FF9900]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Filter toggle */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-[#FF9900]/30 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {selectedSizes.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF9900] text-white text-xs flex items-center justify-center">{selectedSizes.length}</span>
            )}
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm outline-none cursor-pointer hover:border-[#FF9900]/30 transition-colors"
            >
              <option value="trending">Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 space-y-5">
              {/* Sizes */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all ${
                        selectedSizes.includes(s)
                          ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white'
                          : 'bg-white/5 text-gray-300 border border-white/10 hover:border-[#FF9900]/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={4000}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="flex-1 accent-[#FF9900]"
                  />
                </div>
              </div>

              {/* Clear */}
              {(selectedSizes.length > 0 || priceRange[1] < 4000) && (
                <button
                  onClick={() => { setSelectedSizes([]); setPriceRange([0, 4000]); }}
                  className="text-xs text-[#FF9900] hover:text-[#FF3E00] transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products match your filters.</p>
            <button
              onClick={() => { setSelectedSizes([]); setPriceRange([0, 4000]); setSelectedCategory('All'); }}
              className="mt-4 text-[#FF9900] text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={p} onQuickView={setQuickView} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
