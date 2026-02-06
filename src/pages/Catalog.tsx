import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MOCK_PRODUCTS} from '../data/products'; 
import type { Product } from '../data/products';
import '../styles/Catalog.css';

export default function Catalog() {
  // Estados dos Filtros
  const [viewState, setViewState] = useState<"all" | "new" | "sale">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>("Novidades");

  // Lógica de Filtragem Refinada
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(product => {
      // Filtro de Estado (Aba da Navbar antiga)
      const matchView = 
        viewState === "all" || 
        (viewState === "new" && product.isNew) || 
        (viewState === "sale" && product.onSale);

      const matchCategory = !selectedCategory || product.category === selectedCategory;
      const matchSize = !selectedSize || product.sizes.includes(selectedSize);
      const matchPrice = product.price <= maxPrice;

      return matchView && matchCategory && matchSize && matchPrice;
    });

    if (sortBy === "Preço") result.sort((a, b) => a.price - b.price);
    return result;
  }, [viewState, selectedCategory, selectedSize, maxPrice, sortBy]);

  return (
    <div className="catalog-wrapper">
      <div className="catalog-container">
        <aside className="sidebar-filters">
          <div className="filter-section">
            <h3 className="filter-main-title">COLEÇÕES</h3>
            <ul className="filter-list">
              <li className={viewState === "all" ? 'active' : ''} onClick={() => setViewState("all")}>Todos os Produtos</li>
              <li className={viewState === "new" ? 'active' : ''} onClick={() => setViewState("new")}>New In</li>
              <li className={viewState === "sale" ? 'active' : ''} onClick={() => setViewState("sale")}>Sale</li>
            </ul>
          </div>

          <div className="filter-section">
            <h3>CATEGORIAS</h3>
            <ul className="filter-list">
              {["Vestidos", "Camisas", "Calças", "Acessórios"].map(cat => (
                <li 
                  key={cat} 
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>PREÇO ATÉ: R$ {maxPrice}</h3>
            <input 
              type="range" min="0" max="2000" value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-section">
            <h3>TAMANHO</h3>
            <div className="size-grid">
              {['P', 'M', 'G', 'GG'].map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="product-grid-catalog">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image-wrapper">
                    <img src={product.imageUrl} alt={product.name} />
                    {product.onSale && <span className="badge-sale">SALE</span>}
                    {product.isNew && <span className="badge-new">NEW</span>}
                    <Heart size={18} className="wishlist-icon" />
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <div className="price-container">
                      {/* Preço atual sempre em destaque */}
                      <span className="current-price">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>

                      {/* Bloco condicional para promoção */}
                      {product.oldPrice && (
                        <>
                          <span className="old-price">
                            R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="discount-tag">
                            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}