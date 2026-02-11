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
  
  // Fluxo inicial: Direto para 'conta' para completar o cadastro
  const [activeTab, setActiveTab] = useState('conta');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-header">
        <h1 className="main-page-title">
          {activeTab === 'pedidos' ? 'Meus Pedidos' : 
           activeTab === 'conta' ? 'Completar Cadastro' : 'Meu Perfil'}
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
          
          {/* 1. ABA: VISÃO GERAL (Resumo de Identidade) */}
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
                <button type="submit" className="btn-main-beige">SALVAR ALTERAÇÕES</button>
              </form>
            </div>
          )}

          {/* ABA: MEUS PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="orders-section">
              <h2 className="content-subtitle">Meus Pedidos</h2>
              <div className="orders-grid">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="order-item-card">
                    
                    {/* 1. Cabeçalho Principal: Pedido e Status separados */}
                    <div className="order-header">
                      <span className="order-id">Pedido {order.number}</span>
                      <span className="order-status-tag">{order.status}</span>
                    </div>

                    {/* 2. Sub-cabeçalho: Data e Botão Editar à direita */}
                    <div className="order-sub-header">
                      <p className="order-date">Data: {order.date}</p>
                      {order.status === 'EM PROCESSAMENTO' && (
                        <button className="btn-edit-link-refined">Editar</button>
                      )}
                    </div>

                    {/* 3. Lista de Produtos */}
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

          {/* 3. ABA: MINHA CONTA (Informações Complementares) */}
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

              {/* Seção de Segurança e Localização para finalização */}
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
      
    </div>
  );
}