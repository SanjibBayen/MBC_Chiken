import type { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Curry Cut - Small Pieces',
    slug: 'chicken-curry-cut-small',
    category: 'Fresh Cuts',
    description: 'Freshly cut small pieces of chicken (approx. 50g each), perfect for traditional curries and stews. Hygienically packed and ready to cook.',
    variants: [
      { name: '500g', price: 150, stock: 50 },
      { name: '1kg', price: 280, stock: 30 },
    ],
    images: ['https://picsum.photos/600/400?random=1'],
    reviews: [
      { id: 'r1', author: 'Suman', rating: 5, comment: 'Very fresh and tender!', date: '2023-10-10' },
    ],
  },
  {
    id: '2',
    name: 'Chicken Curry Cut - Large Pieces',
    slug: 'chicken-curry-cut-large',
    category: 'Fresh Cuts',
    description: 'Juicy, large pieces of chicken (approx. 100g each), ideal for hearty dishes like chicken korma or biryani. Skin-on for extra flavor.',
    variants: [
      { name: '500g', price: 160, stock: 45 },
      { name: '1kg', price: 300, stock: 25 },
    ],
    images: ['https://picsum.photos/600/400?random=2'],
    reviews: [],
  },
  {
    id: '3',
    name: 'Chicken Keema (Mince)',
    slug: 'chicken-keema',
    category: 'Fresh Cuts',
    description: 'Finely minced chicken meat, low in fat and high in protein. Perfect for making keema curry, patties, or stuffings.',
    variants: [
      { name: '500g', price: 180, stock: 40 },
      { name: '1kg', price: 340, stock: 20 },
    ],
    images: ['https://picsum.photos/600/400?random=3'],
    reviews: [
      { id: 'r2', author: 'Amit', rating: 5, comment: 'Excellent quality keema.', date: '2023-10-11' },
    ],
  },
  {
    id: '4',
    name: 'Chicken Drumsticks',
    slug: 'chicken-drumsticks',
    category: 'Fresh Cuts',
    description: 'Succulent and meaty chicken drumsticks. A family favorite, great for frying, baking, or grilling. Comes with skin for a crispy finish.',
    variants: [
      { name: '500g', price: 170, stock: 60 },
      { name: '1kg', price: 320, stock: 35 },
    ],
    images: ['https://picsum.photos/600/400?random=4'],
    reviews: [],
  },
  {
    id: '5',
    name: 'Chicken Breast - Boneless',
    slug: 'chicken-breast-boneless',
    category: 'Boneless',
    description: 'Tender, boneless chicken breast fillets. A versatile and healthy option for a wide range of dishes, from salads to stir-fries.',
    variants: [
      { name: '500g', price: 200, stock: 55 },
      { name: '1kg', price: 380, stock: 30 },
    ],
    images: ['https://picsum.photos/600/400?random=5'],
    reviews: [
      { id: 'r3', author: 'Rina', rating: 5, comment: 'Always fresh and perfectly trimmed.', date: '2023-10-12' },
    ],
  },
  {
    id: '6',
    name: 'Chicken Giblets (Liver, Stomach & Neck)',
    slug: 'chicken-giblets',
    category: 'Specialty',
    description: 'A mix of chicken liver, stomach (gizzard), and neck. Highly nutritious and flavorful, perfect for traditional recipes and broths.',
    variants: [
      { name: '500g', price: 120, stock: 30 },
    ],
    images: ['https://picsum.photos/600/400?random=6'],
    reviews: [],
  },
  {
    id: '7',
    name: 'Whole Chicken',
    slug: 'whole-chicken',
    category: 'Specialty',
    description: 'A whole chicken (700g to 900g), with skin. Ideal for roasting, grilling, or making a grand meal for the entire family.',
    variants: [
      { name: '1 pc (700-900g)', price: 350, stock: 15 },
    ],
    images: ['https://picsum.photos/600/400?random=7'],
    reviews: [],
  },
  {
    id: '8',
    name: 'Chicken Leg - Boneless',
    slug: 'chicken-leg-boneless',
    category: 'Boneless',
    description: 'Juicy and flavorful boneless chicken leg meat. Retains moisture well, making it perfect for tikkas, curries, and grilling.',
    variants: [
      { name: '500g', price: 210, stock: 40 },
      { name: '1kg', price: 400, stock: 20 },
    ],
    images: ['https://picsum.photos/600/400?random=8'],
    reviews: [],
  },
  {
    id: '9',
    name: 'Country Chicken (Desi)',
    slug: 'country-chicken',
    category: 'Specialty',
    description: 'Authentic country chicken with a richer flavor and firmer texture. A premium choice for special occasions and traditional cooking.',
    variants: [
      { name: '1kg', price: 550, stock: 10 },
    ],
    images: ['https://picsum.photos/600/400?random=9'],
    reviews: [],
  },
  {
    id: '10',
    name: 'Dog Food (Chicken)',
    slug: 'dog-food-chicken',
    category: 'More',
    description: 'Specially prepared chicken parts suitable for pets. A healthy and natural source of protein for your furry friend.',
    variants: [
      { name: '1kg', price: 150, stock: 50 },
    ],
    images: ['https://picsum.photos/600/400?random=10'],
    reviews: [],
  },
  {
    id: '11',
    name: 'Chicken Wings',
    slug: 'chicken-wings',
    category: 'Fresh Cuts',
    description: 'The perfect party snack. Our chicken wings are available with or without skin, ready for your favorite marinade or sauce.',
    variants: [
      { name: '500g (With Skin)', price: 160, stock: 30 },
      { name: '500g (Without Skin)', price: 170, stock: 30 },
    ],
    images: ['https://picsum.photos/600/400?random=11'],
    reviews: [],
  },
];
