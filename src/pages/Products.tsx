
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { SuccessModal } from "@/components/SuccessModal";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState as ReactUseState } from "react";
import { products, categories } from "@/data/products";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Product } from "@/components/ProductCard";

export default function Products() {
  const { t } = useLanguage();
  const { items: cartItems, addItem, clear } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = ReactUseState(false);
  const [isSuccessOpen, setIsSuccessOpen] = ReactUseState(false);
  const [detailProduct, setDetailProduct] = ReactUseState<Product | null>(null);

  const handleCartClick = () => {
    if (cartItems.length > 0) setIsCheckoutOpen(true);
  };
  const handlePurchaseComplete = () => {
    clear();
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItems.length} onCartClick={handleCartClick} />
      <main className="container mx-auto py-6 sm:py-8 px-3 sm:px-4">
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t('products.pageTitle')}</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">{products.length} {products.length === 1 ? 'item' : 'items'} • {cartItems.length}</p>
          </div>
          <div className="space-y-12">
            {categories.map(cat => {
              const catProducts = products.filter(p => p.category === cat);
              if (!catProducts.length) return null;
              return (
                <div key={cat} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold capitalize">{cat}</h2>
                    <span className="text-xs text-muted-foreground">{catProducts.length} {catProducts.length === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {catProducts.map(prod => (
                      <button key={prod.id} onClick={() => setDetailProduct(prod as Product)} className="text-left border rounded-lg p-3 flex flex-col bg-card hover:shadow-athletic transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <div className="aspect-square w-full overflow-hidden rounded-md mb-3">
                          <img src={prod.image} alt={prod.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <h3 className="text-sm font-medium line-clamp-1 mb-1">{prod.name}</h3>
                        <span className="text-sm font-semibold">${prod.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      </main>
      <ProductDetailModal product={detailProduct} open={!!detailProduct} onOpenChange={(o) => { if(!o) setDetailProduct(null); }} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} cartItems={cartItems} onPurchaseComplete={handlePurchaseComplete} />
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
      <Footer />
    </div>
  );
}
