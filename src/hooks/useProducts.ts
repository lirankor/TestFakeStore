import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts, getCategories, getProduct } from '../services/api'

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: ['categories'] as const,
}

// Fetch all products
export const useProducts = (limit?: number) => {
  return useQuery({
    queryKey: productKeys.list({ limit }),
    queryFn: () => getProducts(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })
}

// Fetch single product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id.toString()),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes - categories don't change often
  })
}

// Prefetch product for better UX
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => getProduct(id.toString()),
      staleTime: 1000 * 60 * 10,
    })
  }
}
