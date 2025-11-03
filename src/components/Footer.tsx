import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xl">
                S
              </div>
              <h3 className="text-lg font-bold">SmartShop</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered e-commerce platform using advanced knapsack algorithms to help you shop smarter within your budget.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/recommend" className="text-sm text-muted-foreground hover:text-primary transition-colors">Smart Recommendations</Link></li>
              <li><Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Electronics</li>
              <li className="text-sm text-muted-foreground">Fashion</li>
              <li className="text-sm text-muted-foreground">Home & Kitchen</li>
              <li className="text-sm text-muted-foreground">Sports & Fitness</li>
              <li className="text-sm text-muted-foreground">Beauty & Health</li>
              <li className="text-sm text-muted-foreground">Books & Stationery</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@smartshop.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                123 Shopping St, NY 10001
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SmartShop. All rights reserved. | Built with Knapsack Algorithm Optimization</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
