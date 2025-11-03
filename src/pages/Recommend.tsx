import { useState } from "react";
import { products as allProducts, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Zap, Brain, Clock, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { compareAlgorithms, getBestResult, KnapsackResult } from "@/utils/knapsack";
import { addToCart } from "@/utils/cart";
import { toast } from "sonner";

const Recommend = () => {
  const [budget, setBudget] = useState<string>("5000");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [results, setResults] = useState<KnapsackResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  const handleGetRecommendations = () => {
    const budgetNum = parseInt(budget);
    
    if (!budgetNum || budgetNum <= 0) {
      toast.error("Please enter a valid budget");
      return;
    }
    
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      // Filter products by selected categories
      const filteredProducts = allProducts.filter(p =>
        selectedCategories.includes(p.category)
      );
      
      if (filteredProducts.length === 0) {
        toast.error("No products found in selected categories");
        setIsLoading(false);
        return;
      }
      
      // Run all three algorithms
      const algorithmResults = compareAlgorithms(filteredProducts, budgetNum);
      setResults(algorithmResults);
      setIsLoading(false);
      
      toast.success("Recommendations generated successfully!");
    }, 1500);
  };
  
  const handleReset = () => {
    setBudget("5000");
    setSelectedCategories([]);
    setDescription("");
    setResults(null);
  };
  
  const handleAddAllToCart = (selectedProducts: typeof allProducts) => {
    selectedProducts.forEach(product => addToCart(product));
    toast.success(`Added ${selectedProducts.length} items to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
  const getAlgorithmIcon = (name: string) => {
    if (name.includes("Greedy")) return <Zap className="h-5 w-5" />;
    if (name.includes("0/1")) return <TrendingUp className="h-5 w-5" />;
    return <Brain className="h-5 w-5" />;
  };
  
  const bestResult = results ? getBestResult(results) : null;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <Sparkles className="inline h-8 w-8 mr-2 text-primary" />
            Smart Recommendations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered product recommendations using advanced knapsack algorithms
            to maximize value within your budget
          </p>
        </div>
        
        {/* Input Panel */}
        <Card className="max-w-4xl mx-auto p-6 md:p-8 mb-8">
          <div className="space-y-6">
            {/* Budget Input */}
            <div>
              <Label htmlFor="budget" className="text-base font-semibold mb-2 block">
                Enter Your Budget (₹)
              </Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., 5000"
                className="text-lg"
                min="1"
              />
            </div>
            
            {/* Category Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Select Categories
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => handleCategoryToggle(category.name)}
                    />
                    <label
                      htmlFor={category.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.icon} {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Description (Optional) */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold mb-2 block">
                Description (Optional)
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Gifts for men under ₹3000"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleGetRecommendations}
                className="flex-1 btn-primary"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Smart Recommendations
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Best Algorithm Highlight */}
            {bestResult && (
              <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Best Algorithm</h3>
                    <p className="text-sm text-muted-foreground">
                      {bestResult.algorithmName} achieved the highest total value
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Algorithm Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <Card key={index} className={`p-6 ${result === bestResult ? 'ring-2 ring-primary' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      result === bestResult ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}>
                      {getAlgorithmIcon(result.algorithmName)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{result.algorithmName}</h3>
                      {result === bestResult && (
                        <Badge variant="default" className="mt-1">Best Result</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Value</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{result.totalValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Price</span>
                      <span className="font-semibold">₹{result.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Products</span>
                      <span className="font-semibold">{result.selectedProducts.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time
                      </span>
                      <span className="text-xs font-mono">
                        {result.executionTime.toFixed(2)}ms
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleAddAllToCart(result.selectedProducts)}
                    variant={result === bestResult ? "default" : "outline"}
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add All to Cart
                  </Button>
                </Card>
              ))}
            </div>
            
            {/* Detailed Product Lists */}
            {results.map((result, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  {getAlgorithmIcon(result.algorithmName)}
                  {result.algorithmName} - Selected Products
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Product</th>
                        <th className="text-left p-3 font-semibold">Category</th>
                        <th className="text-right p-3 font-semibold">Price</th>
                        <th className="text-right p-3 font-semibold">Value</th>
                        <th className="text-right p-3 font-semibold">Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.selectedProducts.map((product) => (
                        <tr key={product.id} className="border-b border-border/50 hover:bg-secondary/20">
                          <td className="p-3">{product.name}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="p-3 text-right font-medium">
                            ₹{product.price.toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-medium text-primary">
                            ₹{product.value.toLocaleString()}
                          </td>
                          <td className="p-3 text-right">
                            <Badge variant="outline">
                              {(product.value / product.price).toFixed(2)}x
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-secondary/30">
                        <td className="p-3" colSpan={2}>Total</td>
                        <td className="p-3 text-right">₹{result.totalPrice.toLocaleString()}</td>
                        <td className="p-3 text-right text-primary">₹{result.totalValue.toLocaleString()}</td>
                        <td className="p-3 text-right">
                          <Badge>
                            {(result.totalValue / result.totalPrice).toFixed(2)}x
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Recommend;
