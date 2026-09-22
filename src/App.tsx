import { AppProvider, useApp } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ShopPage } from '@/components/ShopPage';
import { ProfilePage } from '@/components/ProfilePage';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { SearchModal } from '@/components/SearchModal';
import { StoreInfo, WhatsAppBubble, Footer } from '@/components/StoreInfo';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && (
              <>
                <Hero />
                <ShopPage />
                <StoreInfo />
              </>
            )}
            {currentPage === 'shop' && <ShopPage />}
            {currentPage === 'profile' && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <CartDrawer />
      <AuthModal />
      <SearchModal />
      <WhatsAppBubble />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
