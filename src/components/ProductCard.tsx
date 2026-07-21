import React, { useState } from 'react';
import { Star, Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isAdded: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onProductClick,
  isAdded,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper for rendering badges with appropriate theme colors
  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case 'save':
        return 'bg-fp-red text-white';
      case 'any2':
        return 'bg-secondary text-white';
      case 'spend':
        return 'bg-primary text-white';
      case 'hot':
        return 'bg-fp-red text-white font-bold';
      case 'exclusive':
        return 'bg-primary-container text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div 
      className="product-card flex flex-col bg-white border border-surface-gray rounded-xl p-3 relative hover:shadow-md transition-all duration-300 group cursor-pointer"
      onClick={() => onProductClick(product)}
      id={`product-card-${product.id}`}
    >
      {/* Badge (Promo text) */}
      {product.badge && (
        <span className={`absolute top-2 left-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md z-10 shadow-sm ${getBadgeStyle(product.badgeType)}`}>
          {product.badge}
        </span>
      )}

      {/* Favorite Heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-outline hover:text-fp-red transition-all shadow-sm z-10"
        id={`fav-btn-${product.id}`}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`w-4.5 h-4.5 transition-colors ${
            isFavorite ? 'fill-fp-red text-fp-red scale-110' : 'text-outline hover:scale-105'
          }`} 
        />
      </button>

      {/* Image container */}
      <div className="aspect-square w-full mb-3 relative flex items-center justify-center overflow-hidden bg-surface-container-lowest rounded-lg">
        <img
          alt={product.name}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          src={product.image}
          referrerPolicy="no-referrer"
        />
        {product.isOnlineExclusive && (
          <span className="absolute bottom-1 right-1 bg-surface-container-high/90 text-on-surface-variant text-[9px] font-bold px-1.5 py-0.5 rounded">
            Online Exclusive
          </span>
        )}
      </div>

      {/* Product Content info */}
      <div className="flex flex-col flex-1">
        
        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-fp-red font-bold text-lg sm:text-xl">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-outline line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-text-main line-clamp-2 mb-2 h-10 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating or unit */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3 text-xs text-on-surface-variant">
            {product.rating ? (
              <div className="flex items-center gap-1 bg-surface-gray px-1.5 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                <span className="font-bold text-text-main">{product.rating}</span>
                <span className="text-[10px] text-outline">({product.reviewsCount})</span>
              </div>
            ) : (
              <span className="text-[11px] text-outline italic">No reviews yet</span>
            )}
            
            {product.unit && (
              <span className="text-[11px] font-medium text-outline bg-surface-gray px-1.5 py-0.5 rounded">
                {product.unit}
              </span>
            )}
          </div>

          {/* Add To Cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className={`w-full py-2 border rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
              isAdded
                ? 'bg-primary border-primary text-white hover:bg-primary-container'
                : 'bg-white border-primary text-primary hover:bg-primary-fixed/20'
            }`}
            id={`add-to-cart-btn-${product.id}`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
