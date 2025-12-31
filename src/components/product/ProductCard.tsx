import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
  };

  return (
    <div className="group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="hero"
              size="sm"
              className="w-full"
              onClick={handleQuickAdd}
            >
              Quick Add
            </Button>
          </div>
          {product.originalPrice && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs uppercase tracking-wider px-2 py-1">
              Sale
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="font-medium">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-medium">${product.price}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
