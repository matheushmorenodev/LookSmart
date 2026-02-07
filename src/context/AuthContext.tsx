// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MOCK_USERS, type UserData } from '../data/users'; // Importe os dados

// Usaremos a interface UserData do nosso mock
interface AuthContextType {
  user: UserData | null;
  login: (email: string) => boolean; // Retorna true se achou o usuário
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem('looksmart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string) => {
    // 1. Busca o usuário no "banco de dados" mockado
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      // 2. Se achou, salva no estado e no LocalStorage
      setUser(foundUser);
      localStorage.setItem('looksmart_user', JSON.stringify(foundUser));
      return true;
    } else {
      // 3. Se não achou, retorna falso (poderia exibir um erro)
      console.error("Usuário não encontrado");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('looksmart_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};