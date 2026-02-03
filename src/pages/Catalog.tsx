  import React, { useState, useMemo } from 'react';
  import { Link } from 'react-router-dom';
  import { Heart } from 'lucide-react';
  import '../styles/Catalog.css';
import { Footer } from '../components/layout/Footer';

  type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    sizes: string[];
    color: string;
    imageUrl: string;
  };

  const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: "Tailored Blazer", price: 128.00, category: "Camisas", sizes: ["P", "M"], color: "#000", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
    { id: 2, name: "Slip Dress", price: 89.00, category: "Vestidos", sizes: ["M", "G"], color: "#D4C3A3", imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400" },
    { id: 3, name: "Shirt", price: 70.00, category: "Camisas", sizes: ["P", "GG"], color: "#F5F1EE", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 4, name: "Tshirt", price: 29.00, category: "Camisas", sizes: ["P", "M", "G"], color: "#000", imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" },
    { id: 5, name: "Blouse", price: 89.00, category: "Camisas", sizes: ["G"], color: "#D1D1D1", imageUrl: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=400" },
    { id: 6, name: "Cremére", price: 49.80, category: "Vestidos", sizes: ["P"], color: "#F5F1EE", imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
  ];

  export default function Catalog() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [maxPrice, setMaxPrice] = useState<number>(150);
    const [sortBy, setSortBy] = useState<string>("Novidades");

    const filteredProducts = useMemo(() => {
      let result = MOCK_PRODUCTS.filter(product => {
        const matchCategory = !selectedCategory || product.category === selectedCategory;
        const matchSize = !selectedSize || product.sizes.includes(selectedSize);
        const matchColor = !selectedColor || product.color === selectedColor;
        const matchPrice = product.price <= maxPrice;
        return matchCategory && matchSize && matchColor && matchPrice;
      });

      if (sortBy === "Preço") result.sort((a, b) => a.price - b.price);
      return result;
    }, [selectedCategory, selectedSize, selectedColor, maxPrice, sortBy]);

    return (
      <div className="catalog-wrapper">
        <div className="catalog-container">
          {/* Sidebar Lateral */}
          <aside className="sidebar-filters">
            <div className="filter-section">
              <h3 className="filter-main-title">FILTROS</h3>
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
              <h3>PREÇO ATÉ: ${maxPrice}</h3>
              <input 
                type="range" min="20" max="150" value={maxPrice} 
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

            <div className="filter-section">
              <h3>ORDENAR POR</h3>
              <ul className="filter-list">
                <li className={sortBy === "Preço" ? 'active' : ''} onClick={() => setSortBy("Preço")}>Preço</li>
                <li className={sortBy === "Novidades" ? 'active' : ''} onClick={() => setSortBy("Novidades")}>Novidades</li>
              </ul>
            </div>
          </aside>

          {/* Grid de Produtos */}
          <main className="main-content">
            <div className="product-grid-catalog">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  {/* Adicione o Link aqui envolta da imagem e info */}
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="product-image-wrapper">
                      <img src={product.imageUrl} alt={product.name} />
                      <Heart size={18} className="wishlist-icon" />
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="no-results">Nenhum produto encontrado.</div>
            )}
          </main>
        </div>
       
      </div>
    );
  }