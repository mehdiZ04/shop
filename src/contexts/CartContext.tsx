import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product } from '@/components/ProductCard';

interface CartContextValue {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => [...prev, product]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(p => p.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
