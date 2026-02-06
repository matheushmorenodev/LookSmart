import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import '../../styles/Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-standard ${isHome && !isScrolled ? 'is-transparent' : 'is-solid'}`}>
      {/* LOGO À ESQUERDA */}
      <div className="nav-section-left">
        <Link to="/" className="nav-logo">LOOKSMART</Link>
      </div>

      {/* MENU CENTRAL */}
      <div className="nav-section-center">
        <ul className="nav-menu">
          <li><Link to="/catalog" className="nav-link">Clothing</Link></li>
          <li><span className="nav-link">Accessories</span></li>
        </ul>
      </div>

      {/* ÍCONES À DIREITA */}
      <div className="nav-section-right">
        <div className="nav-actions">
          <Search size={20} className="nav-icon" />
          <User size={20} className="nav-icon" />
          <Link to="/cart" className="bag-link">
            <ShoppingBag size={20} className="nav-icon" />
            {cartCount > 0 && <span className="bag-count-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};