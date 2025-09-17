import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Moon, Sun, Globe, ShoppingBag, Menu, X } from "lucide-react";

import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cart = useCart();
  const effectiveCount = typeof cartItemsCount === 'number' ? cartItemsCount : cart.items.length;

  const handleCartClick = () => {
    if (onCartClick) return onCartClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">Stazzy</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.home')}</Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.products')}</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.about')}</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">{t('nav.contact')}</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border z-50">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-accent">
                  {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border z-50">
                <DropdownMenuItem onClick={() => setTheme('teal')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System ({resolvedTheme === 'dark' ? 'Dark' : 'Light'})</DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>Cycle</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCartClick}
            className="relative hover:bg-accent"
          >
            <ShoppingBag className="w-5 h-5" />
            {effectiveCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {effectiveCount}
              </span>
            )}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden hover:bg-accent">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] bg-background border-l z-50">
              <SheetHeader>
                <SheetTitle className="text-left bg-gradient-primary bg-clip-text text-transparent">ATHLETIC</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-8">
                <nav className="flex flex-col space-y-4">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors font-medium py-2">{t('nav.home')}</Link>
                  <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors font-medium py-2">{t('nav.products')}</Link>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors font-medium py-2">{t('nav.about')}</Link>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors font-medium py-2">{t('nav.contact')}</Link>
                </nav>
                <div className="border-t pt-6 space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{t('language.select')}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')} className="text-xs">English</Button>
                      <Button variant={language === 'fr' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('fr')} className="text-xs">Français</Button>
                      <Button variant={language === 'ar' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('ar')} className="text-xs">العربية</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Theme</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant={theme === 'teal' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('teal')} className="text-xs">Light</Button>
                      <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('dark')} className="text-xs">Dark</Button>
                      <Button variant={theme === 'system' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('system')} className="text-xs">System</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">System: {resolvedTheme}</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}