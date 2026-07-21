import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Compass, Navigation2 } from 'lucide-react';
import { STORE_LOCATIONS } from '../data';

export default function StoreFinderTab() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const filteredStores = STORE_LOCATIONS.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(query.toLowerCase()) || 
                          store.address.toLowerCase().includes(query.toLowerCase());
    
    const matchesFilter = filterType === 'All' || 
                          (filterType === 'Finest' && store.type.includes('Finest')) ||
                          (filterType === 'Xtra' && store.type.includes('Hypermarket')) ||
                          (filterType === 'Supermarket' && store.type.includes('Standard'));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-surface-gray rounded-2xl p-6 shadow-sm max-w-4xl mx-auto animate-fade-in" id="store-finder-tab">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="font-headline-md text-2xl font-bold text-primary mb-2">
          NTUC FairPrice Store Finder
        </h2>
        <p className="text-sm text-on-surface-variant">
          Find your nearest FairPrice, FairPrice Finest, FairPrice Xtra, or Warehouse Club in Singapore for convenient shopping.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full bg-surface-gray border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-text-main placeholder-outline"
            placeholder="Search by branch name, road, or postal code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="store-search-input"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['All', 'Finest', 'Xtra', 'Supermarket'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filterType === type
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-gray text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {type === 'All' ? 'All Types' : `FairPrice ${type}`}
            </button>
          ))}
        </div>
      </div>

      {/* Store Listing */}
      <div className="space-y-4">
        {filteredStores.length === 0 ? (
          <div className="text-center py-12 text-outline">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-outline-variant" />
            <p className="text-sm font-semibold">No branches matching your criteria were found.</p>
            <button 
              onClick={() => { setQuery(''); setFilterType('All'); }}
              className="text-xs text-primary font-bold hover:underline mt-2"
            >
              Clear filters and retry
            </button>
          </div>
        ) : (
          filteredStores.map((store, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-gray/30 hover:bg-primary-fixed/10 p-5 rounded-xl border border-surface-gray/50 transition-all group"
              id={`store-location-card-${index}`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-text-main group-hover:text-primary transition-colors">
                    {store.name}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    store.type.includes('Finest')
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : store.type.includes('Hypermarket')
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {store.type}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-on-surface-variant">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{store.address}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-outline flex-shrink-0" />
                    <span>Open hours: {store.hours}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-outline flex-shrink-0" />
                    <span>Phone: {store.phone}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    alert(`Navigating to ${store.name}...\nOpening native Map app... (Simulated)`);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-primary text-primary hover:bg-primary-fixed/20 rounded-xl text-xs font-bold transition-all"
                  id={`navigate-btn-${index}`}
                >
                  <Compass className="w-4 h-4" />
                  Map
                </button>
                <button
                  onClick={() => {
                    alert(`Finding quickest route to ${store.name}...\nEstimated transit time: 14 mins.`);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-white hover:bg-primary-container rounded-xl text-xs font-bold transition-all shadow-sm"
                  id={`directions-btn-${index}`}
                >
                  <Navigation2 className="w-4 h-4" />
                  Directions
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
