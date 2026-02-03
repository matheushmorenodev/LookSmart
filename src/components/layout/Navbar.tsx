import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import '../../styles/Navbar.css';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="navbar-standard">
      <Link to="/" className="nav-logo">LOOKSMART</Link>

      <ul className="nav-menu">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            New In
          </Link>
        </li>
        <li>
          <Link to="/catalog" className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}>
            Clothing
          </Link>
        </li>
        <li><span className="nav-link">Accessories</span></li>
        <li><span className="nav-link" style={{color: '#999'}}>Sale</span></li>
      </ul>

      <div className="nav-actions">
        <Search size={20} className="nav-icon" />
        <User size={20} className="nav-icon" />
        <Link to="/cart" className="nav-icon" style={{ position: 'relative', color: 'inherit' }}>
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span style={{
            position: 'absolute', top: '-8px', right: '-8px',
            backgroundColor: '#D4C3A3', fontSize: '10px',
            borderRadius: '50%', padding: '2px 5px', fontWeight: 'bold'
          }}>
            {cartCount}
          </span>
        )}
      </Link>
      </div>
    </nav>
  );
};