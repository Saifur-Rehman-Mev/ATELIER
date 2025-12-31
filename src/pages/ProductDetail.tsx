import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );

  if (!product) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
        <Button variant="outline" asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <main className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="lg:py-8">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && (
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider font-medium mb-3">
                  Color: <span className="font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedColor === color
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wider font-medium mb-3">
                  Size: <span className="font-normal">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-sm border transition-colors ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wider font-medium mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              variant="hero"
              size="xl"
              className="w-full mb-4"
              onClick={handleAddToCart}
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </Button>

            {/* Details */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm uppercase tracking-wider font-medium mb-4">
                Details
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• Ethically sourced and produced</li>
                <li>• Free shipping on orders over $200</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
