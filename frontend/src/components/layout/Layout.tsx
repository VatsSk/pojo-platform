import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingDock from '../ui/FloatingDock';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <Outlet />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
};

export default Layout;
