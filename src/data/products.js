export const CATEGORIES = [
  { id: 1, name: 'Grocery', icon: '🥦', desc: 'Ration & Kitchen' },
  { id: 2, name: 'Dairy', icon: '🥛', desc: 'Milk, Dahi & Ghee' },
  { id: 3, name: 'Snacks', icon: '🍪', desc: 'Biscuits & Noodles' },
  { id: 4, name: 'Medicine', icon: '💊', desc: 'First Aid & Tablets' },
  { id: 5, name: 'Hardware', icon: '💡', desc: 'Bulb & Electricals' },
  { id: 6, name: 'Personal Care', icon: '🧼', desc: 'Soap & Hygiene' },
]

export const PRODUCTS = [
  { id: 1, name: 'Fresh Potato (Aalu)', category: 'Grocery', price: 30, unit: 'kg', img: '/images/potato.jpg' },
  { id: 2, name: 'Onion (Pyaaz)', category: 'Grocery', price: 35, unit: 'kg', img: '/images/onion.jpg' },
  { id: 3, name: 'Tomato (Tamatar)', category: 'Grocery', price: 40, unit: 'kg', img: '/images/tomato.jpg' },
  { id: 4, name: 'Basmati Rice', category: 'Grocery', price: 65, unit: 'kg', img: '/images/rice.jpg' },
  { id: 5, name: 'Wheat Flour (Aata)', category: 'Grocery', price: 35, unit: 'kg', img: '/images/flour.jpg' },
  { id: 6, name: 'Mustard Oil (Sarson Tel)', category: 'Grocery', price: 145, unit: 'litre', img: '/images/oil.jpg' },
  { id: 7, name: 'Sugar (Cheeni)', category: 'Grocery', price: 44, unit: 'kg', img: '/images/sugar.jpg' },
  { id: 8, name: 'Tata Salt (Namak)', category: 'Grocery', price: 28, unit: 'packet', img: '/images/salt.jpg' },
  { id: 9, name: 'Red Label Tea (Chai)', category: 'Grocery', price: 125, unit: '250g', img: '/images/tea.jpg' },
  { id: 10, name: 'Arhar Dal', category: 'Grocery', price: 155, unit: 'kg', img: '/images/dal.jpg' },
  { id: 11, name: 'Maggi Noodles', category: 'Snacks', price: 14, unit: 'packet', img: '/images/maggi.jpg' },
  { id: 12, name: 'Parle-G Biscuit', category: 'Snacks', price: 10, unit: 'packet', img: '/images/biscuit.jpg' },
  { id: 13, name: 'Fresh Milk', category: 'Dairy', price: 62, unit: 'litre', img: '/images/milk.jpg' },
  { id: 14, name: 'Curd (Dahi)', category: 'Dairy', price: 40, unit: '400g', img: '/images/curd.jpg' },
  { id: 15, name: 'Fresh Paneer', category: 'Dairy', price: 95, unit: '250g', img: '/images/paneer.jpg' },
  { id: 16, name: 'Desi Ghee', category: 'Dairy', price: 320, unit: '500g', img: '/images/ghee.jpg' },
  { id: 17, name: 'Paracetamol 650mg', category: 'Medicine', price: 30, unit: 'strip', img: '/images/paracetamol.jpg' },
  { id: 18, name: 'Band-Aid Strips', category: 'Medicine', price: 20, unit: 'pack', img: '/images/bandaid.jpg' },
  { id: 19, name: 'LED Bulb 9W', category: 'Hardware', price: 85, unit: 'piece', img: '/images/bulb.jpg' },
  { id: 20, name: 'Bathing Soap (Dettol)', category: 'Personal Care', price: 40, unit: 'bar', img: '/images/soap.jpg' },


  
  // --- Ration / Atta & Dal ---
  {
    id: 21,
    name: 'Aashirvaad Shudh Chakki Atta',
    unit: '5 kg',
    price: 215,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 22,
    name: 'Tata Sampann Arhar / Toor Dal',
    unit: '1 kg',
    price: 165,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1585994192700-474a59ae71c5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 23,
    name: 'Fortune Kachi Ghani Mustard Oil',
    unit: '1 L',
    price: 145,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 24,
    name: 'Tata Salt Vacuum Evaporated',
    unit: '1 kg',
    price: 28,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 25,
    name: 'Madhur Pure & Hygienic Sugar',
    unit: '1 kg',
    price: 46,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1622484212850-cab596d66e74?auto=format&fit=crop&w=400&q=80'
  },

  // --- Chai & Biscuits ---
  {
    id: 26,
    name: 'Tata Tea Gold Leaf Tea',
    unit: '500 g',
    price: 260,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 27,
    name: 'Parle-G Gold Biscuits Pack',
    unit: '1 kg',
    price: 90,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80'
  },

  // --- Spices / Masale ---
  {
    id: 28,
    name: 'Catch Turmeric Powder (Haldi)',
    unit: '200 g',
    price: 45,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 29,
    name: 'MDH Deggi Mirch Powder',
    unit: '100 g',
    price: 68,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80'
  },

  // --- Cleaning & Personal Care ---
  {
    id: 30,
    name: 'Surf Excel Quick Wash Detergent',
    unit: '1 kg',
    price: 140,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 31,
    name: 'Dettol Original Bathing Soap (Buy 3 Get 1)',
    unit: '4 x 100 g',
    price: 135,
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1607006314144-88484e92eb0e?auto=format&fit=crop&w=400&q=80'
  }
]
