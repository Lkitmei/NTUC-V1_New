import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, Award, ArrowLeft, Download, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

type Step = 'form' | 'success';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('Victor Mei');
  const [phone, setPhone] = useState('+65 8765 4321');
  const [address, setAddress] = useState('123 Pasir Ris Drive 3, #08-234, Singapore 510123');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'linkpoints'>('card');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 59.00;
  const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0.00 : 3.99;
  const totalCost = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in all required fields');
      return;
    }
    // Simulate API request and go to success screen
    setStep('success');
  };

  const handleFinish = () => {
    onOrderSuccess(); // clears the cart & resets
    setStep('form');
    onClose();
  };

  const generateOrderNumber = () => {
    return 'FP-' + Math.floor(100000 + Math.random() * 900000);
  };

  const orderNum = generateOrderNumber();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="checkout-flow-modal"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-surface-gray border-b border-surface-variant flex items-center justify-between">
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-text-main flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            {step === 'form' ? 'Delivery & Checkout' : 'Order Placed Successfully!'}
          </h3>
          {step === 'form' && (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-variant text-outline hover:text-text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto">
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Delivery Form (Left) */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="text-sm font-bold text-text-main border-b border-surface-container pb-2 mb-2">
                  Delivery Details
                </h4>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">
                    Singapore Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">
                    Full Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">
                    Delivery Instruction Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leave at door if no response"
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Payment Methods */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-on-surface-variant mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-3 border rounded-xl gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                          : 'border-outline-variant hover:bg-surface-gray text-on-surface-variant'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-[10px]">Credit / Debit</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex flex-col items-center justify-center p-3 border rounded-xl gap-1.5 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                          : 'border-outline-variant hover:bg-surface-gray text-on-surface-variant'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                      <span className="text-[10px]">Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('linkpoints')}
                      className={`flex flex-col items-center justify-center p-3 border rounded-xl gap-1.5 transition-all ${
                        paymentMethod === 'linkpoints'
                          ? 'border-primary bg-primary-fixed/20 text-primary font-bold'
                          : 'border-outline-variant hover:bg-surface-gray text-on-surface-variant'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-[10px]">LinkPoints Rewards</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Order Summary (Right) */}
              <div className="md:col-span-5 bg-surface-gray/50 p-4 rounded-xl flex flex-col max-h-[420px] md:max-h-full overflow-hidden border border-outline-variant/30">
                <h4 className="text-sm font-bold text-text-main border-b border-surface-container pb-2 mb-3">
                  Order Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h4>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-text-main bg-white px-2 py-0.5 rounded border border-surface-gray">
                        {item.quantity}x
                      </span>
                      <span className="flex-1 truncate text-on-surface">{item.product.name}</span>
                      <span className="font-semibold text-text-main">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-surface-container mt-4 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      <span>${deliveryFee.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="h-px bg-surface-container my-1"></div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-text-main">Total to Pay</span>
                    <span className="text-fp-red">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Form Footer Action */}
            <div className="px-6 py-4 bg-surface-gray/80 border-t border-surface-variant flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-bold text-outline hover:text-text-main"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </button>

              <button
                type="submit"
                className="bg-fp-red hover:bg-fp-red/90 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                id="submit-order-checkout-btn"
              >
                Place Delivery Order — ${totalCost.toFixed(2)}
              </button>
            </div>
          </form>
        ) : (
          /* Order Success screen */
          <div className="p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="font-headline-md text-2xl font-bold text-text-main mb-2">
              Thank you, Victor!
            </h2>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              Your grocery order has been successfully placed. We are preparing your fresh selection to be dispatched to your doorstep.
            </p>

            {/* Receipt Box */}
            <div className="w-full max-w-sm bg-surface-gray/70 border border-outline-variant rounded-xl p-5 mb-8 text-left space-y-3.5 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary rounded-t-xl" />
              
              <div className="flex justify-between text-xs">
                <span className="text-outline">Order Reference:</span>
                <span className="font-bold text-text-main tracking-wider">{orderNum}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-outline">Estimated Delivery:</span>
                <span className="font-bold text-primary">Tomorrow, 10:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-outline">Recipient:</span>
                <span className="font-bold text-text-main">{name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-outline">Ship To:</span>
                <span className="font-bold text-text-main text-right truncate max-w-[200px]" title={address}>
                  {address}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-outline">Payment Method:</span>
                <span className="font-bold text-text-main uppercase">
                  {paymentMethod === 'card' ? 'Visa / Mastercard' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'LinkPoints'}
                </span>
              </div>

              <div className="h-px bg-outline-variant/50 my-2"></div>

              <div className="flex justify-between text-xs font-bold text-text-main">
                <span>Amount Charged:</span>
                <span className="text-fp-red font-bold text-base">${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  alert('Receipt download started! (Simulated)');
                }}
                className="flex items-center gap-1.5 px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-gray transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </button>

              <button
                onClick={handleFinish}
                className="bg-primary hover:bg-primary-container text-white py-2 px-6 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-1"
                id="finish-checkout-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                Keep Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
