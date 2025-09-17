import { Product } from '@/components/ProductCard';
import nike1 from '@/assets/nike1.png';
import nike2 from '@/assets/nike2.png';
import nike3 from '@/assets/nike3.png';
import nike4 from '@/assets/nike4.png';
import nike5 from '@/assets/nike5.png';
import nike6 from '@/assets/nike6.png';
import samba1 from '@/assets/samba1.png';
import samba2 from '@/assets/samba2.png';
import samba3 from '@/assets/samba3.png';
import samba4 from '@/assets/samba4.png';
import samba5 from '@/assets/samba5.png';
import samba6 from '@/assets/samba6.png';
import samba7 from '@/assets/samba7.png';
import samba8 from '@/assets/samba8.png';
import nw1 from '@/assets/nw1.png';
import nw2 from '@/assets/nw2.png';
import nw3 from '@/assets/nw3.png';
import nw4 from '@/assets/nw4.png';

// Centralized product catalog
export interface CatalogProduct extends Product { featured?: boolean }

export const products: CatalogProduct[] = [
  { id: 1, name: 'Air Max Pro', price: 129, image: nike1, category: 'nike', featured: true },
  { id: 2, name: 'Air Max Pro', price: 129, image: nike2, category: 'nike' },
  { id: 3, name: 'Court Vision', price: 85, image: nike3, category: 'adidas', featured: true },
  { id: 4, name: 'Training Elite', price: 95, image: nike4, category: 'puma' },
  { id: 5, name: 'Sport Backpack', price: 65, image: nike5, category: 'jordan', featured: true },
  { id: 6, name: 'Air Max Plus', price: 149, image: nike6, category: 'nike' },
  { id: 7, name: 'Samba Classic', price: 75, image: samba1, category: 'adidas', featured: true },
  { id: 8, name: 'Samba Rose', price: 80, image: samba2, category: 'adidas' },
  { id: 9, name: 'Samba Millennium', price: 90, image: samba3, category: 'adidas' },
  { id: 10, name: 'Samba Goal', price: 70, image: samba4, category: 'adidas' },
  { id: 11, name: 'Samba Pack', price: 110, image: samba5, category: 'adidas' },
  { id: 12, name: 'Samba Team', price: 95, image: samba6, category: 'adidas' },
  { id: 13, name: 'New Balance 574', price: 99, image: samba7, category: 'newbalance', featured: true },
  { id: 14, name: 'New Balance 997', price: 149, image: samba8, category: 'newbalance' },
  { id: 15, name: 'New Balance 990', price: 179, image: nw1, category: 'newbalance' },
  { id: 16, name: 'New Balance 1080', price: 159, image: nw2, category: 'newbalance' },
  { id: 17, name: 'New Balance 860', price: 139, image: nw3, category: 'newbalance' },
  { id: 18, name: 'New Balance Fresh Foam', price: 129, image: nw4, category: 'newbalance' }
];

export const categories = ['nike', 'adidas', 'puma', 'jordan', 'newbalance'] as const;
