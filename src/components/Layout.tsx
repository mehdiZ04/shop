import { ReactNode, useState } from 'react';
import { Header } from '@/components/Header';
import { Product } from '@/components/ProductCard';
import { CheckoutModal } from '@/components/CheckoutModal';
import { SuccessModal } from '@/components/SuccessModal';
import { toast } from '@/hooks/use-toast';

type LayoutChildrenFn = (api: { addToCart: (p: Product) => void; cartItems: Product[] }) => ReactNode;
interface LayoutProps {
  children: ReactNode | LayoutChildrenFn;
  enableCart?: boolean; // allow pages without cart
}

export function Layout({ children, enableCart = false }: LayoutProps) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCartClick = () => {
    if (!enableCart) return;
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    } else {
      toast({ title: 'Cart Empty', description: 'Add some products to your cart first.' });
    }
  };

  const handlePurchaseComplete = () => {
    setCartItems([]);
    setIsSuccessOpen(true);
    toast({ title: 'Purchase Successful!', description: 'Thank you for your order.' });
  };

  const addToCart = (product: Product) => {
    if (!enableCart) return;
    setCartItems(prev => [...prev, product]);
    toast({ title: 'Added to Cart', description: `${product.name} added to cart.` });
  };

  const rendered = typeof children === 'function'
    ? (children as LayoutChildrenFn)({ addToCart, cartItems })
    : children;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={enableCart ? cartItems.length : 0} onCartClick={handleCartClick} />
      <main>{rendered}</main>
      {enableCart && (
        <>
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            onPurchaseComplete={handlePurchaseComplete}
          />
          <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
        </>
      )}
    </div>
  );
}
