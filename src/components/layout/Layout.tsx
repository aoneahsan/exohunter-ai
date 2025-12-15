import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { NotificationBanner } from '@/components/NotificationBanner';
import { UpdatePromoModal, OneTimePromoModal } from '@/components/advertising';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-space-900 text-white flex flex-col">
      <Navbar />
      <NotificationBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #2a3155',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Advertising Modals */}
      <UpdatePromoModal />
      <OneTimePromoModal />
    </div>
  );
};