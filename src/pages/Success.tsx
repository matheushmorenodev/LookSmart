import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import '../styles/Success.css';

export default function Success() {
  const { cart, cartTotal, clearCart, customerInfo } = useCart();

  const [orderSummary] = useState({
    items: [...cart],
    total: cartTotal,
    customer: customerInfo,
    orderNumber: `#${Math.floor(Math.random() * 900000) + 100000}`, // Gera um número de pedido aleatório
    userEmail: "carlos.oliveira@email.com"
  });

  // 2. Limpamos o carrinho global para que a Navbar volte ao estado zero.
  useEffect(() => {
    if (cart.length > 0) {
      clearCart();
    }
  }, []);

  return (
    <div className="success-page-wrapper">
      {/* Cabeçalho de Sucesso */}
      <div className="success-header">
        <div className="success-icon-circle">
          <Check size={40} />
        </div>
        <h1>OBRIGADO PELA SUA COMPRA!</h1>
        <p className="success-subtext">
          Seu pedido <strong>{orderSummary.orderNumber}</strong> foi confirmado com sucesso.<br />
          Um e-mail de confirmação foi enviado para {orderSummary.customer?.email}
        </p>
      </div>

      <div className="order-details-grid">
        {/* Coluna Esquerda: Listagem Detalhada */}
        <div className="order-summary-section">
          <h3 className="details-column-title">RESUMO DO PEDIDO</h3>
          <div className="order-summary-list">
            {orderSummary.items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="success-item-row">
                <div className="success-item-name">
                  <h4>{item.name}</h4>
                  <p>Tamanho: {item.size}</p>
                </div>
                <div className="success-item-price">
                  R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}

            <div className="success-calculations">
              <div className="calc-row">
                <span>Subtotal:</span> 
                <span>R$ {orderSummary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="calc-row">
                <span>Frete:</span> 
                <span className="free-text">Gratuito</span>
              </div>
              <div className="calc-total">
                <span>TOTAL</span> 
                <span>R$ {orderSummary.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="success-actions">
              <button className="btn-primary-beige">ACOMPANHAR PEDIDO</button>
              <Link to="/catalog" className="btn-outline-dark">CONTINUAR COMPRANDO</Link>
            </div>

            <div className="success-footer-badges">
              <div className="badge"><Truck size={14}/> Frete grátis acima de R$200</div>
              <div className="badge"><RotateCcw size={14}/> Devolução gratuita</div>
              <div className="badge"><ShieldCheck size={14}/> Compra segura</div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Sidebar com Imagens Reais */}
        <aside className="success-sidebar">
          <h3 className="details-column-title">ENDEREÇO DE ENTREGA</h3>
          <div className="shipping-info-card">
            <h4>{orderSummary.customer?.nome}</h4>
            <p>{orderSummary.customer?.endereco}<br />{orderSummary.customer?.cidade}, {orderSummary.customer?.cep}</p>

            <div className="mini-product-previews">
              {orderSummary.items.map((item, idx) => (
                <div key={`preview-${idx}`} className="mini-preview-item">
                  <img src={item.imageUrl} alt={item.name} className="mini-img" />
                  <div className="mini-info">
                    <p className="mini-name">{item.name}</p>
                    <p className="mini-meta">Tamanho: {item.size}</p>
                    <p className="mini-price">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-badges-confirm">
              <div className="badge"><Truck size={14}/> Frete grátis acima de R$200</div>
              <div className="badge"><RotateCcw size={14}/> Devolução gratuita</div>
              <div className="badge"><ShieldCheck size={14}/> Compra segura</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}