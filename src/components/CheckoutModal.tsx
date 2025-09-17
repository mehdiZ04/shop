import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/components/ProductCard";
// X icon handled by DialogContent close button

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onPurchaseComplete: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPurchaseComplete,
}: CheckoutModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setSubmitting(true);
      const orderSummary = cartItems.map(i => `${i.name} (${i.price} TND)`).join(', ');
      const total = `${totalPrice} TND`;
      const resp = await fetch('https://formspree.io/f/xkgvlngd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          formType: 'order',
          name: formData.name,
          email: formData.email,
            phone: formData.phone,
          address: formData.address,
          city: formData.city,
          items: orderSummary,
          total
        })
      });
      if (!resp.ok) throw new Error('Network');
      toast({ title: 'Order submitted', description: 'We received your order details.' });
      onPurchaseComplete();
      onClose();
      setFormData({ name: '', email: '', phone: '', address: '', city: '' });
    } catch (err) {
      setError('Failed to submit order. Please try again.');
      toast({ title: 'Error', description: 'Order not sent. Try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  // Tunisian cities list (duplicated minimal list to avoid extra import if necessary)
  const cities = [
    'Tunis','Ariana','Ben Arous','Manouba','Nabeul','Zaghouan','Bizerte','Béja','Jendouba','Kef','Siliana','Kairouan','Kasserine','Sidi Bouzid','Sousse','Monastir','Mahdia','Sfax','Gafsa','Tozeur','Kebili','Gabès','Medenine','Tataouine'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[92vw] sm:w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent pr-8">
            {t('checkout.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cart Summary */}
          <div className="border rounded-lg p-4 bg-gradient-card">
            <h3 className="font-semibold mb-3">{t('cart.title')}</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.price} TND</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">{totalPrice} TND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="name">{t('checkout.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t('checkout.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{t('checkout.phone')}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">{t('checkout.address')}</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">{t('checkout.citySelectLabel')}</Label>
                <Select onValueChange={(val) => handleInputChange('city', val)} value={formData.city}>
                  <SelectTrigger className="mt-1" id="city">
                    <SelectValue placeholder={t('checkout.cityPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={!isFormValid || submitting}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base sm:text-lg py-4 sm:py-6 disabled:opacity-70"
            >
              {submitting ? '...' : `${t('checkout.complete')} - ${totalPrice} TND`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}