import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'title' | null;
}

interface ProductClientState {
  // Client-side state only
  filters: ProductFilters;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  priceRange: [number, number];
  selectedCategories: string[];

  // Actions
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedCategories: (categories: string[]) => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductClientState>()(
  persist(
    (set) => ({
      // Initial state
      filters: {
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null,
      },
      searchQuery: '',
      viewMode: 'grid',
      priceRange: [0, 1000],
      selectedCategories: [],

      // Actions
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setViewMode: (mode) => set({ viewMode: mode }),

      setPriceRange: (range) => set({ priceRange: range }),

      setSelectedCategories: (categories) => set({ selectedCategories: categories }),

      clearFilters: () => set({
        filters: {
          category: null,
          minPrice: null,
          maxPrice: null,
          sortBy: null,
        },
        searchQuery: '',
        priceRange: [0, 1000],
        selectedCategories: [],
      }),
    }),
    {
      name: 'product-client-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);