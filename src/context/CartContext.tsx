import React, { createContext, useContext, useState, ReactNode } from 'react';

// tipagem das informações que o usuario digitar
interface CustomerInfo {
  nome: string;
  email: string;
  endereco: string;
  cidade: string;
  cep: string;
}

// Tipagem do item no carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: any[];
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);


  // 2. Implemente a função que zera o estado
  const clearCart = () => {
    setCart([]);
  };


  const addToCart = (product: any, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.size === size) 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
      <CartContext.Provider value={{ 
        cart, 
        customerInfo, 
        setCustomerInfo,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        cartCount, 
        cartTotal,
        clearCart // 3. Exponha a função aqui
      }}>
        {children}
      </CartContext.Provider>
    );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};