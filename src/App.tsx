import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { BookingWizard } from './components/BookingWizard';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { MyBookingsSection } from './components/MyBookingsSection';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { ReceiptModal } from './components/ReceiptModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AuthModal } from './components/AuthModal';
import { SoundDemoModal } from './components/SoundDemoModal';
import { DjangoBackendModal } from './components/DjangoBackendModal';
import { PackageTier } from './types';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSoundDemoOpen, setIsSoundDemoOpen] = useState(false);
  const [isDjangoModalOpen, setIsDjangoModalOpen] = useState(false);

  const { selectPackage } = useBooking();

  const handleSelectPackageToBook = (tier: PackageTier) => {
    selectPackage(tier);
    setActiveTab('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNowFromHero = (tier?: PackageTier) => {
    if (tier) selectPackage(tier);
    setActiveTab('bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07010f] text-purple-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
        onOpenDjangoHub={() => setIsDjangoModalOpen(true)}
      />

      {/* Main Content Pages Based on Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExplorePackages={() => {
                setActiveTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookNow={handleBookNowFromHero}
              onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
              onViewGallery={() => {
                setActiveTab('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <PackagesSection
              onSelectPackageToBook={handleSelectPackageToBook}
              onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
            />
            <GallerySection
              onBookPackage={() => {
                setActiveTab('bookings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <AboutSection
              onBookNow={() => {
                setActiveTab('bookings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
              onOpenDjangoHub={() => setIsDjangoModalOpen(true)}
            />
            <ContactSection />
          </>
        )}

        {activeTab === 'about' && (
          <AboutSection
            onBookNow={() => {
              setActiveTab('bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
            onOpenDjangoHub={() => setIsDjangoModalOpen(true)}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesSection
            onSelectPackageToBook={handleSelectPackageToBook}
            onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingWizard
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            onBookPackage={() => {
              setActiveTab('bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && <ContactSection />}

        {activeTab === 'my-bookings' && (
          <MyBookingsSection
            onStartNewBooking={() => {
              setActiveTab('bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Modals & Notifications */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
      <ReceiptModal />
      <NotificationsDrawer />
      <AuthModal />
      <SoundDemoModal
        isOpen={isSoundDemoOpen}
        onClose={() => setIsSoundDemoOpen(false)}
      />
      <DjangoBackendModal
        isOpen={isDjangoModalOpen}
        onClose={() => setIsDjangoModalOpen(false)}
        onNavigateToBooking={() => {
          setActiveTab('bookings');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSoundDemo={() => setIsSoundDemoOpen(true)}
        onOpenDjangoHub={() => setIsDjangoModalOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MainApp />
      </BookingProvider>
    </AuthProvider>
  );
}
