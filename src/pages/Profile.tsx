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
        <aside className="profile-sidebar">
          <h3 className="sidebar-label">MEU PERFIL</h3>
          <ul className="profile-menu">
            <li className={activeTab === 'visao-geral' ? 'active' : ''} onClick={() => setActiveTab('visao-geral')}>Visão Geral</li>
            <li className={activeTab === 'pedidos' ? 'active' : ''} onClick={() => setActiveTab('pedidos')}>Meus Pedidos</li>
            <li className={activeTab === 'conta' ? 'active' : ''} onClick={() => setActiveTab('conta')}>Minha Conta</li>
            <li className="logout-btn" onClick={() => { logout(); navigate('/login'); }}>Sair</li>
          </ul>
        </aside>

        <main className="profile-content">
          {/* ABA: VISÃO GERAL - Layout Limpo e Centralizado */}
          {activeTab === 'visao-geral' && (
            <div className="profile-tab-box">
              <h2 className="content-subtitle">VISÃO GERAL</h2>
              <section className="profile-identity-section">
                <div className="avatar-placeholder-luxury">
                  <UserIcon size={50} strokeWidth={1} color="#D4C3A3" />
                </div>
                <h3 className="profile-name-text">{user.nome}</h3>
                <p className="profile-email-text">{user.email}</p>
              </section>

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
                  <input type="password" placeholder="Digite a nova senha" className="luxury-input" />
                </div>
                <div className="input-group">
                  <label>CONFIRMAR SENHA *</label>
                  <input type="password" placeholder="Confirme a nova senha" className="luxury-input" />
                </div>
                <button type="submit" className="btn-main-beige">ALTERAR INFORMAÇÕES</button>
              </form>
            </div>
          )}

          {/* ABA: MEUS PEDIDOS - Grid de Cards */}
          {activeTab === 'pedidos' && (
            <div className="profile-tab-box">
              <h2 className="content-subtitle">Meus Pedidos</h2>
              <div className="orders-grid">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="order-item-card">
                    <div className="order-header">
                      <span className="order-id">Pedido {order.number}</span>
                      <span className="order-status-tag">{order.status}</span>
                    </div>
                    <div className="order-sub-header">
                      <p>Data: {order.date}</p>
                      {order.status === 'EM PROCESSAMENTO' && <button className="btn-edit-text">Editar</button>}
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
                      <button className="btn-main-beige">VISUALIZAR PEDIDO</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: MINHA CONTA - Blocos de Informação */}
          {activeTab === 'conta' && (
            <div className="profile-tab-box">
              <h2 className="content-subtitle">Minha Conta</h2>
              <div className="account-info-card">
                <div className="card-header-row">
                  <h3>INFORMAÇÕES DE CONTA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body">
                  <p className="info-main">{user.nome}</p>
                  <p className="info-sub">{user.email}</p>
                  <p className="info-sub">{user.telefone}</p>
                  <div className="card-action-end">
                    <button className="btn-main-beige small">VISUALIZAR PEDIDO</button>
                  </div>
                </div>
              </div>

              <div className="account-info-card">
                <div className="card-header-row">
                  <h3>ENDEREÇO DE ENTREGA</h3>
                  <button className="btn-edit-text">Editar</button>
                </div>
                <div className="card-body">
                  <p className="info-main">{user.nome}</p>
                  <p className="info-sub">{user.endereco.rua}</p>
                  <p className="info-sub">{user.endereco.cidade}, {user.endereco.estado}</p>
                  <p className="info-sub">{user.endereco.cep}</p>
                  <div className="card-action-end">
                    <button className="btn-main-beige small">VISUALIZAR PEDIDO</button>
                  </div>
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