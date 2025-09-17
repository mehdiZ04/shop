import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SIZES = Array.from({ length: 10 }, (_, i) => 36 + i); // 36-45

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-[92vw] sm:w-full p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold pr-8">{product.name}</DialogTitle>
          <DialogDescription className="space-y-2">
            <span className="block text-sm text-muted-foreground capitalize">{product.category}</span>
            <span className="block font-semibold text-lg">{product.price} TND</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-md bg-muted flex items-center justify-center mx-auto w-full max-w-sm">
            <img src={product.image} alt={product.name} className="object-cover w-full h-full" loading="lazy" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Sizes (EU)</h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded border text-sm transition-colors ${selectedSize === size ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                High performance athletic product engineered for comfort, durability, and style. Perfect for training, lifestyle, and everyday wear.
              </p>
            </div>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button disabled={!selectedSize} onClick={handleAdd} className="flex-1">
                Add to Cart {selectedSize ? `(EU ${selectedSize})` : ''}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}