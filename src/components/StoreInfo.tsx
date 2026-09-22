import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, Facebook, MessageCircle, Navigation } from 'lucide-react';

const INSTAGRAM_POSTS = [
  'https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38526708/pexels-photo-38526708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7176438/pexels-photo-7176438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13584944/pexels-photo-13584944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20593515/pexels-photo-20593515.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32309984/pexels-photo-32309984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export function StoreInfo() {
  return (
    <section id="store-info" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF9900]/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-[#FF9900] uppercase tracking-widest mb-2">Visit Us</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Find Trends Hub in Sitamarhi</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-lg mx-auto">
            Visit our store for the latest trending fashion or order online with fast home delivery.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden"
          >
            <div className="aspect-video bg-[#0d0f12] relative">
              <iframe
                src="https://www.google.com/maps?q=Sahu+Chowk+Dumra+Road+Sitamarhi+Bihar&output=embed"
                className="w-full h-full grayscale opacity-70"
                loading="lazy"
                title="Trends Hub Location"
              />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF9900]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Store Address</p>
                  <p className="text-sm text-gray-400 mt-0.5">Sahu Chowk, Dumra Road, Sitamarhi, Bihar 843301</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF9900]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Shop Timings</p>
                  <p className="text-sm text-gray-400 mt-0.5">Mon - Sun: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF9900]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Contact</p>
                  <p className="text-sm text-gray-400 mt-0.5">+91 99999 99999</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Sahu+Chowk+Dumra+Road+Sitamarhi+Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-[#FF3E00] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#FF9900]/30 transition-all"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Instagram grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            id="instagram"
            className="bg-[#15181d]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="w-5 h-5 text-[#FF9900]" />
              <h3 className="text-lg font-bold text-white">@trendshub.sitamarhi</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Follow us for the latest fashion drops, reels, and exclusive offers</p>
            <div className="grid grid-cols-3 gap-2">
              {INSTAGRAM_POSTS.map((img, i) => (
                <a
                  key={i}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-lg overflow-hidden group relative"
                >
                  <img src={img} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#F77737] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppBubble() {
  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hi%20Trends%20Hub!%20I'd%20like%20to%20know%20more%20about%20your%20collection."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:scale-110 transition-transform group"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#15181d] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0b0e] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#FFD700] via-[#FF9900] to-[#FF3E00] bg-clip-text text-transparent mb-3">
              TRENDS HUB
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sitamarhi&apos;s trending fashion store. Specialists in women&apos;s premium kurtis, ethnic sets, and latest collections.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF9900] hover:border-[#FF9900]/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FF9900] hover:border-[#FF9900]/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Daily Wear Kurtis</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Festive Kurti Sets</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Dupatta Sets</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Trending Now</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Return &amp; Exchange</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF9900] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF9900] flex-shrink-0 mt-0.5" />
                <span>Sahu Chowk, Dumra Road, Sitamarhi, Bihar 843301</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF9900] flex-shrink-0" />
                <span>10 AM - 8 PM (Daily)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF9900] flex-shrink-0" />
                <span>+91 99999 99999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 Trends Hub - Sitamarhi. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>COD Available</span>
            <span>•</span>
            <span>Premium Quality</span>
            <span>•</span>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
