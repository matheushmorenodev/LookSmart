import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { Footer } from '../components/layout/Footer';
import '../styles/Home.css';

export default function Home() {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    // Observa todas as seções com a classe 'reveal'
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);


  return (
    <div className="home-wrapper">
      {/* 1. Hero Section: Impacto Editorial */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">NEW COLLECTION 2026</span>
          <h1 className="hero-title">ESSENCIAL & <br /> ATEMPORAL</h1>
          <p className="hero-description">
            Descubra a sofisticação em cada detalhe com nossa nova linha de alfaiataria premium.
          </p>
          <Link to="/catalog" className="btn-hero">
            EXPLORAR COLEÇÃO <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-image-container">
           <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200" alt="Hero Fashion" />
        </div>
      </section>

      {/* 2. Vitrine Dinâmica: New Arrivals */}
      <section className="featured-products">
        <div className="section-header">
          <h2>NEW ARRIVALS</h2>
          <Link to="/catalog?view=new" className="view-all-link">Ver todos</Link>
        </div>
        
        <div className="products-grid-home">
          {newArrivals.map(product => (
            <div key={product.id} className="product-card-home">
              <Link to={`/product/${product.id}`}>
                <div className="product-img-home">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-details-home">
                  <h4>{product.name}</h4>
                  <p>R$ {product.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Seção do Assistente de Estilo (Futura IA) */}
      <section className="ai-assistant-banner">
        <div className="ai-container">
          <div className="ai-visual-side">
            {/* Representação visual do chat da imagem */}
            <div className="chat-preview-card">
              <div className="chat-msg user">Gostaria de algo para um casamento...</div>
              <div className="chat-msg bot">
                Recomendo estas opções em seda:
                <div className="bot-suggestions">
                  <div className="suggest-dot"></div>
                  <div className="suggest-dot"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ai-content-side">
            <h2 className="ai-title">CHAT WITH OUR<br />STYLE ASSISTANT</h2>
            <p className="ai-description">
              Dúvidas sobre o que vestir? Nossa inteligência artificial ajuda você a encontrar o look perfeito para qualquer ocasião.
            </p>
            <button className="btn-ai-start">
              START CHAT <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}