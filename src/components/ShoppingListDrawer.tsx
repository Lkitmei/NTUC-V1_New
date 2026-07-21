import React, { useState, useEffect } from 'react';
import { X, Trash2, Heart, ShoppingCart, Sparkles, Check } from 'lucide-react';
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Initialize selected IDs to all items NOT already in cart when drawer opens
  useEffect(() => {
    if (isOpen) {
      const defaultSelected = favoriteProducts
        .filter((p) => !isProductInCart(p.id))
        .map((p) => p.id);
      setSelectedIds(defaultSelected);
    }
  }, [isOpen, favoriteProducts, isProductInCart]);

  if (!isOpen) return null;

  const itemsNotInCart = favoriteProducts.filter((p) => !isProductInCart(p.id));
  const selectedProductsToQuantity = favoriteProducts.filter(
    (p) => selectedIds.includes(p.id) && !isProductInCart(p.id)
  );

  const toggleSelect = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    const allNotInCartSelected = itemsNotInCart.every((p) => selectedIds.includes(p.id));

    if (allNotInCartSelected) {
      // Deselect all that are not in cart
      setSelectedIds((prev) => prev.filter((id) => !itemsNotInCart.some((p) => p.id === id)));
    } else {
      // Select all that are not in cart
      const notInCartIds = itemsNotInCart.map((p) => p.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...notInCartIds])));
    }
  };

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
              <span>Tap on any item to view details, toggle selection, or add to cart!</span>
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
              <div className="space-y-4">
                {/* Select All Row */}
                {itemsNotInCart.length > 0 && (
                  <div 
                    onClick={handleSelectAll}
                    className="flex items-center gap-3 px-3 py-2.5 bg-surface-gray/50 border border-outline-variant/30 rounded-xl cursor-pointer hover:bg-surface-gray transition-colors select-none"
                  >
                    <div className="flex-shrink-0">
                      <div 
                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          itemsNotInCart.every((p) => selectedIds.includes(p.id))
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'border border-outline bg-white'
                        }`}
                      >
                        {itemsNotInCart.every((p) => selectedIds.includes(p.id)) && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-text-main">
                      Select All ({itemsNotInCart.length} {itemsNotInCart.length === 1 ? 'item' : 'items'} to add)
                    </span>
                  </div>
                )}

                {favoriteProducts.map((product) => {
                  const inCart = isProductInCart(product.id);
                  const isSelected = selectedIds.includes(product.id);

                  return (
                    <div 
                      key={product.id}
                      className={`flex items-center gap-3 p-3 bg-white border rounded-xl hover:shadow-sm transition-all group cursor-pointer ${
                        isSelected && !inCart ? 'border-primary/30 bg-primary/5' : 'border-surface-gray'
                      }`}
                      onClick={() => {
                        if (!inCart) {
                          toggleSelect(product.id);
                        }
                      }}
                    >
                      {/* Checkbox */}
                      <div 
                        className="flex-shrink-0" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!inCart) {
                            toggleSelect(product.id);
                          }
                        }}
                      >
                        {inCart ? (
                          <div className="w-5 h-5 rounded bg-green-100 text-green-700 flex items-center justify-center border border-green-200 cursor-not-allowed" title="Already in cart">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div 
                            className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'bg-primary border-primary text-white shadow-sm scale-105' 
                                : 'border border-outline hover:border-primary bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        )}
                      </div>

                      {/* Product Image */}
                      <div 
                        className="w-16 h-16 bg-surface-container-lowest border border-surface-gray rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center hover:scale-105 transition-transform"
                        title="Click to view details"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(product);
                        }}
                      >
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
                        <div className="flex items-center justify-between">
                          <span className="text-fp-red font-bold text-sm">
                            ${product.price.toFixed(2)}
                          </span>
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                            className="text-[11px] text-primary hover:underline font-bold"
                          >
                            View details
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {/* Add to Cart button */}
                        <button
                          onClick={() => onAddToCart(product)}
                          disabled={inCart}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            inCart
                              ? 'bg-green-100 text-green-700 font-bold border border-green-200'
                              : 'bg-primary hover:bg-primary-container text-white shadow-sm hover:scale-105 active:scale-95'
                          }`}
                          title={inCart ? "Already in cart" : "Add to cart"}
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
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {favoriteProducts.length > 0 && (
            <div className="border-t border-outline-variant p-5 bg-surface-container-lowest space-y-2.5">
              <button
                onClick={() => {
                  onAddAllToCart(selectedProductsToQuantity);
                  // clear selectedIds for items that were just added
                  setSelectedIds((prev) => prev.filter((id) => !selectedProductsToQuantity.some((p) => p.id === id)));
                }}
                disabled={selectedProductsToQuantity.length === 0}
                className={`w-full font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  selectedProductsToQuantity.length === 0
                    ? 'bg-surface-gray text-outline cursor-not-allowed border border-outline-variant/10'
                    : 'bg-primary hover:bg-primary-container text-white cursor-pointer'
                }`}
                id="add-selected-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                {selectedProductsToQuantity.length === 0 
                  ? 'No Items Selected' 
                  : `Add Selected to Cart (${selectedProductsToQuantity.length} ${selectedProductsToQuantity.length === 1 ? 'item' : 'items'})`}
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
