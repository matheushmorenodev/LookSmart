import React from 'react';
import '../../styles/Footer.css';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>LOOKSMART</h2>
          <p>
            Elevando o seu estilo diário com peças atemporais e design minimalista. 
            Qualidade que você sente, estilo que você vive.
          </p>
        </div>

        <div className="footer-column">
          <h3>Shopping</h3>Footer
          <ul>
            <li>New Arrivals</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Sale</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQ</li>
            <li>Size Guide</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 LOOKSMART. All rights reserved.</p>
        <div className="social-links">
          <Instagram size={18} className="cursor-pointer hover:text-black" />
          <Twitter size={18} className="cursor-pointer hover:text-black" />
          <Facebook size={18} className="cursor-pointer hover:text-black" />
        </div>
      </div>
    </footer>
  );
};