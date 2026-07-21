import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, Heart, Flame, Shield, MapPin, Download, ChevronRight, ChevronLeft, MessageSquare, PhoneCall, ShoppingBag, Percent } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES, MAIN_TABS } from './data';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import StoreFinderTab from './components/StoreFinderTab';
import HelpCentreModal from './components/HelpCentreModal';
import AuthModal from './components/AuthModal';

const formatCategoryName = (cat: string) => {
  if (cat === 'dairy, chilled & eggs') return 'Dairy, Chilled & Eggs';
  if (cat === 'fruits & vegetables') return 'Fruits & Vegetables';
  if (cat === 'health & wellness') return 'Health & Wellness';
  return cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<typeof MAIN_TABS[number]>('Categories');
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('dairy, chilled & eggs');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('fp_cart');
    return local ? JSON.parse(local) : [];
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('fp_user_email');
  });
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const local = localStorage.getItem('fp_favorites');
    return local ? JSON.parse(local) : [];
  });

  // UI Control states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'signup' }>({
    isOpen: false,
    type: 'login'
  });

  // --- IMAGE SLIDER FOR HERO BANNER ---
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderBanners = [
    {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
      tag: "Fresh Produce",
      title: "Quality and Freshness Guaranteed",
      description: "Handpicked fresh fruits and vegetables, chilled to preserve peak nutrients, and delivered straight to your door.",
      badgeColor: "bg-fp-red"
    },
    {
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200",
      tag: "Great Value Specials",
      title: "Stock Up Your Pantry & Cupboard",
      description: "Enjoy bulk savings and exclusive discounts on your favorite grains, noodles, and daily household needs.",
      badgeColor: "bg-amber-600"
    },
    {
      image: "https://images.unsplash.com/photo-1543083503-087771d1471d?auto=format&fit=crop&q=80&w=1200",
      tag: "Chilled & Dairy",
      title: "Cold Drinks, Dairy & Farm Fresh Eggs",
      description: "Keep cool with refreshing beverages, high-protein yogurts, organic milk, and golden yolk eggs.",
      badgeColor: "bg-primary"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- EFFECTS FOR SYNCING ---
  useEffect(() => {
    localStorage.setItem('fp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('fp_user_email', userEmail);
    } else {
      localStorage.removeItem('fp_user_email');
    }
  }, [userEmail]);

  // --- CART OPERATIONS ---
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleAddToCartWithQty = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleOrderSuccess = () => {
    setCart([]); // Clear cart
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail(null);
  };

  // --- PRODUCT FILTERING & CLASSIFICATION ---
  // If search query is present, we filter all products.
  // If active tab is Store Finder, we render Store Finder.
  // Otherwise, we display categorized listings.

  const searchFilteredProducts = PRODUCTS.filter((product) => {
    const q = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(q)) ||
      product.description.toLowerCase().includes(q)
    );
  });

  // Split products for modular rendering on main Groceries dashboard
  const flashDeals = PRODUCTS.slice(0, 4); // First 4 are flash deals
  const recommendedForYou = PRODUCTS.slice(4, 10); // Next 6 are recommended
  const whatsHotNow = PRODUCTS.slice(10, 15); // Hot items

  const getProductsForTab = () => {
    return PRODUCTS.filter((p) => p.category === activeCategory);
  };

  const isProductInCart = (id: string) => {
    return cart.some((item) => item.product.id === id);
  };

  const getProductCartQty = (id: string) => {
    const item = cart.find((item) => item.product.id === id);
    return item ? item.quantity : 0;
  };

  // Scroll handler for horizontal scroll sections
  const scrollSection = (id: string, dir: 'left' | 'right') => {
    const container = document.getElementById(id);
    if (container) {
      const scrollAmount = dir === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      
      {/* Top Notification Banner */}
      <div className="bg-primary-container text-white py-1.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 relative overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Spend $59.00 or more to enjoy <strong>FREE Home Delivery</strong>! Shop fresh essentials today.</span>
      </div>

      {/* Header component */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto-scroll to main content area
          document.getElementById('main-content-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          // Auto-scroll to main content area
          document.getElementById('main-content-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAuth={(type) => setAuthModal({ isOpen: true, type })}
        userEmail={userEmail}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Render Store Finder directly if chosen */}
        {activeTab === 'Store Finder' && searchQuery === '' ? (
          <div className="my-6">
            <StoreFinderTab />
          </div>
        ) : searchQuery !== '' ? (
          /* Search results page */
          <div className="space-y-6" id="main-content-anchor">
            <div className="flex items-baseline gap-2 border-b border-surface-container pb-4">
              <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-text-main">
                Search Results
              </h2>
              <span className="text-sm text-on-surface-variant">
                Found {searchFilteredProducts.length} items for "{searchQuery}"
              </span>
            </div>

            {searchFilteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-surface-gray rounded-2xl max-w-md mx-auto">
                <ShoppingBag className="w-12 h-12 text-outline-variant mx-auto mb-3" />
                <p className="text-sm font-semibold text-text-main">No products matched your search.</p>
                <p className="text-xs text-outline mt-1 px-4">
                  Try double-checking your spelling or searching for general categories like "milk", "rice", or "chicken".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-5 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchFilteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onProductClick={(p) => setSelectedProduct(p)}
                    isAdded={isProductInCart(product.id)}
                    quantity={getProductCartQty(product.id)}
                    onUpdateQuantity={handleUpdateQty}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'Promotion' ? (
          /* Specialized Promotion Page */
          <div className="space-y-6 animate-fade-in" id="main-content-anchor">
            {/* Promotion Header Banner */}
            <div className="bg-gradient-to-r from-fp-red to-orange-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="max-w-xl relative z-10 space-y-2">
                <span className="bg-white/20 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  🔥 Promotion Center
                </span>
                <h2 className="font-headline-lg text-xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
                  Red Hot Promotions & Savings!
                </h2>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
                  Shop direct from our handpicked deals. Enjoy daily discounts, buy-one-get-one-free bundles, and bulk savings across all categories!
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-surface-container pb-4">
              <div className="flex items-baseline gap-2">
                <h3 className="font-headline-md text-lg sm:text-xl font-bold text-text-main flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-fp-red fill-fp-red animate-pulse" />
                  All Active Promotions
                </h3>
                <span className="text-xs text-outline font-semibold bg-fp-red/10 text-fp-red px-2 py-0.5 rounded-full">
                  Great Savings
                </span>
              </div>
            </div>

            {/* Filtered Products with Savings/Promos */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.filter(p => p.originalPrice || p.badgeType === 'save' || p.badgeType === 'any2' || p.badgeType === 'buy2' || p.badgeType === 'spend').map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={(p) => setSelectedProduct(p)}
                  isAdded={isProductInCart(product.id)}
                  quantity={getProductCartQty(product.id)}
                  onUpdateQuantity={handleUpdateQty}
                />
              ))}
            </div>
          </div>
        ) : activeCategory !== 'dairy, chilled & eggs' ? (
          /* Specialized Categorized Pages (Wholesale, Pharmacy, Everything Else) */
          <div className="space-y-6" id="main-content-anchor">
            <div className="flex items-baseline gap-2 border-b border-surface-container pb-4">
              <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-text-main">
                FairPrice {formatCategoryName(activeCategory)}
              </h2>
              <span className="text-sm text-on-surface-variant">
                Premium high-quality items selected for you
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getProductsForTab().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={(p) => setSelectedProduct(p)}
                  isAdded={isProductInCart(product.id)}
                  quantity={getProductCartQty(product.id)}
                  onUpdateQuantity={handleUpdateQty}
                />
              ))}
            </div>
          </div>
        ) : (
          /* MAIN HOME DASHBOARD (Groceries tab) */
          <>
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              
              {/* Primary Large Banner - Shorter height to fit Flash Deals in view */}
              <div className="lg:col-span-8 rounded-2xl overflow-hidden relative group shadow-sm h-[160px] sm:h-[220px] lg:h-[240px]">
                {/* Sliders with beautiful transition crossfade */}
                {sliderBanners.map((banner, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === sliderIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center" 
                      style={{ backgroundImage: `url('${banner.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center p-4 sm:p-8">
                      <div className="text-white max-w-xs sm:max-w-md space-y-2">
                        <span className={`${banner.badgeColor} text-white text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                          {banner.tag}
                        </span>
                        <h1 className="font-headline-lg text-lg sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white">
                          {banner.title}
                        </h1>
                        <p className="text-[10px] sm:text-xs text-white/95 leading-relaxed font-medium max-w-[240px] sm:max-w-none">
                          {banner.description}
                        </p>
                        <button 
                          onClick={() => {
                            document.getElementById('recommended-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-white text-primary hover:bg-surface-gray font-bold px-4 py-1.5 rounded-lg text-[10px] sm:text-xs transition-all shadow shadow-black/25 flex items-center gap-1 active:scale-95"
                        >
                          Shop Fresh Products
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Left/Right Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderIndex((prev) => (prev - 1 + 3) % 3);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderIndex((prev) => (prev + 1) % 3);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dots Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSliderIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === sliderIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar Secondary banners - Scaled shorter to match */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 h-[80px] sm:h-[110px] lg:h-[240px]">
                <div className="flex-1 rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer">
                  <img 
                    alt="Weekly offers banner" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLvqZ27hzoK0jsIDjYO6ybgyfX2HlIdxWsCvhRuqtO5_Fwd5wnVK67Rpxb-3d0TCz5NB8C3LtTZyJTO-o6jcuZu-KZKOrkWob3GOhmyDKD2J1rXTte-BhqVek9dQd08cW4Anre_sbTpFsj-uNHZTdfvdxtvq1lO4zqJziau6SfI8uucIPy5U7247KTmr72GJd9w9AP50Pk9SH7nrgIMlArCtU83QiNmuA4gzPDQnl_0m_2Y-W-fgCKpfZXo"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer">
                  <img 
                    alt="Price freeze essentials banner" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtyFdfsyWvwt7p47MfKeBfCeZoEqFQS7dOadI8RBogOTBQspesTMAcnheLKhvt0Quu3iD6DnXCDWmEAmfc7PqeePnuKVRzZ_2GoWUL7_lM5W_QvkjHV1pTtwgt7OuuDKPSJ8oKuxOQTHUcxW12w6DXuH5h5gYHpJkV3j_mMll90VRO7GiVeWMBEw1jgTC-cx1jdnR-luLT8GICfZKi56cH6sGBwohgAHC2-q-X-JTb0Z8yYT14odrJiPQ"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
              </div>

            </section>

            {/* Flash Deals Horizontal Carousel */}
            <section className="mb-8" id="main-content-anchor">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-headline-md text-lg sm:text-xl font-bold text-text-main flex items-center gap-1.5">
                    <Flame className="w-5 h-5 text-fp-red fill-fp-red animate-[pulse_0.8s_infinite] drop-shadow-[0_0_8px_rgba(239,68,68,0.95)] scale-110" />
                    Flash Deals
                  </h2>
                  <span className="text-xs text-outline font-semibold bg-fp-red/10 text-fp-red px-2 py-0.5 rounded-full">
                    Online Exclusive
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => scrollSection('flash-deals-scroller', 'left')}
                      className="w-8 h-8 rounded-full border border-outline-variant bg-white flex items-center justify-center hover:bg-surface-gray hover:text-primary transition-all text-on-surface-variant cursor-pointer"
                      title="Scroll Left"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => scrollSection('flash-deals-scroller', 'right')}
                      className="w-8 h-8 rounded-full border border-outline-variant bg-white flex items-center justify-center hover:bg-surface-gray hover:text-primary transition-all text-on-surface-variant cursor-pointer"
                      title="Scroll Right"
                    >
                      →
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Showing all weekly special promotion rates! (Simulated)');
                    }}
                    className="text-primary font-bold hover:underline flex items-center gap-0.5 text-xs sm:text-sm"
                  >
                    See all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Layout */}
              <div 
                id="flash-deals-scroller"
                className="flex gap-4 overflow-x-auto hide-scrollbar pb-2"
              >
                {flashDeals.map((product) => (
                  <div key={product.id} className="flex-none w-[170px] sm:w-[200px]">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onProductClick={(p) => setSelectedProduct(p)}
                      isAdded={isProductInCart(product.id)}
                      quantity={getProductCartQty(product.id)}
                      onUpdateQuantity={handleUpdateQty}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended for You Grid */}
            <section className="mb-8" id="recommended-section">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline-md text-lg sm:text-xl font-bold text-text-main flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Recommended for you
                </h2>
                <button 
                  onClick={() => {
                    alert('Showing personalized item recommendations! (Simulated)');
                  }}
                  className="text-primary font-bold hover:underline flex items-center gap-0.5 text-xs sm:text-sm"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recommendedForYou.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onProductClick={(p) => setSelectedProduct(p)}
                    isAdded={isProductInCart(product.id)}
                    quantity={getProductCartQty(product.id)}
                    onUpdateQuantity={handleUpdateQty}
                  />
                ))}
              </div>
            </section>

            {/* What's Hot Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-headline-md text-lg sm:text-xl font-bold text-text-main flex items-center gap-1.5">
                  <Flame className="w-5 h-5 text-fp-red fill-fp-red" />
                  What's hot now
                </h2>
                <button 
                  onClick={() => {
                    alert('Showing trending item recommendations! (Simulated)');
                  }}
                  className="text-primary font-bold hover:underline flex items-center gap-0.5 text-xs sm:text-sm"
                >
                  See all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid layout matching mockup */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {whatsHotNow.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white border border-surface-gray rounded-xl p-3 flex flex-col hover:shadow-md transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                    id={`hot-product-card-${product.id}`}
                  >
                    <div className="aspect-square mb-3 relative flex items-center justify-center overflow-hidden bg-surface-container-lowest rounded-lg">
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" 
                        src={product.image}
                        referrerPolicy="no-referrer"
                      />
                      {product.badge && (
                        <span className="absolute top-1 left-1 bg-fp-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <span className="text-fp-red font-bold text-base sm:text-lg mb-1">
                        ${product.price.toFixed(2)}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-text-main line-clamp-2 h-9 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.unit && (
                        <span className="text-[10px] text-outline mt-1 font-semibold">
                          {product.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trust and Safety Banner */}
            <section className="bg-surface-gray border border-outline-variant/20 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-main">100% Freshness Guarantee</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">We check every cold item. Refund if not fully fresh.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-main">Convenient Delivery Slots</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Choose your delivery slot, available 7 days a week.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-main">Earn Points Everywhere</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Link your account to earn and save with LinkPoints.</p>
                </div>
              </div>
            </section>
          </>
        )}

      </main>

      {/* Footer component */}
      <footer className="bg-surface-container-high border-t border-outline-variant mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-4 sm:px-6 lg:px-8 max-w-[1280px] w-full mx-auto">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                alt="FairPrice" 
                className="h-8 w-8 object-contain" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLugE-gf0LRFfcyOzca9YBDdH4TYl0ySeqxdREjGT6WOOfnuh5W1m_bSTvDbRTEkOZb-BGxEDJ8WC3zyFlbU-HgZwLeAaPwp3QxL8pRTMMaQxBy4H3vuEPd81p1-kt3jP1Y_YUl9TrUxk6kj5SaAcRf2CWiOr7ZRaeYXXy7C_REt50c5VpCHxjHSCAhqhglOlMws5re-jdpI-63gzBR3RDRhI-KhA2eoj3YnOkeP5jJbkkOg0bi2ycjH8rc"
              />
              <span className="text-lg font-headline-md font-bold text-primary">FairPrice</span>
            </div>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Your favorite neighborhood grocery store, now online. Enjoy fresh foods, home supplies, and pantry essentials delivered safely.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => alert('Opening NTUC FairPrice Facebook... (Simulated)')}
                className="w-8 h-8 rounded-full bg-outline text-white hover:bg-primary flex items-center justify-center text-xs font-bold transition-colors"
                title="Facebook"
              >
                FB
              </button>
              <button 
                onClick={() => alert('Opening NTUC FairPrice Instagram... (Simulated)')}
                className="w-8 h-8 rounded-full bg-outline text-white hover:bg-primary flex items-center justify-center text-xs font-bold transition-colors"
                title="Instagram"
              >
                IG
              </button>
              <button 
                onClick={() => alert('Opening NTUC FairPrice YouTube... (Simulated)')}
                className="w-8 h-8 rounded-full bg-outline text-white hover:bg-primary flex items-center justify-center text-xs font-bold transition-colors"
                title="YouTube"
              >
                YT
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-xs sm:text-sm text-text-main uppercase tracking-wider">About Us</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li><button onClick={() => alert('Learn more about NTUC FairPrice Group')} className="hover:text-fp-red transition-colors text-left focus:outline-none">About FairPrice Group</button></li>
              <li><button onClick={() => setIsHelpOpen(true)} className="hover:text-fp-red transition-colors text-left focus:outline-none">Help Center</button></li>
              <li><button onClick={() => alert('Explore job opportunities')} className="hover:text-fp-red transition-colors text-left focus:outline-none">Careers</button></li>
              <li><button onClick={() => setActiveTab('Store Finder')} className="hover:text-fp-red transition-colors text-left focus:outline-none">Store Locator</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-xs sm:text-sm text-text-main uppercase tracking-wider">Memberships</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li><button onClick={() => setAuthModal({ isOpen: true, type: 'signup' })} className="hover:text-fp-red transition-colors text-left focus:outline-none">Digital Club</button></li>
              <li><button onClick={() => alert('Just Wine Club promotion rates and discounts')} className="hover:text-fp-red transition-colors text-left focus:outline-none">Just Wine Club</button></li>
              <li><button onClick={() => alert('Link Rewards benefits and point rates')} className="hover:text-fp-red transition-colors text-left focus:outline-none">Link Rewards</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-xs sm:text-sm text-text-main uppercase tracking-wider">Download Our App</h4>
            <div className="flex flex-col gap-2 max-w-[140px]">
              <button 
                onClick={() => alert('Redirecting to Apple App Store... (Simulated)')}
                className="flex items-center gap-1.5 justify-center py-2 bg-on-background text-white rounded-lg text-xs font-semibold hover:bg-primary-container transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                App Store
              </button>
              <button 
                onClick={() => alert('Redirecting to Google Play Store... (Simulated)')}
                className="flex items-center gap-1.5 justify-center py-2 bg-on-background text-white rounded-lg text-xs font-semibold hover:bg-primary-container transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Google Play
              </button>
            </div>
          </div>

        </div>

        {/* Bottom footer credit & terms */}
        <div className="border-t border-outline-variant/30 py-6 px-4 sm:px-6 lg:px-8 max-w-[1280px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-on-surface-variant">
          <span>© 2026 NTUC FairPrice Co-operative Ltd. All Rights Reserved.</span>
          <div className="flex gap-6">
            <button onClick={() => alert('Terms & Conditions information... (Simulated)')} className="hover:text-primary transition-colors focus:outline-none">Terms & Conditions</button>
            <button onClick={() => alert('Privacy Policy details... (Simulated)')} className="hover:text-primary transition-colors focus:outline-none">Privacy Policy</button>
          </div>
        </div>
      </footer>

      {/* --- FLOATING DIALOGS & OVERLAYS --- */}
      
      {/* Product inspection Detailed Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartWithQty={handleAddToCartWithQty}
        currentCartQty={selectedProduct ? getProductCartQty(selectedProduct.id) : 0}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout step dialog */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Help Centre FAQs Modal */}
      <HelpCentreModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Authentication Login/Signup modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, type: 'login' })}
        type={authModal.type}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
