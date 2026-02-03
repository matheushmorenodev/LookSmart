import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import '../styles/Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="cart-page-wrapper">
      <h1 className="cart-title">SEU CARRINHO</h1>

      <div className="cart-main-content">
        {/* Coluna da Esquerda: Itens */}
        <div className="cart-items-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Tamanho: {item.size}</p>
                  
                  <div className="qty-selector">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <Trash2 
                    size={18} 
                    className="delete-btn" 
                    onClick={() => removeFromCart(item.id, item.size)} 
                  />
                </div>

                <div className="cart-item-price">
                  R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Seu carrinho está vazio.</p>
              <Link to="/catalog" className="btn-beige" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
                Ver Produtos
              </Link>
            </div>
          )}

          <div style={{ marginTop: '40px' }}>
            <Link to="/catalog" className="btn-beige" style={{ textDecoration: 'none', background: '#D4C3A3', color: '#000' }}>
              CONTINUAR COMPRANDO
            </Link>
          </div>
        </div>

        {/* Coluna da Direita: Resumo */}
        <div className="cart-sidebar">
          <div className="coupon-section">
            <input type="text" placeholder="CÓDIGO DO CUPOM" className="coupon-input" />
            <button className="btn-outline">APLICAR</button>
          </div>

          <div className="summary-box">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-line">
              <span>Frete:</span>
              <span style={{ color: '#999' }}>Gratuito</span>
            </div>

            <div className="total-line">
              <span>TOTAL</span>
              <span>R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            <Link to="/checkout" className="btn-beige" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            FINALIZAR COMPRA
            </Link>

            <div className="benefits mt-8" style={{ marginTop: '30px', fontSize: '13px', color: '#444' }}>
              <div className="flex items-center gap-3 mb-3"><Truck size={16}/> Frete grátis acima de R$200</div>
              <div className="flex items-center gap-3 mb-3"><RotateCcw size={16}/> Devolução gratuita</div>
              <div className="flex items-center gap-3"><ShieldCheck size={16}/> Compra segura</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}