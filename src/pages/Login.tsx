import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

export default function Login() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simula a lógica de Autenticação/Cadastro
    if (authMode === 'register') {
      // No fluxo de cadastro, enviamos o e-mail para o mock e ele redireciona 
      // para o Profile, que abrirá na aba 'conta' (Completar Cadastro)
      login(email); 
      navigate('/profile');
    } else {
      // No fluxo de login normal, ele também vai para o profile
      const success = login(email);
      if (success) {
        navigate('/profile');
      } else {
        alert("Usuário não encontrado. Use o e-mail do mock.");
      }
    }
  };

  return (
    <div className="login-page-container">
      {/* Navegação entre Entrar e Criar Conta */}
      <div className="auth-tabs-nav">
        <button 
          className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
          onClick={() => setAuthMode('login')}
        >
          ENTRAR
        </button>
        <button 
          className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
          onClick={() => setAuthMode('register')}
        >
          CRIAR CONTA
        </button>
      </div>

      <div className="auth-card-box">
        <h2 className="auth-card-title">
          {authMode === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
        </h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Campo NOME exclusivo para o Cadastro */}
          {authMode === 'register' && (
            <div className="auth-input-group">
              <label>NOME COMPLETO *</label>
              <input 
                type="text" 
                placeholder="Digite seu nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required 
              />
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
            {authMode === 'login' ? 'ENTRAR' : 'CADASTRAR'}
          </button>
        </form>

        <div className="auth-divider-line">
          <span>ou</span>
        </div>

        {/* Botão Google (Design Refinado) */}
        <button className="google-login-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          <span>Continuar com Google</span>
        </button>
      </div>
    </div>
  );
}