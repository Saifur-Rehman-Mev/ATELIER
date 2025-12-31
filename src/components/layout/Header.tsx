import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-semibold tracking-wide">
            ATELIER
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm uppercase tracking-wider link-underline">
              Shop
            </Link>
            <Link to="/shop?category=New" className="text-sm uppercase tracking-wider link-underline">
              New Arrivals
            </Link>
            <Link to="/shop?category=Accessories" className="text-sm uppercase tracking-wider link-underline">
              Accessories
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/shop"
                className="text-sm uppercase tracking-wider py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/shop?category=New"
                className="text-sm uppercase tracking-wider py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                to="/shop?category=Accessories"
                className="text-sm uppercase tracking-wider py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
