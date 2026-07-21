import React from 'react';
import { X, Trash2, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ShoppingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProducts: Product[];
  onToggleFavorite: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (products: Product[]) => void;
  onProductClick: (product: Product) => void;
  isProductInCart: (productId: string) => boolean;
}

export default function ShoppingListDrawer({
  isOpen,
  onClose,
  favoriteProducts,
  onToggleFavorite,
  onAddToCart,
  onAddAllToCart,
  onProductClick,
  isProductInCart,
}: ShoppingListDrawerProps) {
  if (!isOpen) return null;

  const itemsToAdd = favoriteProducts.filter((p) => !isProductInCart(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-all duration-300 translate-x-0"
          id="shopping-list-drawer"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-fp-red to-orange-500 text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-white text-white" />
              <h2 className="font-headline-md text-lg font-bold">My Shopping List</h2>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {favoriteProducts.length} items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-all"
              id="close-shopping-list-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tip Banner */}
          {favoriteProducts.length > 0 && (
            <div className="bg-amber-50 border-b border-amber-100 px-6 py-2.5 flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0 animate-pulse" />
              <span>Tap on any item to view details or add them directly to your cart!</span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 rounded-full bg-red-50 text-fp-red flex items-center justify-center mb-4 animate-pulse">
                  <Heart className="w-10 h-10 fill-fp-red text-fp-red" />
                </div>
                <h3 className="font-headline-md text-base text-text-main font-bold mb-1">Your list is empty</h3>
                <p className="text-sm text-outline max-w-[240px] mb-6">
                  Browse our selection and click the heart on any product to save it to your shopping list!
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-primary-container text-white font-bold py-2 px-6 rounded-xl text-xs transition-all shadow-sm active:scale-95"
                >
                  Start Adding Items
                </button>
              </div>
            ) : (
              favoriteProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3 p-3 bg-white border border-surface-gray rounded-xl hover:shadow-sm transition-all group cursor-pointer"
                  onClick={() => onProductClick(product)}
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-surface-container-lowest border border-surface-gray rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-main truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-outline block mb-0.5">
                      {product.unit}
                    </span>
                    <span className="text-fp-red font-bold text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Add to Cart button */}
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={isProductInCart(product.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isProductInCart(product.id)
                          ? 'bg-green-100 text-green-700 font-bold border border-green-200'
                          : 'bg-primary hover:bg-primary-container text-white shadow-sm hover:scale-105 active:scale-95'
                      }`}
                      title={isProductInCart(product.id) ? "Already in cart" : "Add to cart"}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => onToggleFavorite(product.id)}
                      className="w-8 h-8 rounded-full bg-surface-gray text-outline hover:text-fp-red hover:bg-red-50 flex items-center justify-center transition-all active:scale-95"
                      title="Remove from list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Controls */}
          {favoriteProducts.length > 0 && (
            <div className="border-t border-outline-variant p-5 bg-surface-container-lowest space-y-2.5">
              <button
                onClick={() => onAddAllToCart(itemsToAdd)}
                disabled={itemsToAdd.length === 0}
                className={`w-full font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  itemsToAdd.length === 0
                    ? 'bg-surface-gray text-outline cursor-not-allowed border border-outline-variant/10'
                    : 'bg-primary hover:bg-primary-container text-white cursor-pointer'
                }`}
                id="add-all-list-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                {itemsToAdd.length === 0 ? 'All Items in Cart' : `Add List to Cart (${itemsToAdd.length} ${itemsToAdd.length === 1 ? 'item' : 'items'})`}
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-white hover:bg-surface-gray text-text-main border border-outline-variant font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
