import React from 'react';
import '../styles/Home.css';
import { Search, User, ShoppingBag } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="home-container">
      
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">NEW SEASON<br/>COLLECTION</h1>
          <button className="btn-primary">Shop the Collection</button>
        </div>
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800" 
            className="hero-image" 
            alt="New Season" 
          />
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">New Arrivals</h2>
        <div className="product-grid">
          {[
            { name: "Tailored Blazer", price: 130, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
            { name: "Bleye Dress", price: 130, img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400" },
            { name: "Séet Jeans", price: 90, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
            { name: "T-Shirts", price: 40, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" }
          ].map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.img} alt={item.name} />
              <p style={{fontSize: '12px', marginTop: '15px', textTransform: 'uppercase'}}>{item.name}</p>
              <p style={{fontSize: '14px', color: '#666'}}>${item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="assistant-box">
        <div className="assistant-visual">
          {/* Espaço para o chat visual da imagem */}
          <div style={{background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}>
            <p style={{fontSize: '10px', color: '#999'}}>"I'm going to a wedding..."</p>
          </div>
        </div>
        <div className="assistant-text" style={{textAlign: 'right'}}>
          <h2 style={{fontSize: '32px', fontWeight: '300', marginBottom: '20px'}}>CHAT WITH OUR<br/>STYLE ASSISTANT</h2>
          <button className="btn-primary">Start Chat</button>
        </div>
      </section>
      
    </div>
  );
}