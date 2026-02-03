import type { Product } from '../../types';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xs uppercase font-medium tracking-tight">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">${product.price}</p>
      </div>
    </div>
  );
};