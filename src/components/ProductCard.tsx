import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t } = useLanguage();

  return (
  <Card className="group overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-athletic transition-all duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
  <div className="p-4 sm:p-5 lg:p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {product.category}
          </p>
        </div>
        <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl sm:text-2xl font-bold text-primary">{product.price} TND</span>
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 me-2" />
            {t('product.addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
}