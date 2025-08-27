import type { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chicken Curry Cut - Small Pieces',
    slug: 'chicken-curry-cut-small',
    category: 'Fresh Cuts',
    description: 'Juicy bone-in & boneless chicken for delectable curries.',
    variants: [
      { name: '500g', price: 160, originalPrice: 193, stock: 50, pieces: '12-18', serves: 4 },
      { name: '1kg', price: 304, originalPrice: 365, stock: 30, pieces: '24-36', serves: 6 },
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
    description: 'Large bone-in & boneless pieces for a delicious curry.',
    variants: [
      { name: '500g', price: 170, originalPrice: 200, stock: 45, pieces: '4-6', serves: 4 },
      { name: '1kg', price: 320, originalPrice: 380, stock: 25, pieces: '8-12', serves: 6 },
    ],
    images: ['https://picsum.photos/600/400?random=2'],
    reviews: [],
  },
  {
    id: '3',
    name: 'Chicken Keema (Mince)',
    slug: 'chicken-keema',
    category: 'Fresh Cuts',
    description: 'Finely minced chicken, versatile for patties or keema.',
    variants: [
      { name: '500g', price: 180, originalPrice: 210, stock: 40, pieces: 'N/A', serves: 4 },
      { name: '1kg', price: 340, originalPrice: 400, stock: 20, pieces: 'N/A', serves: 8 },
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
    description: 'The perfect pack for a delicious meal.',
    variants: [
      { name: '500g', price: 170, originalPrice: 199, stock: 60, pieces: '5-7', serves: 3 },
      { name: '1kg', price: 320, originalPrice: 380, stock: 35, pieces: '10-14', serves: 6 },
    ],
    images: ['https://picsum.photos/600/400?random=4'],
    reviews: [],
  },
  {
    id: '5',
    name: 'Chicken Breast - Boneless',
    slug: 'chicken-breast-boneless',
    category: 'Boneless',
    description: 'Enjoy tender pieces of juicy chicken breast.',
    variants: [
      { name: '450g', price: 252, originalPrice: 311, stock: 55, pieces: '2-4', serves: 4 },
      { name: '900g', price: 480, originalPrice: 590, stock: 30, pieces: '4-8', serves: 8 },
    ],
    images: ['https://picsum.photos/600/400?random=5'],
    reviews: [
      { id: 'r3', author: 'Rina', rating: 5, comment: 'Always fresh and perfectly trimmed.', date: '2023-10-12' },
    ],
  },
  {
    id: '6',
    name: 'Chicken Giblets',
    slug: 'chicken-giblets',
    category: 'Organ Meats',
    description: 'A mix of liver, stomach, and neck for traditional dishes.',
    variants: [
      { name: '500g', price: 120, originalPrice: 140, stock: 30, pieces: 'N/A', serves: 4 },
    ],
    images: ['https://picsum.photos/600/400?random=6'],
    reviews: [],
  },
  {
    id: '7',
    name: 'Whole Chicken',
    slug: 'whole-chicken',
    category: 'Specialty',
    description: 'Perfect for a family roast.',
    variants: [
      { name: '1 pc (700-900g)', price: 350, originalPrice: 420, stock: 15, pieces: '1', serves: 4 },
    ],
    images: ['https://picsum.photos/600/400?random=7'],
    reviews: [],
  },
  {
    id: '8',
    name: 'Chicken Leg - Boneless',
    slug: 'chicken-leg-boneless',
    category: 'Boneless',
    description: 'Meaty, tender boneless chicken thighs.',
    variants: [
      { name: '500g', price: 210, originalPrice: 250, stock: 40, pieces: '4-6', serves: 4 },
      { name: '1kg', price: 400, originalPrice: 475, stock: 20, pieces: '8-12', serves: 8 },
    ],
    images: ['https://picsum.photos/600/400?random=8'],
    reviews: [],
  },
  {
    id: '9',
    name: 'Country Chicken',
    slug: 'country-chicken',
    category: 'Specialty',
    description: 'Authentic desi chicken with a rich, unique flavor.',
    variants: [
      { name: '1kg', price: 550, originalPrice: 650, stock: 10, pieces: '8-12', serves: 5 },
    ],
    images: ['https://picsum.photos/600/400?random=9'],
    reviews: [],
  },
  {
    id: '10',
    name: 'Chicken for Pets',
    slug: 'dog-food-chicken',
    category: 'More',
    description: 'Healthy, natural protein for your furry friend.',
    variants: [
      { name: '1kg', price: 150, originalPrice: 175, stock: 50, pieces: 'N/A', serves: 'N/A' },
    ],
    images: ['https://picsum.photos/600/400?random=10'],
    reviews: [],
  },
  {
    id: '11',
    name: 'Chicken Wings',
    slug: 'chicken-wings',
    category: 'Fresh Cuts',
    description: 'The perfect appetizer or party snack.',
    variants: [
      { name: '500g (With Skin)', price: 160, originalPrice: 190, stock: 30, pieces: '6-8', serves: 3 },
      { name: '500g (Without Skin)', price: 170, originalPrice: 200, stock: 30, pieces: '6-8', serves: 3 },
    ],
    images: ['https://picsum.photos/600/400?random=11'],
    reviews: [],
  },
];
