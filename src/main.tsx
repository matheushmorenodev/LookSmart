import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Importamos o App que tem as rotas
import './styles/index.css' // Seus estilos globais

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)