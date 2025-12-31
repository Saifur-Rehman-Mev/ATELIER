import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const selectedCategory = searchParams.get("category") || "All";

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <main className="py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Shop All</h1>
          <p className="text-muted-foreground">
            Discover our complete collection of timeless pieces
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </span>
            {selectedCategory !== "All" && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded">
                1
              </span>
            )}
          </Button>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm uppercase tracking-wider font-medium mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryChange(category)}
                      className={`text-sm py-1 transition-colors ${
                        selectedCategory === category
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-medium">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="text-sm uppercase tracking-wider font-medium mb-4">
                  Categories
                </h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          handleCategoryChange(category);
                          setShowFilters(false);
                        }}
                        className={`text-sm py-2 w-full text-left transition-colors ${
                          selectedCategory === category
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-muted-foreground">No products found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
