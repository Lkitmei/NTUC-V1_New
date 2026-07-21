import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Zap, Flame, Sparkles, Plus } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartWithQty: (product: Product, quantity: number) => void;
  currentCartQty: number;
  onSelectProduct?: (product: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCartWithQty,
  currentCartQty,
  onSelectProduct,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAddToCartWithQty(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        id="product-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-surface-gray hover:bg-surface-variant text-text-main hover:text-primary transition-all z-10"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Side */}
        <div className="md:w-1/2 bg-surface-gray p-6 flex items-center justify-center relative min-h-[250px] md:min-h-0">
          <img
            alt={product.name}
            className="max-h-[280px] md:max-h-[380px] w-full object-contain mix-blend-multiply"
            src={product.image}
            referrerPolicy="no-referrer"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-fp-red text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
              {product.badgeType === 'any2' && <Flame className="w-3.5 h-3.5 fill-white text-white animate-pulse" />}
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info Side */}
        <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto">
          {/* Category breadcrumb */}
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary mb-1">
            {product.category} {product.subCategory && `> ${product.subCategory}`}
          </span>

          {/* Title */}
          <h2 className="font-headline-md text-xl font-bold text-text-main mb-2">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            {product.rating ? (
              <div className="flex items-center gap-1 bg-surface-gray px-2 py-0.5 rounded text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                <span>{product.rating}</span>
                <span className="text-outline">({product.reviewsCount} reviews)</span>
              </div>
            ) : (
              <span className="text-xs text-outline italic">No reviews yet</span>
            )}
            {product.unit && (
              <span className="text-xs text-outline font-semibold bg-surface-gray px-2 py-0.5 rounded">
                Pack Size: {product.unit}
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-surface-gray/50 p-3 rounded-xl mb-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-fp-red font-bold text-2xl">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-outline line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-[10px] text-fp-red font-bold block mt-1">
                Save ${(product.originalPrice - product.price).toFixed(2)} instantly!
              </span>
            )}
            {product.badgeType === 'any2' && (
              <div className="mt-2 flex items-center gap-1.5 bg-fp-red/10 border border-fp-red/20 text-fp-red px-2.5 py-1 rounded-lg text-xs font-extrabold animate-[pulse_2s_infinite]">
                <Flame className="w-3.5 h-3.5 fill-fp-red text-fp-red animate-pulse" />
                <span>Any 2 at $9.95 — Mix & Match Offer!</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4 flex-1">
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">
              Product Description
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Cross-selling items for Any 2 promo */}
          {product.badgeType === 'any2' && (
            <div className="border-t border-surface-container pt-3 mb-4">
              <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2 flex items-center gap-1.5 text-fp-red">
                <Sparkles className="w-3.5 h-3.5 text-fp-red fill-fp-red" />
                Other "Any 2 at $9.95" Items
              </h4>
              <p className="text-[11px] text-on-surface-variant mb-2">
                Add these other eligible items to mix & match and qualify for the $9.95 deal:
              </p>
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {PRODUCTS.filter(p => p.badgeType === 'any2' && p.id !== product.id).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct?.(item)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-surface-gray hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer bg-surface-gray/35"
                  >
                    <img
                      alt={item.name}
                      src={item.image}
                      className="w-10 h-10 object-contain rounded bg-white p-1"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11px] font-bold text-text-main truncate hover:text-primary transition-colors">
                        {item.name}
                      </h5>
                      <span className="text-[10px] text-outline font-semibold">
                        ${item.price.toFixed(2)} {item.unit && `• ${item.unit}`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCartWithQty(item, 1);
                      }}
                      className="text-[10px] bg-primary text-white hover:bg-primary-container font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      Add 1
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery highlights */}
          <div className="space-y-2 mb-6 text-xs text-on-surface-variant border-t border-surface-container pt-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free delivery for orders above $59.00</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Freshness guaranteed or 100% money back</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-green-600" />
              <span>Hassle-free 7-day return policy</span>
            </div>
          </div>

          {/* Quantity selector and Add Button */}
          <div className="mt-auto pt-4 border-t border-surface-container">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center border border-outline-variant rounded-xl overflow-hidden bg-surface-gray">
                <button
                  onClick={handleDecrement}
                  className="px-3.5 py-2 hover:bg-surface-variant text-text-main font-bold transition-colors text-sm"
                  id="qty-modal-minus"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-sm text-text-main min-w-[36px] text-center bg-white">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-3.5 py-2 hover:bg-surface-variant text-text-main font-bold transition-colors text-sm"
                  id="qty-modal-plus"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 bg-primary hover:bg-primary-container text-white py-2.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md"
                id="qty-modal-add-btn"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                Add Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
            {currentCartQty > 0 && (
              <span className="text-[11px] text-primary font-semibold text-center block mt-2">
                Currently {currentCartQty} of this item in your cart
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
