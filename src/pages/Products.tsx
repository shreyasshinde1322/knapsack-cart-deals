import { useState, useMemo } from "react";
import { products as allProducts, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addToCart } from "@/utils/cart";
import { toast } from "sonner";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === "All" 
      ? allProducts 
      : allProducts.filter(p => p.category === selectedCategory);
    
    // Sort products
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "value") {
      filtered = [...filtered].sort((a, b) => (b.value / b.price) - (a.value / a.price));
    }
    
    return filtered;
  }, [selectedCategory, sortBy]);
  
  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? "fill-warning text-warning" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse through our collection of {allProducts.length} products
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories ({allProducts.length})</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="value">Best Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card overflow-hidden">
              <div className="aspect-square overflow-hidden bg-secondary/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4">
                <Badge variant="secondary" className="mb-2 text-xs">
                  {product.category}
                </Badge>
                
                <h3 className="font-semibold text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-xs text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xl font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Value: ₹{product.value.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round((product.value / product.price) * 100) / 100}x
                  </Badge>
                </div>
                
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full btn-primary"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
