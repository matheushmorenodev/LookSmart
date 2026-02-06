// src/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  sizes: string[];
  color: string;
  imageUrl: string;
  isNew: boolean;
  onSale: boolean;
  description: string;
  details: { label: string; value: string }[];
};

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Tailored Blazer", 
    price: 720.00, 
    category: "Camisas", 
    sizes: ["P", "M", "G"], 
    color: "#000", 
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    isNew: true, 
    onSale: false,
    description: "Elegant and timeless blazer with a slim fit, crafted from premium wool.",
    details: [
      { label: "Composição", value: "100% Lã fria italiana" },
      { label: "Botões", value: "Banhados a ouro 18k" }
    ]
  },
  { 
    id: 2, 
    name: "Slip Dress Silk", 
    price: 450.00, 
    oldPrice: 600.00,
    category: "Vestidos", 
    sizes: ["M", "G"], 
    color: "#D4C3A3", 
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
    isNew: false, 
    onSale: true,
    description: "Sophisticated silk dress with adjustable straps.",
    details: [
      { label: "Material", value: "100% Seda Pura" },
      { label: "Cuidado", value: "Lavagem a seco" }
    ]
  },
  { id: 3, name: "Oversized White Shirt", price: 320.00, category: "Camisas", sizes: ["P", "M", "G", "GG"], color: "#FFF", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", isNew: true, onSale: false, description: "Classic white shirt for any occasion.", details: [{label: "Tecido", value: "Algodão Egípcio"}] },
  { id: 4, name: "High-Waist Trousers", price: 580.00, oldPrice: 720.00, category: "Calças", sizes: ["36", "38", "40"], color: "#2C3E50", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800", isNew: false, onSale: true, description: "Perfect fit high-waist trousers.", details: [{label: "Corte", value: "Alfaiataria"}] },
  { id: 5, name: "Minimalist Knit", price: 290.00, category: "Camisas", sizes: ["P", "M"], color: "#D1D1D1", imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800", isNew: false, onSale: false, description: "Soft knit for daily wear.", details: [{label: "Lã", value: "Merino"}] },
  { id: 6, name: "Evening Gown", price: 1200.00, category: "Vestidos", sizes: ["M"], color: "#000", imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800", isNew: true, onSale: false, description: "Stunning evening gown for gala events.", details: [{label: "Forro", value: "Seda"}] },
  { id: 7, name: "Classic Trench Coat", price: 980.00, oldPrice: 1300.00, category: "Casacos", sizes: ["P", "M", "G"], color: "#D4C3A3", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800", isNew: false, onSale: true, description: "A timeless piece for rain or shine.", details: [{label: "Resistência", value: "À prova d'água"}] },
  { id: 8, name: "Wool Scarf", price: 150.00, category: "Acessórios", sizes: ["Único"], color: "#8E44AD", imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800", isNew: true, onSale: false, description: "Warm wool scarf for winter.", details: [{label: "Composição", value: "100% Lã"}] },
  { id: 9, name: "Leather Handbag", price: 1100.00, category: "Acessórios", sizes: ["Único"], color: "#000", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", isNew: false, onSale: false, description: "Premium leather handbag with gold details.", details: [{label: "Couro", value: "Legítimo"}] },
  { id: 10, name: "Pleated Skirt", price: 420.00, oldPrice: 550.00, category: "Saias", sizes: ["P", "M"], color: "#E6B0AA", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800", isNew: false, onSale: true, description: "Flowy pleated skirt with metallic finish.", details: [{label: "Efeito", value: "Plissado"}] },
];