import React, { useState } from 'react';
import { ShoppingCart, Search, MapPin, User, LogOut, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data';

interface HeaderProps {
  activeTab: typeof CATEGORIES[number];
  setActiveTab: (tab: typeof CATEGORIES[number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
  onOpenHelp: () => void;
  onOpenAuth: (type: 'login' | 'signup') => void;
  userEmail: string | null;
  onLogout: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  cartItemsCount,
  onOpenCart,
  onOpenHelp,
  onOpenAuth,
  userEmail,
  onLogout,
}: HeaderProps) {
  const [postalCode, setPostalCode] = useState('Enter your address or postal code');
  const [isEditingPostal, setIsEditingPostal] = useState(false);
  const [tempPostal, setTempPostal] = useState('');

  const handlePostalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPostal.trim()) {
      setPostalCode(tempPostal.trim());
    }
    setIsEditingPostal(false);
  };

  return (
    <nav className="bg-white border-b border-surface-variant sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto py-2">
        
        {/* Top Mini bar */}
        <div className="flex items-center justify-between text-xs font-medium text-on-surface-variant mb-2">
          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors font-semibold py-1">
              Get the app
            </button>
            <div className="h-3 w-px bg-outline-variant"></div>
            {isEditingPostal ? (
              <form onSubmit={handlePostalSubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="e.g. 530026"
                  className="px-2 py-0.5 border border-primary rounded text-xs outline-none focus:ring-1 focus:ring-primary w-40"
                  value={tempPostal}
                  onChange={(e) => setTempPostal(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="text-primary hover:underline text-xs">Save</button>
                <button type="button" onClick={() => setIsEditingPostal(false)} className="text-outline hover:underline text-xs ml-1">Cancel</button>
              </form>
            ) : (
              <div className="relative flex items-center gap-1.5">
                <button 
                  onClick={() => {
                    setTempPostal(postalCode === 'Enter your address or postal code' ? '' : postalCode);
                    setIsEditingPostal(true);
                  }}
                  className="flex items-center gap-1.5 hover:text-primary hover:bg-primary-fixed/30 bg-primary-fixed/15 border border-primary/20 px-2.5 py-1 rounded-full transition-all duration-200 font-semibold cursor-pointer group"
                  id="postal-code-trigger"
                  title="Click to change delivery address"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary animate-bounce" />
                  <span className="text-[11px] text-primary font-bold">Deliver to:</span>
                  <span className="truncate max-w-[140px] sm:max-w-[200px] text-[11px] text-text-main underline decoration-dashed decoration-primary/50 group-hover:decoration-primary font-medium">{postalCode}</span>
                  <ChevronDown className="w-3 h-3 text-primary group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* Desktop Bouncing Pointer Tooltip */}
                <div className="hidden md:flex absolute left-full ml-3 items-center gap-1 pointer-events-none whitespace-nowrap bg-fp-red text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md animate-[bounce_1.2s_infinite] z-20">
                  <span className="text-xs">👈</span>
                  <span>Click to change address!</span>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-fp-red"></div>
                </div>

                {/* Mobile/Tablet Bouncing Indicator */}
                <span className="inline-flex md:hidden text-xs animate-[bounce_0.8s_infinite] pointer-events-none select-none" title="Change address">
                  👈
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenHelp}
              className="hover:text-primary transition-colors flex items-center gap-1 font-semibold py-1"
              id="help-center-button"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help Centre
            </button>
            <div className="h-3 w-px bg-outline-variant"></div>
            {userEmail ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  <User className="w-3 h-3" />
                  <span className="max-w-[100px] truncate">{userEmail.split('@')[0]}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="hover:text-fp-red transition-colors flex items-center gap-1 font-semibold text-outline"
                  title="Log out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="px-2.5 py-1 border border-primary text-primary hover:bg-primary-fixed/30 rounded-lg font-bold text-xs transition-colors"
                  id="signup-button"
                >
                  Sign up
                </button>
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="px-2.5 py-1 bg-primary hover:bg-primary-container text-white rounded-lg font-bold text-xs transition-colors"
                  id="login-button"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Primary Header with Logo and Search */}
        <div className="flex items-center justify-between gap-4 md:gap-8 py-2">
          {/* Logo */}
          <div 
            onClick={() => {
              setActiveTab('Groceries');
              setSearchQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 group"
            id="app-logo-home"
          >
            <img 
              alt="FairPrice Logo" 
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLugE-gf0LRFfcyOzca9YBDdH4TYl0ySeqxdREjGT6WOOfnuh5W1m_bSTvDbRTEkOZb-BGxEDJ8WC3zyFlbU-HgZwLeAaPwp3QxL8pRTMMaQxBy4H3vuEPd81p1-kt3jP1Y_YUl9TrUxk6kj5SaAcRf2CWiOr7ZRaeYXXy7C_REt50c5VpCHxjHSCAhqhglOlMws5re-jdpI-63gzBR3RDRhI-KhA2eoj3YnOkeP5jJbkkOg0bi2ycjH8rc"
            />
            <div className="hidden sm:block">
              <span className="font-headline-md tracking-tight text-primary text-lg block leading-none font-bold">FairPrice</span>
              <span className="text-[10px] text-fp-red font-bold uppercase tracking-wider block">Groceries</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              className="w-full bg-surface-gray border-none rounded-xl py-2.5 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-main placeholder-outline transition-all"
              placeholder="Search for fresh vegetables, milk, chicken, rice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="global-search-input"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-sm font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 text-primary hover:bg-primary-fixed/20 border border-primary/20 px-4 py-2.5 rounded-xl cursor-pointer transition-all hover:shadow-sm flex-shrink-0"
            id="cart-trigger-button"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-fp-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="font-bold text-sm hidden md:inline">Cart</span>
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-1 mt-2 overflow-x-auto hide-scrollbar border-t border-surface-container pt-2">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery('');
                }}
                className={`py-1.5 px-4 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-gray'
                }`}
                id={`category-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        
      </div>
    </nav>
  );
}
