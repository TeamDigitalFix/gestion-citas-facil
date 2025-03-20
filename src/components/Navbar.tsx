
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-8",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Gestión<span className="text-success">Citas</span>
            </h1>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" active={isActive('/')}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" active={isActive('/servicios')}>
              Servicios
            </NavLink>
            <NavLink to="/contacto" active={isActive('/contacto')}>
              Contacto
            </NavLink>
            <div className="ml-4">
              <Button asChild>
                <Link to="/login">Administración</Link>
              </Button>
            </div>
          </nav>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden text-foreground p-2 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          "fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 transform ease-in-out overflow-hidden md:hidden",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 max-h-[400px]"
            : "opacity-0 -translate-y-4 max-h-0"
        )}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
          <MobileNavLink to="/" active={isActive('/')} onClick={toggleMobileMenu}>
            Inicio
          </MobileNavLink>
          <MobileNavLink to="/servicios" active={isActive('/servicios')} onClick={toggleMobileMenu}>
            Servicios
          </MobileNavLink>
          <MobileNavLink to="/contacto" active={isActive('/contacto')} onClick={toggleMobileMenu}>
            Contacto
          </MobileNavLink>
          <div className="pt-2">
            <Button className="w-full" asChild>
              <Link to="/login" onClick={toggleMobileMenu}>
                Administración
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative text-base font-medium transition-colors hover:text-success duration-200",
        active
          ? "text-success after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-success after:animate-fade-in"
          : "text-foreground"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, children, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-lg py-3 px-2 border-b border-gray-100 font-medium transition-colors",
        active ? "text-success" : "text-foreground hover:text-success"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
