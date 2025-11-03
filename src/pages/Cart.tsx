import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, updateQuantity, removeFromCart, clearCart, CartItem } from "@/utils/cart";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    setCartItems(getCart());
  }, []);
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const updatedCart = updateQuantity(productId, newQuantity);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Cart updated");
  };
  
  const handleRemove = (productId: number) => {
    const updatedCart = removeFromCart(productId);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Item removed from cart");
  };
  
  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Cart cleared");
  };
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding products to your cart to see them here
            </p>
            <Link to="/products">
              <Button className="btn-primary">
                Browse Products
              </Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 mb-1">
                      <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item.id)}
                        className="flex-shrink-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              onClick={handleClearCart}
              className="w-full"
            >
              Clear Cart
            </Button>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full btn-primary mb-3" size="lg">
                Proceed to Checkout
              </Button>
              
              <Link to="/recommend">
                <Button variant="outline" className="w-full" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Recommendations
                </Button>
              </Link>
              
              <Link to="/products" className="block mt-3">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
