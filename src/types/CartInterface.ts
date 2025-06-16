import type { Product } from "./ProductInterface";

export interface CartItem {
     productId: number;
     quantity: number;
     product: Product; // We'll need to fetch this from the products endpoint
 }

 export interface Cart {
    userId: number;
    date: string;
    products: CartItem[];
 }
 
 export interface CartState {
     // Local cart state (Zustand store)
     items: CartItem[];
     isLoading: boolean;
     error: string | null;
     cartId: number | null;
     
     // Actions
     getItemCount: () => number;
     addItem: (product: Product, quantity: number) => void;
     removeItem: (productId: number) => void;
     updateQuantity: (productId: number, quantity: number) => void;
     clearCart: () => void;
     
     // Sync with API
     initializeCart: () => Promise<void>;
     saveCartToAPI: () => Promise<void>;
 }