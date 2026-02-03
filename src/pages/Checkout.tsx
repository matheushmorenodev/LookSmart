import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Truck, RotateCcw, ShieldCheck, ChevronLeft, CreditCard } from 'lucide-react';
import '../styles/Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  
  // Estados de Controle de Fluxo
  const [step, setStep] = useState(1); // 1: Info, 2: Envio, 3: Pagamento
  
  // Estados de Seleção
  const [shippingMethod, setShippingMethod] = useState('padrao');
  const [paymentMethod, setPaymentMethod] = useState('cartao');

  // Cálculos Dinâmicos
  const shippingCost = shippingMethod === 'expresso' ? 35 : 0;
  const finalTotal = cartTotal + shippingCost;

  // Função para finalizar a compra
  const handleFinalizeOrder = () => {
    // Aqui você integraria com um backend futuramente
    alert("Pedido finalizado com sucesso!");
    navigate('/');
  };

  return (
    <div className="checkout-page-wrapper">
      <h1 className="checkout-title">FINALIZAR COMPRA</h1>

      <div className="checkout-main-content">
        {/* COLUNA ESQUERDA: FORMULÁRIOS DINÂMICOS */}
        <div className="checkout-flow-section">
          
          {/* Navegação de Passos */}
          <div className="checkout-steps-nav">
            <span className={step >= 1 ? 'active' : ''}>1. INFORMAÇÕES DE ENVIO</span>
            <div className="step-line"></div>
            <span className={step >= 2 ? 'active' : ''}>2. MÉTODO DE ENVIO</span>
            <div className="step-line"></div>
            <span className={step >= 3 ? 'active' : ''}>3. MÉTODO DE PAGAMENTO</span>
          </div>

          <div className="step-content-container">
            
            {/* ETAPA 1: INFORMAÇÕES DE ENVIO */}
            {step === 1 && (
              <div className="step-fade-in">
                <h2 className="step-subtitle">INFORMAÇÕES DE ENVIO</h2>
                <form className="form-grid" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="form-group full">
                    <label>NOME COMPLETO *</label>
                    <input type="text" placeholder="Carlos Oliveira" required />
                  </div>
                  <div className="form-group full">
                    <label>E-MAIL *</label>
                    <input type="email" placeholder="carlos.oliveira@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>ENDEREÇO *</label>
                    <input type="text" placeholder="Rua Exemplo, 123" required />
                  </div>
                  <div className="form-group">
                    <label>CIDADE *</label>
                    <input type="text" placeholder="São Paulo" required />
                  </div>
                  <div className="form-group">
                    <label>CEP *</label>
                    <input type="text" placeholder="01000-000" required />
                  </div>
                  <div className="form-group">
                    <label>TEL *</label>
                    <input type="text" placeholder="(11) 91234-5678" required />
                  </div>
                  <button type="submit" className="btn-checkout-next">
                    CONTINUAR PARA ENTREGA
                  </button>
                </form>
              </div>
            )}

            {/* ETAPA 2: MÉTODO DE ENVIO */}
            {step === 2 && (
              <div className="step-fade-in">
                <button className="btn-back" onClick={() => setStep(1)}>
                  <ChevronLeft size={16} /> Voltar para informações
                </button>
                <h2 className="step-subtitle">MÉTODO DE ENVIO</h2>
                
                <div className="shipping-selection-list">
                  <div 
                    className={`shipping-option-card ${shippingMethod === 'padrao' ? 'selected' : ''}`}
                    onClick={() => setShippingMethod('padrao')}
                  >
                    <div className="custom-radio"></div>
                    <div className="ship-info">
                      <h4>Envio Padrão (4-7 dias úteis)</h4>
                      <p>Entrega estimada entre 28 de janeiro e 31 de janeiro</p>
                    </div>
                    <span className="ship-price">GRATUITO</span>
                  </div>

                  <div 
                    className={`shipping-option-card ${shippingMethod === 'expresso' ? 'selected' : ''}`}
                    onClick={() => setShippingMethod('expresso')}
                  >
                    <div className="custom-radio"></div>
                    <div className="ship-info">
                      <h4>Envio Expresso (1-3 dias úteis)</h4>
                      <p>Entrega estimada entre 25 de janeiro e 27 de janeiro</p>
                    </div>
                    <span className="ship-price">R$ 35,00</span>
                  </div>
                </div>

                <button className="btn-checkout-next" onClick={() => setStep(3)}>
                  CONTINUAR PARA PAGAMENTO
                </button>
              </div>
            )}

            {/* ETAPA 3: MÉTODO DE PAGAMENTO */}
            {step === 3 && (
              <div className="step-fade-in">
                <button className="btn-back" onClick={() => setStep(2)}>
                  <ChevronLeft size={16} /> Voltar para envio
                </button>
                <h2 className="step-subtitle">MÉTODO DE PAGAMENTO</h2>

                <div className="payment-methods-list">
                  {/* Cartão de Crédito */}
                  <div className={`payment-card ${paymentMethod === 'cartao' ? 'selected' : ''}`}>
                    <div className="payment-header" onClick={() => setPaymentMethod('cartao')}>
                      <div className="custom-radio"></div>
                      <div className="payment-title-group">
                        <h4>Cartão de Crédito</h4>
                        <div className="payment-icons">
                          <span style={{fontSize: '10px', color: '#999'}}>VISA | MASTER | AMEX</span>
                        </div>
                      </div>
                      <span className="ship-price">GRATUITO</span>
                    </div>
                    
                    {paymentMethod === 'cartao' && (
                      <div className="card-details-form">
                        <input type="text" placeholder="**** **** **** ****" className="form-group-input" style={{width: '100%', marginBottom: '15px', padding: '12px', border: '1px solid #eee'}} />
                        <div className="card-input-grid">
                          <div className="form-group"><label>NOME NO CARTÃO *</label><input type="text" placeholder="Carlos Oliveira" /></div>
                          <div className="form-group"><label>VALIDADE *</label><input type="text" placeholder="MM / AA" /></div>
                          <div className="form-group"><label>CVC *</label><input type="text" placeholder="***" /></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pix */}
                  <div 
                    className={`payment-card ${paymentMethod === 'pix' ? 'selected' : ''}`} 
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <div className="payment-header">
                      <div className="custom-radio"></div>
                      <div className="ship-info">
                        <h4>Pix</h4>
                        <p>Pague com Pix e receba confirmação imediata</p>
                      </div>
                    </div>
                  </div>

                  {/* Boleto */}
                  <div 
                    className={`payment-card ${paymentMethod === 'boleto' ? 'selected' : ''}`} 
                    onClick={() => setPaymentMethod('boleto')}
                  >
                    <div className="payment-header">
                      <div className="custom-radio"></div>
                      <h4>Boleto Bancário</h4>
                    </div>
                  </div>
                </div>

                <button className="btn-checkout-next" onClick={handleFinalizeOrder}>
                  FINALIZAR COMPRA
                </button>
              </div>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: RESUMO FIXO */}
        <aside className="checkout-summary-sidebar">
          <div className="summary-sticky-box">
            <h3 className="summary-title">SEU PEDIDO</h3>
            
            <div className="mini-cart-list">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="mini-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="mini-details">
                    <p className="mini-name">{item.name}</p>
                    <p className="mini-meta">Tamanho: {item.size}</p>
                    <p className="mini-price">R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals-checkout">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Frete:</span>
                <span className={shippingMethod === 'padrao' ? 'free-text' : ''}>
                  {shippingMethod === 'padrao' ? 'Gratuito' : `R$ ${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="grand-total">
                <span>TOTAL</span>
                <span>R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-trust-badges">
              <div className="badge-item"><Truck size={14}/> Frete grátis acima de R$200</div>
              <div className="badge-item"><RotateCcw size={14}/> Devolução gratuita</div>
              <div className="badge-item"><ShieldCheck size={14}/> Compra segura</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}