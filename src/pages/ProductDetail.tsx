import React, { useState, useEffect } from 'react';
import { Truck, RotateCcw, ShieldCheck, Info } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import '../styles/ProductDetail.css';
import { useCart } from '../context/CartContext';

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
  "https://images.unsplash.com/photo-1598808503744-3ede29946011?w=800",
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState('P');
  const [activeTab, setActiveTab] = useState('desc');
  const { addToCart } = useCart();

  // Gatilho de animação ao trocar imagem
  const handleImageChange = (img: string) => {
    if (img !== selectedImage) {
      setIsAnimating(true);
      setSelectedImage(img);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="product-page-wrapper">
      <div className="product-detail-container">
        {/* Galeria com Animação */}
        <div className="image-gallery">
          <div className="thumbnails">
            {PRODUCT_IMAGES.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                className={`thumb-item ${selectedImage === img ? 'active' : ''}`}
                onClick={() => handleImageChange(img)}
                alt={`Thumbnail ${idx}`}
              />
            ))}
          </div>
          <img 
            src={selectedImage} 
            className={`main-image ${isAnimating ? 'animate' : ''}`} 
            alt="Tailored Blazer" 
          />
        </div>

        {/* Informações de Compra */}
        <div className="product-info-side">
          <h1 className="text-3xl font-medium mb-2">Tailored Blazer</h1>
          <p className="price-tag font-light text-2xl mb-6">R$ 720,00</p>
          
          <p className="description-short text-gray-500 text-sm leading-relaxed mb-8">
            Elegant and timeless navy blue blazer with a slim fit, 
            crafted from premium wool, featuring gold buttons.
          </p>

          <div className="size-selector mb-8">
            <h3 className="text-xs font-bold tracking-widest mb-4">TAMANHO</h3>
            <div className="size-options flex gap-3">
              {['P', 'M', 'G', 'GG'].map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

            <button 
              className="btn-add-cart" 
              onClick={() => addToCart({ id: 1, name: "Tailored Blazer", price: 720, imageUrl: selectedImage }, selectedSize)}
            >
              ADICIONAR AO CARRINHO
            </button>

          <div className="benefits mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-700"><Truck size={18}/> Frete grátis acima de R$200</div>
            <div className="flex items-center gap-3 text-sm text-gray-700"><RotateCcw size={18}/> Devolução gratuita em até 30 dias</div>
            <div className="flex items-center gap-3 text-sm text-gray-700"><ShieldCheck size={18}/> Pagamento processado de forma segura</div>
          </div>
        </div>
      </div>

      {/* Conteúdo das Abas Refinado */}
      <section className="tabs-section border-t border-gray-100 mt-20 pt-10 px-20 max-w-[1200px] mx-auto">
        <div className="tabs-header flex gap-10 border-b border-gray-50 mb-8">
          {['desc', 'det', 'env'].map((tab) => (
            <button 
              key={tab}
              className={`tab-btn pb-4 text-xs tracking-widest uppercase transition-all ${activeTab === tab ? 'active border-b-2 border-black text-black' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'desc' ? 'Descrição' : tab === 'det' ? 'Detalhes' : 'Entrega e Devolução'}
            </button>
          ))}
        </div>

        <div className="tab-content pb-20">
          {activeTab === 'desc' && (
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              A sophisticated navy blazer with a double-breasted design. Made from premium wool blend. 
              Features a slim fit, peak lapel, two gold buttons on each sleeve, and a double-button front closure.
            </p>
          )}

          {activeTab === 'det' && (
            <div className="specs-grid">
              <span className="spec-label">Composição</span><span className="spec-value">100% Lã fria premium italiana</span>
              <span className="spec-label">Forro</span><span className="spec-value">100% Acetato de seda</span>
              <span className="spec-label">Botões</span><span className="spec-value">Metal banhado a ouro 18k</span>
              <span className="spec-label">Cuidado</span><span className="spec-value">Apenas lavagem a seco profissional</span>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="delivery-info">
              <div className="delivery-item">
                <Truck size={20} className="text-gray-400" />
                <div className="delivery-text">
                  <h4>Entrega Padrão</h4>
                  <p>Grátis para todo o Brasil em compras acima de R$200. Prazo médio de 3 a 7 dias úteis.</p>
                </div>
              </div>
              <div className="delivery-item">
                <RotateCcw size={20} className="text-gray-400" />
                <div className="delivery-text">
                  <h4>Troca & Devolução</h4>
                  <p>Você tem 30 dias após o recebimento para solicitar a devolução ou troca sem custos adicionais.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}