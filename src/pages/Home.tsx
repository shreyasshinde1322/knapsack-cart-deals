import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { categories } from "@/data/products";
import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Autoplay from "embla-carousel-autoplay";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Carousel */}
        <section className="container mx-auto px-4 py-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem>
                <Card className="border-0 overflow-hidden">
                  <div className="relative h-[400px] md:h-[500px]">
                    <img 
                      src={heroBanner1} 
                      alt="Shop the latest products" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                      <div className="container mx-auto px-8 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          Welcome to SmartShop
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
                          Discover amazing products with AI-powered recommendations
                        </p>
                        <Link to="/products">
                          <Button size="lg" className="btn-primary">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Shop Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-0 overflow-hidden">
                  <div className="relative h-[400px] md:h-[500px]">
                    <img 
                      src={heroBanner2} 
                      alt="Special offers" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                      <div className="container mx-auto px-8 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          Special Offers
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
                          Get the best deals on 250+ products across all categories
                        </p>
                        <Link to="/products">
                          <Button size="lg" className="btn-primary">
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Browse Deals
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-0 overflow-hidden">
                  <div className="relative h-[400px] md:h-[500px]">
                    <img 
                      src={heroBanner3} 
                      alt="Smart shopping with AI" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                      <div className="container mx-auto px-8 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          Smart Shopping with AI
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
                          Use knapsack algorithms to maximize value within your budget
                        </p>
                        <Link to="/recommend">
                          <Button size="lg" className="btn-primary">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Get Recommendations
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>
        
        {/* Features */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">250+ Products</h3>
              <p className="text-sm text-muted-foreground">
                Browse through our extensive collection across multiple categories
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Smart recommendations using advanced knapsack algorithms
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Value</h3>
              <p className="text-sm text-muted-foreground">
                Maximize your shopping value within your budget constraints
              </p>
            </Card>
          </div>
        </section>
        
        {/* Categories */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our diverse product categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to="/products">
                <Card className="category-card p-6 text-center h-full">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Shop Smarter?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try our AI-powered recommendation system that uses sophisticated knapsack algorithms
              to find the perfect products within your budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/recommend">
                <Button size="lg" className="btn-primary">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Smart Recommendations
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
