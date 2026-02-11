import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_ORDERS } from '../data/orders';
import { Footer } from '../components/layout/Footer';
import '../styles/Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Voltando o fluxo inicial para 'visao-geral' para vermos a tela desenhada
  const [activeTab, setActiveTab] = useState('visao-geral');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-header">
        <h1 className="main-page-title">
          {activeTab === 'pedidos' ? 'Meus Pedidos' : 
           activeTab === 'conta' ? 'Minha Conta' : 'Meu Perfil'}
        </h1>
      </div>

      <div className="profile-main-layout">
        {/* Sidebar Esquerda */}
        <aside className="profile-sidebar">
          <h3 className="sidebar-label">MEU PERFIL</h3>
          <ul className="profile-menu">
            <li className={activeTab === 'visao-geral' ? 'active' : ''} onClick={() => setActiveTab('visao-geral')}>
              Visão Geral
            </li>
            <li className={activeTab === 'pedidos' ? 'active' : ''} onClick={() => setActiveTab('pedidos')}>
              Meus Pedidos
            </li>
            <li className={activeTab === 'conta' ? 'active' : ''} onClick={() => setActiveTab('conta')}>
              Minha Conta
            </li>
            <li className="logout-btn" onClick={() => { logout(); navigate('/login'); }}>Sair</li>
          </ul>
        </aside>

        <main className="profile-content">
          
          {/* --- ABA: VISÃO GERAL (Layout Baseado na Imagem de Referência) --- */}
          {activeTab === 'visao-geral' && (
            <div className="overview-container">
              {/* 1. Cabeçalho de Identidade CENTRALIZADO FORA DO CARD */}
              <section className="profile-identity-centered">
                <div className="avatar-placeholder-luxury large">
                  <UserIcon size={60} strokeWidth={1} color="#D4C3A3" />
                </div>
                <h3 className="profile-name-header">{user.nome}</h3>
                <p className="profile-email-header">{user.email}</p>
              </section>

              {/* 2. Cartão de Formulário */}
              <div className="profile-tab-box centered-box">
                <h2 className="content-subtitle">VISÃO GERAL</h2>

                <form className="luxury-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <div className="label-row">
                      <label>NOME COMPLETO *</label>
                      <button type="button" className="btn-edit-text">Editar</button>
                    </div>
                    <input type="text" defaultValue={user.nome} className="luxury-input" />
                  </div>
                  
                  <div className="input-group">
                    <label>SENHA *</label>
                    <input type="password" placeholder="Crie uma senha" className="luxury-input" />
                  </div>
                  
                  <div className="input-group">
                    <label>CONFIRMAR SENHA *</label>
                    <input type="password" placeholder="Confirme sua senha" className="luxury-input" />
                  </div>

                  {/* Checkbox de Termos (Visual da Referência) */}
                  <div className="checkbox-terms-row">
                     <input type="checkbox" id="termsBtn" className="luxury-checkbox" />
                     <label htmlFor="termsBtn">
                        Li e aceito os <span className="highlight-link">Termos de Serviço e Política de Privacidade.</span>
                     </label>
                  </div>

                  <button type="submit" className="btn-main-beige full-width">SALVAR ALTERAÇÕES</button>

                  {/* Texto Inferior (Visual da Referência) */}
                  <div className="form-bottom-info">
                    <p>Sua conta está protegida e segura.</p>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ABA: MEUS PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="orders-section">
              <h2 className="content-subtitle">Meus Pedidos</h2>
              <div className="orders-grid">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="order-item-card-refined">
                    <div className="order-header-main">
                      <span className="order-number-txt">Pedido {order.number}</span>
                      <span className="order-status-badge">{order.status}</span>
                    </div>
                    <div className="order-sub-header-refined">
                      <p className="order-date">Data: {order.date}</p>
                      {order.status === 'EM PROCESSAMENTO' && (
                        <button className="btn-edit-link-refined">Editar</button>
                      )}
                    </div>
                    <div className="order-products-list">
                      {order.items.map((item) => (
                        <div key={item.id} className="product-row">
                          <img src={item.imageUrl} alt={item.name} className="product-thumb" />
                          <div className="product-meta">
                            <p className="product-name">{item.name}</p>
                            <p className="product-size">Tamanho: {item.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <button className="btn-view-order-beige">VISUALIZAR PEDIDO</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: MINHA CONTA */}
          {activeTab === 'conta' && (
            <div className="profile-tab-box">
              <h2 className="content-subtitle">Completar Informações</h2>
              <div className="account-info-card-flat">
                <div className="card-header-row">
                  <h3>INFORMAÇÕES DE CONTA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body-simple">
                  <p className="text-bold">{user.nome}</p>
                  <p className="text-muted">{user.email}</p>
                  <p className="text-muted">{user.telefone || "(11) 91234-5678"}</p>
                </div>
              </div>
              <div className="account-info-card-flat">
                <div className="card-header-row">
                  <h3>ENDEREÇO DE ENTREGA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body-simple">
                  <p className="text-bold">{user.nome}</p>
                  <p className="text-muted">{user.endereco?.rua || "Rua Exemplo, 123"}</p>
                  <p className="text-muted">{user.endereco?.cep || "01000-000"}</p>
                </div>
              </div>
              <div className="security-completion-section">
                <h3 className="section-label-small">SEGURANÇA E LOCALIZAÇÃO</h3>
                <div className="form-row">
                  <label>BAIRRO</label>
                  <input type="text" placeholder="Digite o bairro" className="luxury-input" />
                </div>
                <div className="form-split">
                  <div className="form-row">
                    <label>CIDADE</label>
                    <input type="text" placeholder="Digite a cidade" className="luxury-input" />
                  </div>
                  <div className="form-row">
                    <label>UF</label>
                    <select className="luxury-select">
                      <option>Selecione</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                    </select>
                  </div>
                </div>
                <button className="btn-main-beige full-width">FINALIZAR CADASTRO</button>
                <button className="btn-delete-account">Remover Conta</button>
              </div>
            </div>
          )}
        </main>
      </div>

      <div className="profile-footer-benefits">
        <div className="benefit"><Truck size={18}/> Frete grátis acima de R$200</div>
        <div className="benefit"><RotateCcw size={18}/> Devolução gratuita</div>
        <div className="benefit"><ShieldCheck size={18}/> Compra segura</div>
      </div>
      <Footer />
    </div>
  );
}