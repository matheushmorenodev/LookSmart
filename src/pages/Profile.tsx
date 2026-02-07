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
  const [activeTab, setActiveTab] = useState('pedidos'); 

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const handleMenuClick = (id: string) => {
    if (id === 'sair') {
      logout();
      navigate('/login');
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-header">
        <h1 className="main-page-title">
          {activeTab === 'pedidos' ? 'Meus Pedidos' : 
           activeTab === 'conta' ? 'Minha Conta' : 'Meu Perfil'}
        </h1>
      </div>

      <div className="profile-main-layout">
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
            <li className="logout-btn" onClick={() => handleMenuClick('sair')}>Sair</li>
          </ul>
        </aside>

        <main className="profile-content">
          {/* --- ABA: VISÃO GERAL --- */}
          {activeTab === 'visao-geral' && (
            <div className="profile-card reveal">
              <h2 className="card-section-title">VISÃO GERAL</h2>
              <section className="profile-identity-header">
                <div className="profile-avatar-placeholder">
                  <UserIcon size={50} strokeWidth={1} color="#D4C3A3" />
                </div>
                <h3 className="profile-display-name">{user.nome}</h3>
                <p className="profile-display-email">{user.email}</p>
              </section>

              <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                <div className="profile-input-group">
                  <div className="label-row">
                    <label>NOME COMPLETO *</label>
                    <button type="button" className="btn-edit-text">Editar</button>
                  </div>
                  <input type="text" defaultValue={user.nome} className="luxury-input" />
                </div>
                <div className="profile-input-group">
                  <label>SENHA *</label>
                  <input type="password" placeholder="Digite a nova senha" />
                </div>
                <div className="profile-input-group">
                  <label>CONFIRMAR SENHA *</label>
                  <input type="password" placeholder="Confirme a nova senha" />
                </div>
                <button type="submit" className="btn-profile-action">ALTERAR INFORMAÇÕES</button>
              </form>
            </div>
          )}

          {/* --- ABA: MEUS PEDIDOS --- */}
          {activeTab === 'pedidos' && (
            <div className="orders-section reveal">
              <h2 className="content-subtitle">Meus Pedidos</h2>
              <div className="orders-grid">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="order-item-card">
                    <div className="order-header">
                      <span className="order-id">Pedido {order.number}</span>
                      <span className="order-status-tag">{order.status}</span>
                    </div>
                    <div className="order-sub-header">
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

          {/* --- ABA: MINHA CONTA --- */}
          {activeTab === 'conta' && (
            <div className="account-overview reveal">
              <h2 className="content-subtitle">Minha Conta</h2>
              <div className="account-info-card">
                <div className="card-header-row">
                  <h3>INFORMAÇÕES DE CONTA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body-content">
                  <p className="info-main-text">{user.nome}</p>
                  <p className="info-sub-text">{user.email}</p>
                  <p className="info-sub-text">{user.telefone || "(11) 91234-5678"}</p>
                  <button className="btn-view-order-beige-inline">VISUALIZAR PEDIDO</button>
                </div>
              </div>

              <div className="account-info-card">
                <div className="card-header-row">
                  <h3>ENDEREÇO DE ENTREGA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body-content">
                  <p className="info-main-text">{user.nome}</p>
                  <p className="info-sub-text">{user.endereco?.rua || "Rua Exemplo, 123"}</p>
                  <p className="info-sub-text">{user.endereco?.cidade || "São Paulo"}, {user.endereco?.estado || "SP"}</p>
                  <p className="info-sub-text">{user.endereco?.cep || "01000-000"}</p>
                  <button className="btn-view-order-beige-inline">VISUALIZAR PEDIDO</button>
                </div>
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