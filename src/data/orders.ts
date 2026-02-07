// src/data/orders.ts

export interface OrderItem {
  id: number;
  name: string;
  size: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: 'EM PROCESSAMENTO' | 'ENVIADO' | 'CONCLUÍDO';
  items: OrderItem[];
}

export const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    number: '#123456',
    date: '12 de fevereiro de 2024',
    status: 'EM PROCESSAMENTO',
    items: [
      { id: 1, name: 'Tailored Blazer', size: 'P', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
      { id: 2, name: 'Slip Dress', size: 'M', imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' }
    ]
  },
  {
    id: '2',
    number: '#123456',
    date: '12 de fevereiro de 2024',
    status: 'ENVIADO',
    items: [
      { id: 1, name: 'Tailored Blazer', size: 'P', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
      { id: 2, name: 'Slip Dress', size: 'M', imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' }
    ]
  },
  {
    id: '3',
    number: '#123456',
    date: '15 de janeiro de 2024',
    status: 'CONCLUÍDO',
    items: [
      { id: 1, name: 'Tailored Blazer', size: 'P', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
      { id: 2, name: 'Slip Dress', size: 'M', imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' }
    ]
  }
];