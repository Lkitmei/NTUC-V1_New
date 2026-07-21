import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 59.00;
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : 3.99;
  const totalCost = subtotal + deliveryFee;

  // Percentage for free delivery progress bar
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFree = FREE_SHIPPING_THRESHOLD - subtotal;

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
          id="shopping-cart-drawer"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-primary text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-headline-md text-lg font-bold">Your Cart</h2>
              <span className="bg-fp-red text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white transition-all"
              id="close-cart-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {subtotal > 0 && (
            <div className="bg-primary-fixed/30 p-4 border-b border-surface-variant">
              <div className="text-xs font-semibold text-on-primary-fixed mb-1.5 flex justify-between">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-green-700 font-bold">🎉 Congratulations! You qualified for FREE delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-fp-red">${remainingForFree.toFixed(2)}</strong> more for <strong>FREE</strong> delivery
                  </span>
                )}
                <span className="text-[10px] text-outline">Goal: ${FREE_SHIPPING_THRESHOLD}</span>
              </div>
              <div className="w-full bg-surface-gray rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    subtotal >= FREE_SHIPPING_THRESHOLD ? 'bg-green-600' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 rounded-full bg-surface-gray flex items-center justify-center text-outline-variant mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-headline-md text-base text-text-main font-bold mb-1">Your cart is empty</h3>
                <p className="text-sm text-outline max-w-[240px] mb-6">
                  Browse our selection of quality fresh groceries and add items to your cart!
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center gap-4 bg-surface-gray/40 p-3 rounded-xl border border-surface-gray/80 hover:border-outline-variant/50 transition-colors group"
                  id={`cart-item-${item.product.id}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-main truncate group-hover:text-primary transition-colors">
                      {item.product.name}
                    </h4>
                    {item.product.unit && (
                      <span className="text-[10px] text-outline block mt-0.5">
                        {item.product.unit}
                      </span>
                    )}
                    <span className="text-xs font-bold text-fp-red block mt-1">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Qty controls & delete */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-outline hover:text-fp-red p-1 rounded hover:bg-surface-gray transition-colors"
                      title="Remove item"
                      id={`remove-item-btn-${item.product.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden bg-white text-xs">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-surface-gray font-bold text-text-main"
                        id={`cart-item-minus-${item.product.id}`}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 font-bold text-text-main min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-surface-gray font-bold text-text-main"
                        id={`cart-item-plus-${item.product.id}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Billing Details */}
          {cartItems.length > 0 && (
            <div className="border-t border-surface-container p-6 bg-surface-container-lowest space-y-4">
              <div className="space-y-2 text-xs text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-main">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-text-main">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>
                <div className="h-px bg-surface-container my-1"></div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-text-main">Estimated Total</span>
                  <span className="font-bold text-fp-red text-base">${totalCost.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                id="cart-checkout-btn"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
