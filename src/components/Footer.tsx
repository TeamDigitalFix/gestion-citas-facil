
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-10 border-t border-border animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Gestión<span className="text-success">Citas</span>
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Sistema de gestión de citas fácil y eficiente para tu negocio.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-success transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-muted-foreground hover:text-success transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-success transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-success transition-colors">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contacto</h3>
            <p className="text-muted-foreground">¿Tienes alguna pregunta?</p>
            <Link
              to="/contacto"
              className="inline-block text-success hover:underline transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-muted-foreground text-center">
            © {currentYear} GestiónCitas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
