
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={cn("flex-1 animate-fade-in", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
