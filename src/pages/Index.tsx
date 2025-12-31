import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')",
          }}
        />
        <div className="container relative z-20">
          <div className="max-w-xl animate-fade-in">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              New Collection
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-6">
              Timeless
              <br />
              Elegance
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover our curated collection of refined essentials, 
              designed for the modern wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/shop?category=New">View Lookbook</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Curated Selection
              </p>
              <h2 className="font-serif text-4xl">Featured Pieces</h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm uppercase tracking-wider hover:text-accent transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Explore
            </p>
            <h2 className="font-serif text-4xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Outerwear",
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
              },
              {
                name: "Knitwear",
                image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
              },
            ].map((category, index) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="group relative aspect-[4/5] overflow-hidden opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-serif text-3xl text-background">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Our Philosophy
              </p>
              <h2 className="font-serif text-4xl mb-6">Crafted with Intention</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Atelier, we believe in the power of thoughtful design. Each piece in our 
                collection is carefully crafted using sustainable materials and ethical 
                production methods, ensuring that beauty and responsibility go hand in hand.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our commitment to quality means creating pieces that transcend seasons, 
                becoming cherished additions to your wardrobe for years to come.
              </p>
              <Button variant="outline" size="lg">
                Learn Our Story
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                  alt="Brand story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
