import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import type { Product, SortOption } from '@/types';

// Department & Sub-category mapping
const DEPARTMENTS = {
  All: ['All Categories'],
  Women: ['All Women', 'Daily Wear Kurtis', 'Festive Kurti Sets', 'Dupatta Sets', 'Sarees', 'Lehengas'],
  Men: ['All Men', 'Kurtas & Pyjamas', 'Nehru Jackets', 'Formal Shirts', 'T-Shirts & Polos', 'Denims'],
  Kids: ['All Kids', 'Boys Ethnic', 'Girls Frocks & Sets', 'Party Wear', 'Casual Wear'],
} as const;

type DepartmentType = keyof typeof DEPARTMENTS;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export function ShopPage() {
  const { selectedCategory, setSelectedCategory } = useApp();
  const [selectedDept, setSelectedDept] = useState<DepartmentType>('All');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('All Categories');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [sort, setSort] = useState<SortOption>('trending');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error(error);
      if (data) setProducts(data as Product[]);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Department switch handler
  const handleDeptChange = (dept: DepartmentType) => {
    setSelectedDept(dept);
    const defaultSub = DEPARTMENTS[dept][0];
    setSelectedSubCat(defaultSub);
    setSelectedCategory(defaultSub.startsWith('All') ? 'All' : defaultSub);
  };

  // Sub-category switch handler
  const handleSubCatChange = (sub: string) => {
    setSelectedSubCat(sub);
    setSelectedCategory(sub.startsWith('All') ? 'All' : sub);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Filter by department if product has department or category tagging
    if (selectedDept !== 'All') {
      result = result.filter((p) => {
        const itemDept = (p as any).department || (p.category && p.category.includes(selectedDept) ? selectedDept : '');
        return itemDept === selectedDept || !itemDept;
      });
    }

    // Filter by specific sub-category
    if (selectedCategory && selectedCategory !== 'All' && !selectedSubCat.startsWith('All')) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }

    // Filter by Price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
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
          return (b.review_count || 0) - (a.review_count || 0);
        });
    }

    return result;
  }, [products, selectedDept, selectedCategory, selectedSubCat, selectedSizes, priceRange, sort]);

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const clearAllFilters = () => {
    setSelectedDept('All');
    setSelectedSubCat('All Categories');
    setSelectedCategory('All');
    setSelectedSizes([]);
    setPriceRange([0, 8000]);
  };

  return (
    <section className="min-h-screen pt-8 pb-24 bg-[#07080a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 3D Depth */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#FF9900] mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Curated Luxury Wardrobe
          </div>
          <h1 
            className="text-4xl lg:text-5xl font-black tracking-tight"
            style={{ textShadow: '0 4px 18px rgba(0,0,0,0.85)' }}
          >
            The Collection
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Displaying <span className="text-white font-semibold">{filtered.length}</span> bespoke signature pieces
          </p>
        </div>

        {/* 1. Main Department Pills (Men, Women, Kids) */}
        <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 scrollbar-none">
          {(Object.keys(DEPARTMENTS) as DepartmentType[]).map((dept) => {
            const isActive = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => handleDeptChange(dept)}
                className={`relative px-6 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-[0_10px_25px_rgba(255,120,0,0.4)]'
                    : 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-white/5 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="deptActivePill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{dept === 'All' ? 'All Collections' : `${dept}'s Collection`}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Sub-Category Carousel */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none border-b border-white/5 pt-2">
          {DEPARTMENTS[selectedDept].map((sub) => {
            const isSubActive = selectedSubCat === sub;
            return (
              <button
                key={sub}
                onClick={() => handleSubCatChange(sub)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSubActive
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/[0.04] text-neutral-400 border border-white/5 hover:text-white hover:border-white/20'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-neutral-200 text-sm font-semibold hover:border-[#FF9900]/50 hover:text-white transition-all shadow-lg cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#FF9900]" />
            <span>Refine Filters</span>
            {selectedSizes.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF9900] text-white text-[10px] font-bold flex items-center justify-center">
                {selectedSizes.length}
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-neutral-900/90 border border-white/10 text-neutral-200 text-sm font-semibold outline-none cursor-pointer hover:border-[#FF9900]/50 transition-colors shadow-lg"
            >
              <option value="trending">Featured & Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Expandable 3D Glass Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
                
                {/* Size Matrix */}
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold mb-3">Filter by Size</p>
                  <div className="flex flex-wrap gap-2.5">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSize(s)}
                        className={`w-12 h-11 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                          selectedSizes.includes(s)
                            ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white shadow-lg shadow-orange-950/50'
                            : 'bg-white/[0.04] text-neutral-300 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Max Price Threshold</p>
                    <span className="text-sm font-bold text-[#FF9900]">₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={8000}
                    step={250}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-[#FF9900] cursor-pointer"
                  />
                </div>

                {/* Clear Active Filters */}
                {(selectedSizes.length > 0 || priceRange[1] < 8000 || selectedDept !== 'All') && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-[#FF9900] hover:text-[#FF3E00] transition-colors flex items-center gap-1.5 cursor-pointer pt-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reset All Selected Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Showcase Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-7">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-neutral-900/60 rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/30 rounded-3xl border border-white/5">
            <p className="text-neutral-400 text-lg font-medium">No items found matching the selected criteria.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#FF9900] text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-7">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
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