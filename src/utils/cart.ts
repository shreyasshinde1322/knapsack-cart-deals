import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

const CART_STORAGE_KEY = "smart-ecommerce-cart";

export function getCart(): CartItem[] {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.id !== productId);
  saveCart(filteredCart);
  return filteredCart;
}

export function updateQuantity(productId: number, quantity: number): CartItem[] {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): { totalItems: number; totalPrice: number } {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
}
