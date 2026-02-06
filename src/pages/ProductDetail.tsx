import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/products'; 
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Buscando o produto dinamicamente pelo ID
  const product = MOCK_PRODUCTS.find(p => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('desc');
  
  // Sincronizando dados do produto quando o componente carrega
  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/catalog')}>Voltar ao Catálogo</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    navigate('/cart');
  };

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
            {/* Caso tenha mais imagens no futuro, aqui faríamos um map */}
            <img 
              src={product.imageUrl} 
              className={`thumb-item active`}
              alt="Thumbnail"
              onClick={() => handleImageChange(product.imageUrl)}
            />
          </div>
          <div className="main-image-wrapper">
            <img 
              src={selectedImage} 
              className={`main-image ${isAnimating ? 'animate' : ''}`} 
              alt={product.name} 
            />
          </div>
        </div>

        {/* Informações de Compra Dinâmicas */}
        <div className="product-info-side">
          <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
          
          {/* Container de Preço com Lógica de Promoção */}
          <div className="price-tag-container mb-6">
            <span className="price-tag font-medium text-2xl">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-gray-400 line-through ml-3 text-lg">
                  R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="ml-3 text-xs font-bold text-[#D4C3A3]">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          
          <p className="description-short text-gray-500 text-sm leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="size-selector mb-8">
            <h3 className="text-xs font-bold tracking-widest mb-4">TAMANHO</h3>
            <div className="size-options flex gap-3">
              {product.sizes.map(size => (
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
            className="btn-add-cart py-4 bg-[#D4C3A3] font-semibold tracking-widest hover:brightness-95 transition-all"
            onClick={handleAddToCart}
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

      {/* Conteúdo das Abas Dinâmico */}
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
              {product.description}
            </p>
          )}

          {activeTab === 'det' && (
            <div className="specs-grid">
              {product.details.map((detail, index) => (
                <React.Fragment key={index}>
                  <span className="spec-label">{detail.label}</span>
                  <span className="spec-value">{detail.value}</span>
                </React.Fragment>
              ))}
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