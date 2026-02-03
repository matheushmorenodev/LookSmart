import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import '../styles/Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="cart-page">
      <h1 className="cart-title">SEU CARRINHO</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-img" />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Tamanho: {item.size}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.size, -1)}><Minus size={14}/></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, 1)}><Plus size={14}/></button>
                </div>
              </div>
              <div className="item-price">R$ {item.price.toFixed(2)}</div>
              <Trash2 className="delete-icon" onClick={() => removeFromCart(item.id, item.size)} />
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row"><span>Subtotal:</span> <span>R$ {cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Frete:</span> <span style={{color: '#999'}}>Gratuito</span></div>
          <div className="total-row"><span>TOTAL</span> <span>R$ {cartTotal.toFixed(2)}</span></div>
          <button className="btn-checkout">FINALIZAR COMPRA</button>
        </div>
      </div>
    </div>
  );
}