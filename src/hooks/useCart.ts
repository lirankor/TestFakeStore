import { useMutation, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { createCart } from '../services/api'
import type { Product } from '../types/ProductInterface'

export const useAddToCart = () => {
  const { addItem } = useCartStore()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: async ({ product, quantity }: { product: Product; quantity: number }) => {
      // Only update local state - no API call
      addItem(product, quantity)
      return { success: true }
    },
    
    onSuccess: () => {
      message.success('Added to cart!')
    },
    
    onError: (error) => {
      console.error('Add to cart error:', error)
      message.error('Failed to add item to cart')
    },
  })
}

export const useUpdateCartItem = () => {
  const { updateQuantity } = useCartStore()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      updateQuantity(productId, quantity)
      return { success: true }
    },
    
    onError: (error) => {
      console.error('Update cart error:', error)
      message.error('Failed to update cart item')
    },
  })
}

export const useRemoveFromCart = () => {
  const { removeItem } = useCartStore()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: async (productId: number) => {
      removeItem(productId)
      return { success: true }
    },
    
    onSuccess: () => {
      message.success('Item removed from cart')
    },
    
    onError: (error) => {
      console.error('Remove from cart error:', error)
      message.error('Failed to remove item from cart')
    },
  })
}

export const useClearCart = () => {
  const { clearCart } = useCartStore()
  const { message } = App.useApp()

  return () => {
    clearCart()
    message.success('Cart cleared')
  }
}

//send the cart to the server
export const useCheckout = () => {
  const { user } = useAuthStore()
  const { items, clearCart, getTotalPrice } = useCartStore()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error('Please login to checkout')
      }

      if (items.length === 0) {
        throw new Error('Cart is empty')
      }

      const cartData = {
        userId: user.id,
        date: new Date().toISOString(),
        products: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }

      const response = await createCart(cartData)
      
      return {
        cartId: response.id,
        total: getTotalPrice(),
        itemCount: items.length
      }
    },
    
    onSuccess: (data) => {
      clearCart()
      message.success(`Order placed successfully! Total: $${data.total.toFixed(2)}`)
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      navigate('/orders')
    },
    
    onError: (error: Error) => {
      console.error('Checkout error:', error)
      message.error(error.message || 'Checkout failed')
    },
  })
}

// Get cart summary (client-side only)
export const useCartSummary = () => {
  const { items, getItemCount, getTotalPrice } = useCartStore()
  
  return {
    items,
    itemCount: getItemCount(),
    totalPrice: getTotalPrice(),
    isEmpty: items.length === 0
  }
}