import React, { useState } from 'react';
import { X, HelpCircle, PhoneCall, Mail, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

interface HelpCentreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  q: string;
  a: string;
}

export default function HelpCentreModal({ isOpen, onClose }: HelpCentreModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs: FAQItem[] = [
    {
      q: 'How much are the delivery fees for online orders?',
      a: 'Standard home delivery is FREE for all orders totaling $59.00 or more! For orders below $59.00, a minimal delivery service fee of $3.99 applies to ensure safe and refrigerated transport of your products.'
    },
    {
      q: 'What is the Freshness Guarantee policy?',
      a: 'We pride ourselves on delivery quality. If any fresh fruit, vegetable, meat, or dairy item does not meet your expectations upon delivery, simply capture a photo and request a refund or replacement via our app within 7 days. We offer a 100% money back guarantee.'
    },
    {
      q: 'How do I earn or redeem LinkPoints?',
      a: 'You can link your Linkpoints account during the checkout step or under your profile tab. Earn 1 Linkpoint for every $1 spent on groceries, and redeem 100 Linkpoints to save $1 off your checkout subtotal!'
    },
    {
      q: 'Can I cancel or modify my delivery slot?',
      a: 'Yes, slots can be cancelled or rescheduled up to 12 hours before your selected delivery window. Go to "My Orders", choose your active delivery, and tap "Change Slot".'
    },
    {
      q: 'What should I do if an item is missing from my order?',
      a: 'In rare instances of stock-outs, we may swap an item with a high-quality substitute or issue a refund immediately. Check your invoice receipt inside the package or contact support with your order number.'
    }
  ];

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        id="help-centre-modal"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            <h2 className="font-headline-md text-lg font-bold">Help Centre</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
            id="close-help-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Support Channels */}
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-3">
              Need Direct Assistance?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <a 
                href="tel:18002104321"
                className="flex flex-col items-center p-3.5 bg-surface-gray hover:bg-primary-fixed/20 border border-outline-variant/30 rounded-xl transition-all hover:border-primary/30 text-center"
              >
                <PhoneCall className="w-5 h-5 text-primary mb-1.5" />
                <span className="text-xs font-bold text-text-main">Call Hotline</span>
                <span className="text-[9px] text-outline mt-0.5">1800-210-4321</span>
              </a>

              <a 
                href="mailto:support@fairprice-groceries.sg"
                className="flex flex-col items-center p-3.5 bg-surface-gray hover:bg-primary-fixed/20 border border-outline-variant/30 rounded-xl transition-all hover:border-primary/30 text-center"
              >
                <Mail className="w-5 h-5 text-primary mb-1.5" />
                <span className="text-xs font-bold text-text-main">Email Support</span>
                <span className="text-[9px] text-outline mt-0.5">Response in 4h</span>
              </a>

              <button 
                onClick={() => {
                  alert('Launching Live Customer Chat... (Simulated)');
                }}
                className="flex flex-col items-center p-3.5 bg-surface-gray hover:bg-primary-fixed/20 border border-outline-variant/30 rounded-xl transition-all hover:border-primary/30 text-center"
              >
                <MessageSquare className="w-5 h-5 text-primary mb-1.5" />
                <span className="text-xs font-bold text-text-main">Live Chat</span>
                <span className="text-[9px] text-outline mt-0.5">Average wait 2m</span>
              </button>
            </div>
          </div>

          {/* FAQs list */}
          <div>
            <h3 className="text-xs font-bold text-outline uppercase tracking-wider mb-3">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="divide-y divide-surface-container border-y border-surface-container">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="py-3">
                    <button
                      onClick={() => toggleIndex(index)}
                      className="w-full flex justify-between items-center text-left text-sm font-semibold text-text-main hover:text-primary transition-colors focus:outline-none"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-outline flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-outline flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-on-surface-variant leading-relaxed bg-surface-gray/40 p-3 rounded-lg border border-surface-gray/50 animate-slide-down">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Business Hours Statement */}
          <div className="bg-primary-fixed/20 border border-primary/10 rounded-xl p-4 text-center">
            <span className="text-[11px] text-on-primary-fixed font-semibold block">
              💡 Our digital logistics warehouse is open 24/7. Delivery slot availability varies during festive seasons.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
