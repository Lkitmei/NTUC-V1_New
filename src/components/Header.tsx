import React, { useState } from 'react';
import { ShoppingCart, Search, MapPin, User, LogOut, HelpCircle, ChevronDown, Sparkles, Flame, X, Heart } from 'lucide-react';
import { CATEGORIES, MAIN_TABS } from '../data';

interface HeaderProps {
  activeTab: typeof MAIN_TABS[number];
  setActiveTab: (tab: typeof MAIN_TABS[number]) => void;
  activeCategory: typeof CATEGORIES[number];
  setActiveCategory: (category: typeof CATEGORIES[number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
  onOpenHelp: () => void;
  onOpenAuth: (type: 'login' | 'signup') => void;
  userEmail: string | null;
  onLogout: () => void;
  onOpenShoppingList: () => void;
  shoppingListItemsCount: number;
}

const formatCategoryName = (cat: string) => {
  if (cat === 'dairy, chilled & eggs') return 'Dairy, Chilled & Eggs';
  if (cat === 'fruits & vegetables') return 'Fruits & Vegetables';
  if (cat === 'health & wellness') return 'Health & Wellness';
  return cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export default function Header({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartItemsCount,
  onOpenCart,
  onOpenHelp,
  onOpenAuth,
  userEmail,
  onLogout,
  onOpenShoppingList,
  shoppingListItemsCount,
}: HeaderProps) {
  const [postalCode, setPostalCode] = useState('Enter your address or postal code');
  const [isEditingPostal, setIsEditingPostal] = useState(false);
  const [tempPostal, setTempPostal] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddressPrompt, setShowAddressPrompt] = useState(() => {
    try {
      const saved = localStorage.getItem('fp_show_address_prompt');
      return saved !== 'false';
    } catch (e) {
      return true;
    }
  });

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
        
        {/* Top Header Row: Logo, Deliver to (left), Help Centre, Auth, Cart (right) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2.5 border-b border-surface-container/50 sm:border-none">
          {/* Logo and Deliver To Selector Group */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            {/* Logo */}
            <div 
              onClick={() => {
                setActiveTab('Categories');
                setActiveCategory('dairy, chilled & eggs');
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
                <span className="text-[10px] text-fp-red font-bold uppercase tracking-wider block">Online Store</span>
              </div>
            </div>

            {/* Deliver To address selector */}
            <div className="flex-shrink-0">
              {isEditingPostal ? (
                <form onSubmit={handlePostalSubmit} className="flex items-center gap-1 bg-white border border-primary p-1 rounded-xl shadow-sm">
                  <input
                    type="text"
                    placeholder="e.g. 530026"
                    className="px-2 py-1 text-xs outline-none w-28 sm:w-36 text-text-main font-semibold"
                    value={tempPostal}
                    onChange={(e) => setTempPostal(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="text-primary hover:underline text-xs font-bold px-1.5 py-0.5">Save</button>
                  <button type="button" onClick={() => setIsEditingPostal(false)} className="text-outline hover:underline text-xs px-1 py-0.5 font-semibold">Cancel</button>
                </form>
              ) : (
                <div className="relative flex items-center gap-1.5">
                  <button 
                    onClick={() => {
                      setTempPostal(postalCode === 'Enter your address or postal code' ? '' : postalCode);
                      setIsEditingPostal(true);
                    }}
                    className="flex items-center gap-1.5 hover:text-primary hover:bg-primary-fixed/30 bg-primary-fixed/15 border border-primary/20 px-3 py-1.5 rounded-full transition-all duration-200 font-semibold cursor-pointer group"
                    id="postal-code-trigger"
                    title="Click to change delivery address"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary animate-bounce" />
                    <span className="text-[11px] text-primary font-bold">Deliver to:</span>
                    <span className="truncate max-w-[120px] sm:max-w-[180px] text-[11px] text-text-main underline decoration-dashed decoration-primary/50 group-hover:decoration-primary font-medium">{postalCode}</span>
                    <ChevronDown className="w-3 h-3 text-primary group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  {/* Desktop Bouncing Pointer Tooltip */}
                  {showAddressPrompt && (
                    <div className="hidden md:flex absolute left-full ml-3 items-center gap-1.5 pointer-events-auto whitespace-nowrap bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-[bounce_1.2s_infinite] z-20">
                      <span className="text-sm select-none">👈</span>
                      <span className="font-extrabold tracking-wide">Click to change address!</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAddressPrompt(false);
                          try {
                            localStorage.setItem('fp_show_address_prompt', 'false');
                          } catch (err) {}
                        }}
                        className="ml-1.5 hover:bg-white/25 p-0.5 rounded transition-all cursor-pointer flex items-center justify-center text-white/90 hover:text-white"
                        title="Dismiss prompt"
                        id="close-address-prompt"
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-amber-600"></div>
                    </div>
                  )}

                  {/* Mobile/Tablet Bouncing Indicator */}
                  {showAddressPrompt && (
                    <span className="inline-flex md:hidden text-sm animate-[bounce_0.8s_infinite] pointer-events-none select-none" title="Change address">
                      👈
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Controls: Help Centre, Auth, Cart */}
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 flex-shrink-0 text-xs font-medium text-on-surface-variant w-full sm:w-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={onOpenHelp}
                className="hover:text-primary transition-colors flex items-center gap-1 font-semibold py-1.5 cursor-pointer"
                id="help-center-button"
              >
                <HelpCircle className="w-4 h-4 text-outline" />
                <span className="hidden sm:inline">Help Centre</span>
              </button>
              
              <div className="h-3 w-px bg-outline-variant"></div>
              
              {userEmail ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full text-xs font-semibold">
                    <User className="w-3 h-3" />
                    <span className="max-w-[70px] sm:max-w-[100px] truncate">{userEmail.split('@')[0]}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="hover:text-fp-red transition-colors flex items-center gap-1 font-semibold text-outline cursor-pointer"
                    title="Log out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button 
                    onClick={() => onOpenAuth('signup')}
                    className="px-2 py-1 border border-primary text-primary hover:bg-primary-fixed/30 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                    id="signup-button"
                  >
                    Sign up
                  </button>
                  <button 
                    onClick={() => onOpenAuth('login')}
                    className="px-2 py-1 bg-primary hover:bg-primary-container text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                    id="login-button"
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-outline-variant hidden sm:block"></div>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 text-primary hover:bg-primary-fixed/20 border border-primary/20 px-3 py-1.5 rounded-xl cursor-pointer transition-all hover:shadow-sm flex-shrink-0"
              id="cart-trigger-button"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-fp-red text-white text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-white animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-xs">Cart</span>
            </button>
          </div>
        </div>

        {/* Main Tab Bar with My List and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-2 border-t border-surface-container pt-3">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-shrink-0 py-1">
            {/* Categories Main Tab with Click Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('Categories');
                  setSearchQuery('');
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`py-1.5 px-4 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'Categories'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-gray'
                }`}
                id="main-tab-categories"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <div 
                    className="absolute left-0 mt-1.5 w-48 bg-white border border-surface-variant rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in duration-100"
                  >
                    {CATEGORIES.map((cat) => {
                      const isCatActive = activeTab === 'Categories' && activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setActiveTab('Categories');
                            setActiveCategory(cat);
                            setSearchQuery('');
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-all duration-150 flex items-center justify-between cursor-pointer ${
                            isCatActive
                              ? 'bg-primary/10 text-primary font-extrabold'
                              : 'text-text-main hover:bg-surface-gray hover:text-primary'
                          }`}
                        >
                          <span>{formatCategoryName(cat)}</span>
                          {isCatActive && <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Promotion Main Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('Promotion');
                setSearchQuery('');
                setIsDropdownOpen(false);
              }}
              className={`py-1.5 px-4 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'Promotion'
                  ? 'bg-fp-red text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-fp-red hover:bg-fp-red/10'
              }`}
              id="main-tab-promotion"
            >
              <Flame className={`w-3.5 h-3.5 text-fp-red ${activeTab === 'Promotion' ? 'text-white animate-pulse' : 'animate-[pulse_1s_infinite]'}`} />
              <span>Promotion</span>
            </button>

            {/* Store Finder Main Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('Store Finder');
                setSearchQuery('');
                setIsDropdownOpen(false);
              }}
              className={`py-1.5 px-4 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'Store Finder'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-gray'
              }`}
              id="main-tab-store-finder"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Store Finder</span>
            </button>

            {/* My List beside Store Finder */}
            <button
              onClick={onOpenShoppingList}
              className="py-1.5 px-4 rounded-lg font-bold text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer text-fp-red hover:bg-red-50 border border-fp-red/20 hover:shadow-sm"
              id="shopping-list-trigger-button"
              title="Open My Shopping List"
            >
              <div className="relative">
                <Heart className="w-3.5 h-3.5 fill-fp-red text-fp-red" />
                {shoppingListItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {shoppingListItemsCount}
                  </span>
                )}
              </div>
              <span>My List</span>
            </button>
          </div>

          {/* Search bar beside My List */}
          <div className="flex-1 max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl relative">
            <input
              type="text"
              className="w-full bg-surface-gray border-none rounded-xl py-2 pl-11 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-main placeholder-outline transition-all"
              placeholder="Search for fresh vegetables, milk, chicken, rice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="global-search-input"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs sm:text-sm font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Subcategories Pills bar - only visible when Categories is active */}
        {activeTab === 'Categories' && (
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto hide-scrollbar border-t border-surface-container pt-2 animate-in slide-in-from-top-1 duration-200">
            <span className="text-[10px] text-outline font-extrabold uppercase tracking-wider px-2 py-1">Browse:</span>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery('');
                  }}
                  className={`py-1 px-3 rounded-full font-bold text-[11px] whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-primary-fixed text-on-primary-fixed border border-primary shadow-sm'
                      : 'text-text-main bg-surface-gray hover:bg-primary-fixed/20 border border-transparent'
                  }`}
                >
                  {formatCategoryName(cat)}
                </button>
              );
            })}
          </div>
        )}
        
      </div>
    </nav>
  );
}
