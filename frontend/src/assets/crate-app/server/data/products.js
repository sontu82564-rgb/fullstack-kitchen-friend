export const products = [
  { id: 1,  name: 'Heirloom Tomatoes', unit: 'per kg',        price: 89,  oldPrice: null, category: 'produce', emoji: '🍅', stamp: 'FRESH TODAY' },
  { id: 2,  name: 'Baby Spinach',      unit: 'per bunch',     price: 45,  oldPrice: null, category: 'produce', emoji: '🥬', stamp: 'FARM DIRECT' },
  { id: 3,  name: 'Hass Avocado',      unit: 'per piece',     price: 55,  oldPrice: 70,   category: 'produce', emoji: '🥑', stamp: 'SALE', sale: true },
  { id: 4,  name: 'Strawberries',      unit: 'per 250g box',  price: 120, oldPrice: null, category: 'produce', emoji: '🍓', stamp: 'FRESH TODAY' },
  { id: 5,  name: 'Farm Eggs (12)',    unit: 'per dozen',     price: 96,  oldPrice: null, category: 'dairy',   emoji: '🥚', stamp: 'FARM DIRECT' },
  { id: 6,  name: 'Aged Cheddar',      unit: 'per 200g',      price: 180, oldPrice: 210,  category: 'dairy',   emoji: '🧀', stamp: 'SALE', sale: true },
  { id: 7,  name: 'Whole Milk',        unit: 'per litre',     price: 62,  oldPrice: null, category: 'dairy',   emoji: '🥛', stamp: 'FRESH TODAY' },
  { id: 8,  name: 'Sourdough Loaf',    unit: 'per loaf',      price: 135, oldPrice: null, category: 'bakery',  emoji: '🍞', stamp: 'BAKED TODAY' },
  { id: 9,  name: 'Butter Croissants', unit: 'pack of 4',     price: 150, oldPrice: null, category: 'bakery',  emoji: '🥐', stamp: 'BAKED TODAY' },
  { id: 10, name: 'Cherry Tomatoes',   unit: 'per 250g',      price: 58,  oldPrice: null, category: 'produce', emoji: '🍒', stamp: 'FRESH TODAY' },
  { id: 11, name: 'Greek Yoghurt',     unit: 'per 400g',      price: 110, oldPrice: null, category: 'dairy',   emoji: '🥣', stamp: 'FARM DIRECT' },
  { id: 12, name: 'Rye Rolls',         unit: 'pack of 6',     price: 98,  oldPrice: null, category: 'bakery',  emoji: '🥖', stamp: 'BAKED TODAY' },
];

export const categories = [
  { id: 'produce', label: 'Produce',      icon: '🥕' },
  { id: 'dairy',   label: 'Dairy & Eggs', icon: '🧀' },
  { id: 'bakery',  label: 'Bakery',       icon: '🍞' },
];
