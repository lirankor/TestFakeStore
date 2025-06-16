import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState, Cart } from '../types/CartInterface';
import { createCart, updateCart } from '../services/api';
import { useAuthStore } from './authStore';

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,
            error: null,
            cartId: null,

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            addItem: (product, quantity) => {
                set((state) => {
                    const existingItem = state.items.find(
                        item => item.productId === product.id
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.productId === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }

                    return {
                        items: [...state.items, {
                            productId: product.id,
                            quantity,
                            product
                        }]
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId)
                }));
            },

            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity }
                            : item
                    )
                }));
            },

            clearCart: () => {
                set({ items: [], cartId: null });
            },

            initializeCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    const userId: number | undefined = useAuthStore.getState().user?.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }

                    const cartData: Cart = {
                        userId: userId,
                        date: new Date().toISOString(),
                        products: []
                    };

                    const response = await createCart(cartData);
                    set({ cartId: response.id });
                } catch (error) {
                    console.error('Error initializing cart:', error);
                    set({ error: 'Failed to initialize cart' });
                } finally {
                    set({ isLoading: false });
                }
            },

            saveCartToAPI: async () => {
                set({ isLoading: true, error: null });
                try {
                    const userId = useAuthStore.getState().user?.id;
                    if (!userId) {
                        throw new Error('User not authenticated');
                    }

                    const { items, cartId } = get();
                    const cartData = {
                        userId: userId,
                        date: new Date().toISOString(),
                        products: items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity
                        }))
                    };

                    if (cartId) {
                        await updateCart(cartId.toString(), cartData);
                    } else {
                        const response = await createCart(cartData);
                        set({ cartId: response.id });
                    }
                } catch (error) {
                    console.error('Error saving cart to API:', error);
                    set({ error: 'Failed to save cart to API' });
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);