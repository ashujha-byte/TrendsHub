import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  MapPin,
  Camera,
  CheckCircle2,
  ThumbsUp,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  images?: string[];
  helpfulCount: number;
}

export function QuickViewModal({
  product,
  onClose
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Review Form States
  const [userRating, setUserRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock initial reviews
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    {
      id: '1',
      name: 'Pooja Sharma',
      rating: 5,
      date: '18 Sep 2026',
      comment:
        'Fabric quality is absolutely premium! The embroidery work looks even richer than the pictures. Perfect fit and fast delivery.',
      verified: true,
      images: [
        'https://images.pexels.com/photos/38526708/pexels-photo-38526708.jpeg?auto=compress&cs=tinysrgb&h=400&w=300'
      ],
      helpfulCount: 24
    },
    {
      id: '2',
      name: 'Neha Verma',
      rating: 5,
      date: '12 Sep 2026',
      comment:
        'Color matches 100%. Kurti ka ghera aur stitching bilkul boutique style hai. 10/10 recommend!',
      verified: true,
      helpfulCount: 15
    }
  ]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || 'M');
      setActiveImgIdx(0);
      setPincodeStatus(null);
    }
  }, [product]);

  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [(product as any).image_url || ''];

  const wished = isWishlisted(product.id);
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
      )
    : 0;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeStatus('Delivery available in 2-3 business days. Cash on delivery available.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit PIN code.');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newUrls.push(url);
      });
      setUploadedPhotos((prev) => [...prev, ...newUrls]);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newRev: ReviewItem = {
      id: Date.now().toString(),
      name: userName,
      rating: userRating,
      date: 'Just now',
      comment: userComment,
      verified: true,
      images: uploadedPhotos.length > 0 ? uploadedPhotos : undefined,
      helpfulCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setUserName('');
    setUserComment('');
    setUploadedPhotos([]);
    setShowReviewModal(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-2 sm:p-4 md:p-6">
        
        {/* Backdrop Click Close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Flipkart / Amazon Main Card Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-6xl bg-[#0f1217] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-4 text-white"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all z-30"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4 sm:p-6 lg:p-8 space-y-10">
            {/* Top Product Layout: Gallery + Info */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Multi-Image Thumbnail Gallery */}
              <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3">
                {/* Thumbnails list */}
                {images.length > 1 && (
                  <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[460px] scrollbar-none">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImgIdx(i)}
                        className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeImgIdx === i
                            ? 'border-[#FF9900] shadow-md shadow-orange-950/40 scale-95'
                            : 'border-neutral-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Big Preview Display */}
                <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
                  <img
                    src={images[activeImgIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Icon */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-all z-10 cursor-pointer shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${wished ? 'fill-[#FF3E00] text-[#FF3E00]' : 'text-white'}`} />
                  </button>

                  {/* Arrow Navs */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT: Product Details, Offers, Buy Action */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#FF9900]">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">
                    {product.name}
                  </h1>

                  {/* Ratings Bar */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#388e3c] text-white text-xs font-bold">
                      {product.rating || '4.8'} <Star className="w-3 h-3 fill-current" />
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">
                      {reviewsList.length + (product.review_count || 45)} Ratings &amp; {reviewsList.length + 18} Reviews
                    </span>
                    <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Assured Quality
                    </span>
                  </div>

                  {/* Pricing Box */}
                  <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-neutral-800">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.original_price && (
                      <span className="text-lg text-neutral-500 line-through">
                        ₹{product.original_price.toLocaleString()}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-emerald-400 font-extrabold text-sm sm:text-base">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Inclusive of all taxes</p>

                  {/* Available Bank / Store Offers */}
                  <div className="mt-5 space-y-2 bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-800">
                    <p className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#FF9900]" /> Available Festive Offers:
                    </p>
                    <ul className="text-xs text-neutral-300 space-y-1.5 pl-5 list-disc">
                      <li>Flat 10% instant discount on prepaid orders above ₹1,999.</li>
                      <li>Buy 2 Get 1 Free on all Festive Kurti collections. Use code: <span className="text-[#FF9900] font-bold">TRENDS10</span></li>
                    </ul>
                  </div>

                  {/* Size Selection */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-bold text-neutral-300 tracking-wider">
                          Select Size:
                        </span>
                        <button
                          onClick={() => setShowSizeChart(!showSizeChart)}
                          className="text-xs text-[#FF9900] hover:underline font-semibold cursor-pointer"
                        >
                          Size Chart
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`w-12 h-11 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white shadow-lg shadow-orange-950/40'
                                : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-neutral-500'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Size Chart Modal / Accordion */}
                      {showSizeChart && (
                        <div className="mt-3 p-3.5 bg-black/60 rounded-xl border border-neutral-800 text-xs">
                          <table className="w-full text-left text-neutral-300">
                            <thead>
                              <tr className="border-b border-neutral-700 text-[#FF9900]">
                                <th className="pb-1.5">Size</th>
                                <th className="pb-1.5">Bust (in)</th>
                                <th className="pb-1.5">Waist (in)</th>
                                <th className="pb-1.5">Length (in)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/60">
                              <tr><td className="py-1">S</td><td>36</td><td>32</td><td>44</td></tr>
                              <tr><td className="py-1">M</td><td>38</td><td>34</td><td>44</td></tr>
                              <tr><td className="py-1">L</td><td>40</td><td>36</td><td>45</td></tr>
                              <tr><td className="py-1">XL</td><td>42</td><td>38</td><td>45</td></tr>
                              <tr><td className="py-1">XXL</td><td>44</td><td>40</td><td>46</td></tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Delivery & Pincode Checker */}
                  <div className="mt-6 pt-5 border-t border-neutral-800">
                    <p className="text-xs uppercase font-bold text-neutral-300 mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF9900]" /> Check Delivery Estimate:
                    </p>
                    <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter 6-digit Pincode"
                        className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#FF9900]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        Check
                      </button>
                    </form>
                    {pincodeStatus && (
                      <p className="text-xs text-emerald-400 mt-2 font-medium">{pincodeStatus}</p>
                    )}
                  </div>
                </div>

                {/* Flipkart & Amazon Pure E-Commerce Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-neutral-800">
                  <button
                    onClick={() => addToCart(product, selectedSize)}
                    className="py-4 px-4 rounded-xl bg-[#ff9f00] hover:bg-[#f29600] active:scale-95 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 fill-current" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, selectedSize);
                      onClose();
                      setCartOpen(true);
                    }}
                    className="py-4 px-4 rounded-xl bg-[#fb641b] hover:bg-[#e95a14] active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PRODUCT SPECIFICATIONS & DETAILS */}
            <div className="pt-8 border-t border-neutral-800">
              <h2 className="text-lg font-bold text-white mb-4">Product Details &amp; Specifications</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Fabric &amp; Material</span>
                  <span className="font-semibold text-white">Pure Chanderi Silk &amp; Fine Cotton Blend</span>
                </div>
                <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Pattern &amp; Work</span>
                  <span className="font-semibold text-white">Intricate Zari Hand Embroidery</span>
                </div>
                <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Wash Care</span>
                  <span className="font-semibold text-white">Dry Clean Recommended / Gentle Hand Wash</span>
                </div>
              </div>
            </div>

            {/* FLIPKART / AMAZON CUSTOMER RATINGS & REVIEWS SECTION */}
            <div className="pt-8 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Ratings &amp; Customer Reviews</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Real reviews with verified buyer photos</p>
                </div>

                {/* Rate Product Button */}
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Rate &amp; Review Product</span>
                </button>
              </div>

              {/* Customer Photo Gallery Strip */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-2.5">
                  Photos from Customers:
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {reviewsList
                    .flatMap((r) => r.images || [])
                    .map((imgUrl, i) => (
                      <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border border-neutral-700 flex-shrink-0">
                        <img src={imgUrl} alt="review" className="w-full h-full object-cover" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#388e3c] text-white text-[10px] font-bold">
                          {rev.rating} <Star className="w-2.5 h-2.5 fill-current" />
                        </span>
                        <span className="text-xs font-bold text-white">{rev.name}</span>
                        {rev.verified && (
                          <span className="text-emerald-400 text-[10px] font-medium flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500">{rev.date}</span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>

                    {/* Review Attached Images */}
                    {rev.images && rev.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {rev.images.map((im, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-neutral-700">
                            <img src={im} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                      <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* WRITE REVIEW & UPLOAD IMAGE MODAL */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-[#13161c] border border-neutral-700 rounded-3xl p-6 text-white shadow-2xl relative">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold">Write a Customer Review</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Share your fit, quality, and style experience</p>

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                {/* Star Picker */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setUserRating(st)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            st <= userRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Ananya Roy"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#FF9900]"
                  />
                </div>

                {/* Detailed Comment */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Review Comments</label>
                  <textarea
                    rows={3}
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Tell us about the fabric, color, fitting..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#FF9900]"
                  />
                </div>

                {/* Image Upload Input */}
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Attach Photos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border border-dashed border-neutral-600 hover:border-[#FF9900] rounded-xl flex items-center justify-center gap-2 text-xs text-neutral-300 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-[#FF9900]" />
                    <span>Click to Upload Product Photos</span>
                  </button>

                  {/* Thumbnail Previews of Uploaded Photos */}
                  {uploadedPhotos.length > 0 && (
                    <div className="flex gap-2 mt-2.5 overflow-x-auto">
                      {uploadedPhotos.map((p, idx) => (
                        <div key={idx} className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-700">
                          <img src={p} alt="upload" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Form */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-xs font-bold shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </AnimatePresence>
  );
}