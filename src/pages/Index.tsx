import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
// Removed generic ProductsSection in favor of grouped brand sections
import { CheckoutModal } from "@/components/CheckoutModal";
import { SuccessModal } from "@/components/SuccessModal";
import { Product } from "@/components/ProductCard";
import { products as catalog, categories, CatalogProduct } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

// Brand SVG icons
import nikeIcon from "@/assets/nike.svg";
import adidasIcon from "@/assets/adidas.svg";
import pumaIcon from "@/assets/puma.svg";
import jordanIcon from "@/assets/jordan.svg";
import newBalanceIcon from "@/assets/new-balance.svg";

const Index = () => {
  const { items: cartItems, addItem, clear } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const featured = (catalog as CatalogProduct[]).filter(p => p.featured);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleCartClick = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    } else {
      toast({
        title: "Cart Empty",
        description: "Add some products to your cart first.",
      });
    }
  };

  const handlePurchaseComplete = () => {
    clear();
    setIsSuccessOpen(true);
    toast({
      title: "Purchase Successful!",
      description: "Thank you for your order.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItems.length} onCartClick={handleCartClick} />
      <main>
        <HeroSection />
        {/* Featured products by brand */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {categories.map(cat => {
            const catFeatured = featured.filter(p => p.category === cat);
            if (!catFeatured.length) return null;
            return (
              <div key={cat} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight capitalize">{cat}</h2>
                  <span className="text-sm text-muted-foreground">{catFeatured.length} {catFeatured.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {catFeatured.map(product => (
                    <div key={product.id} className="border rounded-lg p-3 flex flex-col bg-card">
                      <div className="aspect-square w-full overflow-hidden rounded-md mb-3">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform hover:scale-105" />
                      </div>
                      <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold">{product.price} TND</span>
                        <button
                          onClick={() => handleAddToCart(product as Product)}
                          className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
        {/* Brand row (static) */}
        <div className="py-10 select-none">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {[{icon: nikeIcon, alt: 'Nike'}, {icon: adidasIcon, alt: 'Adidas'}, {icon: pumaIcon, alt: 'Puma'}, {icon: jordanIcon, alt: 'Jordan'}, {icon: newBalanceIcon, alt: 'New Balance'}].map((b, i) => (
              <img
                key={i}
                src={b.icon}
                alt={b.alt}
                className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </main>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPurchaseComplete={handlePurchaseComplete}
      />
      
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
      <Footer />

    </div>
  );
};

export default Index;
