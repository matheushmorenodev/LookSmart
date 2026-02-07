import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';


export default function Login() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');  // estado para o email
  const { login } = useAuth();
  const [password, setPassword] = useState(''); // Estado para a senha
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula o login com o e-mail digitado
    login(email); 
    navigate('/profile');
  };

  return (
    <div className="login-page-container">
      <div className="auth-tabs-nav">
        <button 
          className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          ENTRAR
        </button>
        <button 
          className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          CRIAR CONTA
        </button>
      </div>

      <div className="auth-card-box">
        <h2 className="auth-card-title">
          {activeTab === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
        </h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="auth-input-group">
              <label>NOME COMPLETO *</label>
              <input type="text" placeholder="Digite seu nome" required />
            </div>
          )}

          <div className="auth-input-group">
            <label>E-MAIL *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite seu e-mail" 
              required 
            />
          </div>

          <div className="auth-input-group">
            <label>SENHA *</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha" 
              required 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {activeTab === 'login' ? 'ENTRAR' : 'CADASTRAR'}
          </button>
        </form>

        {activeTab === 'login' && (
          <button className="forgot-password-txt">Esqueceu a senha ?</button>
        )}

        <div className="auth-divider-line">
          <span>ou</span>
        </div>

        <button className="google-login-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
          Continuar com Google
        </button>
      </div>
    </div>
  );
}