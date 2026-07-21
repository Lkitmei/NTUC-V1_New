import { Product } from './types';

export const CATEGORIES = [
  'dairy, chilled & eggs',
  'food cupboard',
  'drinks',
  'frozen',
  'fruits & vegetables',
  'health & wellness',
] as const;

export const MAIN_TABS = [
  'Categories',
  'Promotion',
  'Store Finder',
] as const;

export const PRODUCTS: Product[] = [
  // --- FLASH DEALS ---
  {
    id: 'fd1',
    name: 'FairPrice Frozen Seaweed Chicken',
    price: 7.60,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu4RO4w6ovg3k5e6a0-4pDMBk-cezZkZqexn6Rxd8UKzMxUeZ-7vcOrSKNdY9fBEKlVmQ1392UxWAH5OtsKUZU9yOLy54_04Rj2ZdEKHx03G8CNLw7FPDK2vuavSPKbg4D44xEZS6VK4_Q4CruidpXhXKcY0z83vt1mrWtNncAadPLrK0c7-YaiBlZNQzttOOqK3vGAbRg1_wBhOjbP8BXnhb0EEOPcZAQAmoHSAWGgvf3puJsqC56SA7w',
    badge: 'Any 2 At $9.95',
    badgeType: 'any2',
    rating: 4.1,
    reviewsCount: 86,
    category: 'frozen',
    subCategory: 'Frozen Food',
    description: 'Crispy seaweed wrapped chicken bites, perfect for air frying or deep frying. A family-favorite finger food snack filled with rich savory flavors.',
    unit: '400g'
  },
  {
    id: 'fd2',
    name: "Yeo's Packet Drink - Longan Red Date",
    price: 9.25,
    originalPrice: 11.51,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvWirXtFj7HQjSr75yb_NVQMCCzIX_wGkX6hjucQv8fby95KOAl2XMXrxO7-YX79DLvtohzFvXSco4onxeGjRkZAoSnOF0URFc4NrkUuo-xshN5euOiRAlOddNeeLiO9X_6sCeACG4vebJMSNAnROqbMQoogRdZEAXFhRzgxxgBcY28gJ2YgC8Olx3HFqjI_7dC3p77t4v4CmwavVO-ECk5z7FSqN791TyjWYEHdmVq8ZNIxRa7lcouQg',
    badge: 'Save $2.26',
    badgeType: 'save',
    rating: 4.7,
    reviewsCount: 92,
    category: 'drinks',
    subCategory: 'Beverages',
    description: 'Refreshingly sweet herbal beverage containing real longan and red date extracts, loved for its cooling properties. Perfectly suited for hot afternoons.',
    unit: '24 x 250ml'
  },
  {
    id: 'fd3',
    name: 'Golden Chef Royale Thai Hom Mali Fragrant Rice',
    price: 11.95,
    originalPrice: 16.95,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLujBvtWkXOcBF-uiFVy4r70aTD_Lot5KzteGAU-z7dqQ_5CUXJosSzZULMtTrgYCb_VyzZOg2P33vIVD249KpRRoOnbI4fZ33DcOqpvvZeqSGMY90bplxXeIhWimAAoIgKpi5jUZvjjQvs2U7OrVyEeDvLs-Jms4K2kQhEnqY1cJeVfCLlrmB5dEHMecAmq0rCR03trCFUGE0ISQHieUl2HJfda5LkFZ0iqomvtNlYC5HWDfAzG-eyBuOY',
    badge: 'Spend $500 Free Gift',
    badgeType: 'spend',
    rating: 4.4,
    reviewsCount: 39,
    category: 'food cupboard',
    subCategory: 'Rice & Cooking Essentials',
    description: 'Premium quality Thai Hom Mali fragrant rice, freshly milled. Known for its distinct floral aroma, fluffy texture, and delicious taste.',
    unit: '5kg'
  },
  {
    id: 'fd4',
    name: 'Cloversoft 4 in 1 Supreme Laundry Capsules',
    price: 9.95,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsuuc6AoIY_p95YWPFOUctr9Grc_bdM_lrPbz5r3NIZ5URNyF1_oSueDujXj35PZcCN6SwOaFrTKdPJc-0PKmd7ihmiIZubVgUSIre-ZkeDPOOnKJ0XdnvxTKQ2DRWLlGBVFt5hYxCV_-142wYM1EI5-Ivb8pKJk4J_4DCuAgAaPxwFMc-0IB0ZrcXlmMMHbIMaa1TOOpHAUmM1FUQO44GcYuDVOo1OMTYmcDYYV_OKzVtteKG-UQ3Ddw',
    badge: 'Any 2 At $9.95',
    badgeType: 'any2',
    rating: 4.8,
    reviewsCount: 17,
    category: 'health & wellness',
    subCategory: 'Household',
    description: 'Formulated with organic ingredients, these plant-based 4-in-1 capsules remove stains, eliminate odors, soften clothes, and provide 99.9% antibacterial protection.',
    unit: '20 pods'
  },

  // --- RECOMMENDED ---
  {
    id: 'rec1',
    name: 'SongHe AAA Thai Hom Mali Rice - New Crop',
    price: 16.95,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsx6T8ePOHPuMNBg8aaGthpzO4OWzH3VYJhhqBGMeQU6BUaOOepuI3XcdpFoMTTFA56ODu3IUPrA35odB5hzTfKxjV3MfpSTI9I4yZJfZAo2meNNBXsI_5RHTO7R5oDJ13wur3EU4Pb2vKk9dbVCEDJqUUFbKwlw_YLz2n3Gy5XvGNr0KbnK9r9nXBwrhBS49RyqQhl-ZxxlZiW7-t4s9SzoePGwJ3HDGNtcHQmpHgtegrj42JP5q9PYg',
    badge: 'Spend $500 Free gift',
    badgeType: 'spend',
    rating: 4.9,
    reviewsCount: 312,
    category: 'food cupboard',
    subCategory: 'Rice & Cooking Essentials',
    description: 'Highly acclaimed premium white rice imported from Thailand. Soft, aromatic, and delicious when served hot.',
    unit: '5kg'
  },
  {
    id: 'rec2',
    name: 'Meiji Fresh Milk - Regular 2L',
    price: 6.70,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLufWLWl7PdKHwSBSRiBah0GfYq7NEZOzyH5cEtEKkwMydOT1_b2T5_tAqTvT-JEdUzT7a7S7MLPBIpToQWO4RWdG-GAntnzoP5k0PrgEJmiixgh-DKvZReI4Zk1crH_jp16GVPh-4TfyLtXD-NqvYDS191FvHUvXCqAAAAGBglnGPks-ocUVxNJsFMVGFhrbaLVQivNqDb8DdR3biOUT7Z0DddItDsd5LNn9s4AeU2X8H6XcHWFvcOIxqc',
    badge: 'Save $0.27',
    badgeType: 'save',
    rating: 4.8,
    reviewsCount: 144,
    category: 'dairy, chilled & eggs',
    subCategory: 'Dairy & Chilled',
    description: '100% fresh milk from high-quality cows. Smooth and rich, containing natural calcium and vitamins for active daily lifestyles.',
    unit: '2L'
  },
  {
    id: 'rec3',
    name: 'Dove Body Wash - Beauty Nourishing 1L',
    price: 5.90,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLucoG3nzmjAux0DH3IWIW2AxiX69Dw6nVK2eFoFUXPC5dNE_JcnzpgADPcH9gQL3KB9eU0KA7zRIhUZ3xAkFTV-pgQGH1hQ9PUZt9cQ8H3OGkTFmzoc9hLh7aME5F9mzHfRszCvqnasp-PpJh5HzrzgjNpxFCuk7fJCphtsqSOWvvCqmn3dxScL4BRSrvKR_efQjjVd6iljpcPepx4kqqpDxRilV4EE79rw7kRzo8YrISXk2B4_D_iJu-I',
    badge: 'Save $4.05',
    badgeType: 'save',
    rating: 4.6,
    reviewsCount: 220,
    category: 'health & wellness',
    subCategory: 'Personal Care',
    description: 'Gentle skin cleansers that deliver skin-natural nutrients. Moisturizes deeply to keep skin soft, healthy, and hydrated.',
    unit: '1L'
  },
  {
    id: 'rec4',
    name: 'Seara Frozen Chicken - Legs (Boneless) 2kg',
    price: 8.95,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu82yuk2tKYTM2EVtk9l5z2-LZK8VAzJLhmTCE0IK7DpsbSaLXhleGptUebpcQeYBk3vlGuPiWEQ3p5jvYfYSmKnwsUwTCj6EqE8kmwKCezK9Tz5y73nGi2kXh5fAua6JBaVy9zyrZgeyhBNtVQG89kAf-HOgzxW-7natVN9pI4DcfYSOs9ucQ4jCSuEktGbdwAiqdinyd3ZLZC_a9jiGbR5PSMBhkG-DeRiNTdotzKy0HmD9Hwrk6JDw',
    badge: 'Save $2.75',
    badgeType: 'save',
    rating: 4.3,
    reviewsCount: 54,
    category: 'frozen',
    subCategory: 'Fresh & Frozen Meat',
    description: 'Juicy, premium boneless chicken legs. Perfect for barbecues, stir-fries, roasts, or dicing for daily protein dishes.',
    unit: '2kg'
  },
  {
    id: 'rec5',
    name: 'Pasar Prepacked Carrots 500g',
    price: 0.95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOrlAjZRpaZXQewte2bziqimD0BDenCj8AokXE7C8PAW_Z4zirGN_088l8mASOaBz2I5b-EkLv2ZRCYjdy1XtboMGBbpXNkyRmtPZ8BxOC3p1JJBrEMo8EicN7V9krHYH7icn98qdfUVI31VQejw_RcDl3CSWdsLUbpF33HATdZmlN3ZH0n24tzJ3bwALuLiBA1XKJS5sK1bMabytyjuFScIaR8SWkGw3BoLbEm5c9cEu-2Za4n_um',
    badge: 'Buy 2 At $1.80',
    badgeType: 'buy2',
    rating: 4.5,
    reviewsCount: 61,
    category: 'fruits & vegetables',
    subCategory: 'Fresh Vegetables',
    description: 'Freshly harvested carrots, rich in Beta-Carotene and vitamins. Crisp and crunchy, ideal for boiling, juicing, or salads.',
    unit: '500g'
  },
  {
    id: 'rec6',
    name: 'FairPrice Artisan Loaf - Multigrain',
    price: 4.20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPvxQkyOsykdHkD_ummlm0I0_ZwiPujsALN3c_sOx4UoFYZAyM6hjqBkJgWnMOOL1onVuycposbIBkcWu0aXFOkRrnM9w_EK8B5_e35cZC1VDYe_p3SrTcGoPilFo-nRJYO9YNkjBUdNcpYVd2za47y2xixRSBTy5vckgZe1YBACkY5LiZbvkC5z5u9b3wuZQPY3Bk1dzBYsiQmD6hEuoJzRmYE5zgDRv3eaNhljA3qjt0l28qchdl',
    badge: 'Hot',
    badgeType: 'hot',
    rating: 4.7,
    reviewsCount: 42,
    category: 'food cupboard',
    subCategory: 'Bakery',
    description: 'Baked fresh daily with a nutritious blend of multiple healthy grains, seeds, and toasted malts. Perfectly sliced for sandwiches.',
    unit: '450g'
  },

  // --- WHAT'S HOT NOW ---
  {
    id: 'hot1',
    name: 'Malaysia Red Seedless Watermelon',
    price: 4.50,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtDi7rR0VVxEqDqCb3W8CoaoRBA-EhQMzi2xaPzcJmu6FgAKo8cmgp9qv1KUjlJ27-CUt99rjntosI23TNVlG1ln8Yyl9CIDK-eO6q25jjOE23EAFQhcgLoveGXG8ep_8LUyLAllyuRxVV4KMWLjqjfC9C7yEoyuBBdxU6eKD4OX8x4c5c0zAGN3HnSPukohzAUx6F-5NUe5BFDJbBjX7qCVBF27ykIu2hbhECdtoySP3l4Z3RuMgLFRA',
    rating: 4.2,
    reviewsCount: 78,
    category: 'fruits & vegetables',
    subCategory: 'Fresh Fruits',
    description: 'Juicy, sweet, and seedless. A hydration booster perfect for refreshing drinks, fruit bowls, or cold summer snacks.',
    unit: '1 piece'
  },
  {
    id: 'hot2',
    name: 'Mermaid Premium Frozen Smoked Salmon',
    price: 7.90,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsxCSTPZczD5OLZQv8WYAkvErhPVE8gfV4SjRDwvp7dEAWX8cIC1rND0LlQJcAkCu1RowmmzPlw2bs3l7_BWdTGVALLXkleF8-fhqgdZUsVn9fGCQDA7sO_ztC8yTPblptoECESySKFn0b8u3rZ01P0vz_hjtOtmgBHHYttsHhZO-0AVSwyk6RQ63bG0EKKyGWSAKmTYwlsKa5hHRqiyGPHxGPTIpNT7uDv-i0XPTcZFa-9mPOkq9XmS6Q',
    rating: 4.6,
    reviewsCount: 112,
    category: 'dairy, chilled & eggs',
    subCategory: 'Frozen Food',
    description: 'Cold-smoked Norwegian salmon, thinly pre-sliced. Perfect for breakfast toast with cream cheese, salads, or high-end platters.',
    unit: '100g'
  },
  {
    id: 'hot3',
    name: 'Farmers Union Greek Style High Protein Yogurt',
    price: 3.65,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuPOddUGs6-KCv9dbf_hwzDjxPvOWaYuW-YXLsMNFRXI-J4uyPyuNtEPVXldh-DOYTyfY7-mwaW4d2alN_CSGZiYcYYLvYW3AYnFmFyeIhoOPastWXZZ7qLmHyfEClmIW0oIWVPxObJCOHajx3os5hy65BRbGn4LjLfp9CYrqQ4pYyAwRYqXOXdPL_dV-HSDICpkNAlK6kJn0w82k258h-DUE2_eBMWa55CeqQ74D9x4cCf0JFjByMxO0Q',
    badge: 'Exclusive',
    badgeType: 'exclusive',
    rating: 4.8,
    reviewsCount: 89,
    category: 'dairy, chilled & eggs',
    subCategory: 'Dairy & Chilled',
    description: 'Thick and creamy classic Greek style yogurt with 15g of protein per serving. No added sugar, optimal for breakfast or pre-workouts.',
    unit: '500g'
  },
  {
    id: 'hot4',
    name: 'Sadia IQF Chicken Drumstick 1kg',
    price: 6.50,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsAjAuZXV8ZFM6k9qxZdcSUXp2ixlbFyWpGEyDTF_W7yoWbJVhgMKxnKodzhPhtenEhmL__cjvQNM-arENl6jxSjkn6zKjQfb5ZCqG1ASS-mgEzi9DExClmRhDwwkKE3qWyKU64jR9eSPgfGn7vSTrCOUSoBHdDV5JcZhoArcgFqbOw8edQyfqhLpVWOkSy2L24jXP-7Itt6sR7OmKrL2ig3JcohP1UZrvNNMyJaCSZTeTGxpy9uEo2Uh0',
    rating: 4.4,
    reviewsCount: 95,
    category: 'frozen',
    subCategory: 'Fresh & Frozen Meat',
    description: 'Individual Quick Frozen (IQF) chicken drumsticks that can be taken out and cooked one by one. Retains peak freshness and taste.',
    unit: '1kg'
  },
  {
    id: 'hot5',
    name: 'Listerine Mouthwash - Cool Mint 2 x 1L',
    price: 13.75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPAkYpfA6RVF-NWV4gF9GqlftJEpAReSSpu-TpqNnvbNH1tMZ95mpug2srCLgPCs83nBQs3T6ckioUNopduJXHawA24vFsPlyxVbe_vr4q6RcCWkcaWiMdSUxs4y91BkiQsO_Xn1q_DIWm-UCEkVV9Hres1FABuTds-z_cmEhQZ-49S1HALLescbZevmy0qcGaQ9RP8V-XjX9BlDhoCRTmtn9SEzk2gUTqlQ0SZbN9qmzvXGKKoHbX',
    rating: 4.8,
    reviewsCount: 204,
    category: 'health & wellness',
    subCategory: 'Oral Care',
    description: 'Kills up to 99.9% of bacteria causing bad breath, plaque, and gum problems. Provides intense cool mint freshness for 24-hour protection.',
    unit: '2 x 1L'
  },

  // --- ADDITIONAL PRODUCT COVERAGE FOR BEAUTIFUL CATEGORIES ---
  // Health & Wellness
  {
    id: 'ph1',
    name: 'Panadol Extra Pain Relief Optizorb',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular',
    badgeType: 'hot',
    rating: 4.9,
    reviewsCount: 410,
    category: 'health & wellness',
    subCategory: 'Medicine & Relief',
    description: 'Fast acting pain relief designed with Optizorb formulation. Tough on headache, toothache, and body aches while remaining gentle on stomachs.',
    unit: '20 Caplets'
  },
  {
    id: 'ph2',
    name: 'Redoxon Double Action Vitamin C + Zinc',
    price: 24.90,
    originalPrice: 29.90,
    image: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&q=80&w=600',
    badge: 'Save $5.00',
    badgeType: 'save',
    rating: 4.8,
    reviewsCount: 153,
    category: 'health & wellness',
    subCategory: 'Vitamins & Supplements',
    description: 'Effervescent immune booster containing 1000mg Vitamin C and 10mg Zinc. Dissolves quickly in water with a refreshing orange taste.',
    unit: '30 Tablets'
  },

  // Additional Drinks
  {
    id: 'dr1',
    name: 'Coca-Cola Zero Sugar 24 x 320ml',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    badge: 'Any 2 At $9.95',
    badgeType: 'any2',
    rating: 4.8,
    reviewsCount: 412,
    category: 'drinks',
    subCategory: 'Carbonated Drinks',
    description: 'Great Coca-Cola taste with zero sugar and zero calories. Perfect refreshing beverage to stock up for gatherings and parties.',
    unit: '24 x 320ml'
  },
  {
    id: 'dr2',
    name: 'Yeo\'s Chrysanthemum Tea 6 x 250ml',
    price: 3.10,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvWirXtFj7HQjSr75yb_NVQMCCzIX_wGkX6hjucQv8fby95KOAl2XMXrxO7-YX79DLvtohzFvXSco4onxeGjRkZAoSnOF0URFc4NrkUuo-xshN5euOiRAlOddNeeLiO9X_6sCeACG4vebJMSNAnROqbMQoogRdZEAXFhRzgxxgBcY28gJ2YgC8Olx3HFqjI_7dC3p77t4v4CmwavVO-ECk5z7FSqN791TyjWYEHdmVq8ZNIxRa7lcouQg',
    badge: 'Hot',
    badgeType: 'hot',
    rating: 4.7,
    reviewsCount: 125,
    category: 'drinks',
    subCategory: 'Asian Drinks',
    description: 'Traditionally brewed from high quality chrysanthemum flowers, providing a delicate and refreshing floral experience.',
    unit: '6 x 250ml'
  },

  // Additional Fruits & Veg
  {
    id: 'fv1',
    name: 'Premium Zespri Sungold Kiwifruit',
    price: 6.95,
    image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular',
    badgeType: 'hot',
    rating: 4.9,
    reviewsCount: 184,
    category: 'fruits & vegetables',
    subCategory: 'Fresh Fruits',
    description: 'Sweet, juicy and golden-fleshed kiwifruits imported from New Zealand. Pack of nutrition, exceptionally rich in Vitamin C.',
    unit: '4 pieces'
  },
  {
    id: 'fv2',
    name: 'Pasar Organic Baby Spinach 150g',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600',
    badge: 'Fresh Deal',
    badgeType: 'exclusive',
    rating: 4.6,
    reviewsCount: 72,
    category: 'fruits & vegetables',
    subCategory: 'Fresh Vegetables',
    description: 'Tender and nutritious pre-washed baby spinach leaves. Perfect for raw salads, light stir frying, or healthy smoothies.',
    unit: '150g'
  },

  // Food Cupboard Bulk / Standard
  {
    id: 'ws1',
    name: 'Bulk SongHe AAA Thai Hom Mali Rice',
    price: 31.50,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsx6T8ePOHPuMNBg8aaGthpzO4OWzH3VYJhhqBGMeQU6BUaOOepuI3XcdpFoMTTFA56ODu3IUPrA35odB5hzTfKxjV3MfpSTI9I4yZJfZAo2meNNBXsI_5RHTO7R5oDJ13wur3EU4Pb2vKk9dbVCEDJqUUFbKwlw_YLz2n3Gy5XvGNr0KbnK9r9nXBwrhBS49RyqQhl-ZxxlZiW7-t4s9SzoePGwJ3HDGNtcHQmpHgtegrj42JP5q9PYg',
    badge: 'Wholesale Deal',
    badgeType: 'buy2',
    rating: 4.9,
    reviewsCount: 912,
    category: 'food cupboard',
    subCategory: 'Bulk Grains',
    description: 'Value pack bulk sizing of premium SongHe Hom Mali rice. Perfect for large families, caterers, or long term storage.',
    unit: '10kg'
  },
  {
    id: 'ws2',
    name: "Bulk Yeo's Packet Drink - Chrysanthemum Tea",
    price: 15.90,
    originalPrice: 19.80,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvWirXtFj7HQjSr75yb_NVQMCCzIX_wGkX6hjucQv8fby95KOAl2XMXrxO7-YX79DLvtohzFvXSco4onxeGjRkZAoSnOF0URFc4NrkUuo-xshN5euOiRAlOddNeeLiO9X_6sCeACG4vebJMSNAnROqbMQoogRdZEAXFhRzgxxgBcY28gJ2YgC8Olx3HFqjI_7dC3p77t4v4CmwavVO-ECk5z7FSqN791TyjWYEHdmVq8ZNIxRa7lcouQg',
    badge: 'Bulk Discount',
    badgeType: 'save',
    rating: 4.6,
    reviewsCount: 318,
    category: 'drinks',
    subCategory: 'Bulk Drinks',
    description: 'Bulk carton of refreshing Chrysanthemum Tea. Lower in sugar, lightly sweetened, and highly popular for events or parties.',
    unit: '48 x 250ml'
  }
];

export const STORE_LOCATIONS = [
  {
    name: 'FairPrice Hub (Joo Koon)',
    address: '1 Joo Koon Circle, #03-01, Singapore 629117',
    hours: '08:00 AM - 10:00 PM',
    phone: '+65 6451 4321',
    type: 'Hypermarket'
  },
  {
    name: 'FairPrice Finest (Marine Parade)',
    address: '6 Marine Parade Central, Singapore 449411',
    hours: '24 Hours',
    phone: '+65 6348 2911',
    type: 'Premium Finest Store'
  },
  {
    name: 'FairPrice Xtra (Ang Mo Kio Hub)',
    address: '53 Ang Mo Kio Ave 3, #B2-26, Singapore 569933',
    hours: '07:00 AM - 11:00 PM',
    phone: '+65 6453 1234',
    type: 'Hypermarket & Electronics'
  },
  {
    name: 'FairPrice Finest (Jewel Changi Airport)',
    address: '78 Airport Boulevard, #B2-205, Singapore 819666',
    hours: '09:00 AM - 11:00 PM',
    phone: '+65 6242 7511',
    type: 'Finest Concept Store'
  },
  {
    name: 'FairPrice Woodlands Civics Centre',
    address: '900 Woodlands Dr 50, #01-08, Singapore 730900',
    hours: '24 Hours',
    phone: '+65 6894 1353',
    type: 'Standard Supermarket'
  }
];
