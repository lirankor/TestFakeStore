export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export interface ProductFilters {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: 'price_asc' | 'price_desc' | 'rating' | 'title' | null;
}

export interface ProductState {
    products: Product[];
    categories: string[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    searchQuery: string;

    // Actions
    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
    setSearchQuery: (query: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}