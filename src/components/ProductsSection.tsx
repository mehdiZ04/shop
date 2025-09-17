import { ProductCard, Product } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({ products, onAddToCart }: ProductsSectionProps) {
  const { t } = useLanguage();

  return (
  <section className="py-10 sm:py-14 lg:py-16 px-3 sm:px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-primary bg-clip-text text-transparent">
          {t('products.title')}
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}