import { Row, Col, Card, Select, Checkbox, Button, Slider, Empty, Spin, Alert } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import ProductCard from '../components/product/ProductCard';
import { useProducts, useCategories } from '../hooks/useProducts';
import { useProductStore } from '../store/productStore';
import type { Product } from '../types/ProductInterface';

const { Option } = Select;

export default function ProductListPage() {
  // React Query hooks for server state
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Zustand store for client state
  const {
    filters,
    searchQuery,
    viewMode,
    priceRange,
    selectedCategories,
    setFilters,
    setViewMode,
    setPriceRange,
    setSelectedCategories,
    clearFilters,
  } = useProductStore();

  // Filter and sort products
  const filteredProducts = products.filter((product: Product) => {
    // Search query filter
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];
  if (filters.sortBy) {
    sortedProducts.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }

  const handleCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const applyFilters = () => {
    setFilters({
      category: selectedCategories.length > 0 ? selectedCategories[0] : null,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  // Loading state
  if (productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (productsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert
          message="Error Loading Products"
          description="Failed to load products. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Row gutter={32}>
        {/* Sidebar Filters */}
        <Col xs={24} lg={6}>
          <Card className="sidebar-glass sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <Button type="text" onClick={clearFilters} className="text-sm">
                Clear All
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Category</h4>
              {categoriesLoading ? (
                <Spin size="small" />
              ) : (
                <Checkbox.Group
                  options={categories.map((cat: string) => ({ label: cat, value: cat }))}
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  className="flex flex-col space-y-2"
                />
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
              <Slider
                range
                min={0}
                max={1000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                tooltip={{ formatter: (value?: number) => value ? `$${value}` : '' }}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Button
              type="primary"
              onClick={applyFilters}
              className="w-full gradient-bg border-0"
            >
              Apply Filters
            </Button>
          </Card>
        </Col>

        {/* Product Grid */}
        <Col xs={24} lg={18}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
              <p className="text-gray-600 mt-1">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Select
                value={filters.sortBy}
                onChange={(value) => setFilters({ sortBy: value })}
                placeholder="Sort by"
                className="w-48"
                allowClear
              >
                <Option value="price_asc">Price: Low to High</Option>
                <Option value="price_desc">Price: High to Low</Option>
                <Option value="rating">Rating</Option>
                <Option value="title">Name</Option>
              </Select>

              <div className="flex glass-effect rounded-lg">
                <Button
                  type={viewMode === 'grid' ? 'primary' : 'text'}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'gradient-bg border-0' : ''}
                />
                <Button
                  type={viewMode === 'list' ? 'primary' : 'text'}
                  icon={<BarsOutlined />}
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'gradient-bg border-0' : ''}
                />
              </div>
            </div>
          </div>

          {/* Products */}
          {sortedProducts.length === 0 ? (
            <Empty
              description="No products found"
              className="my-12"
            />
          ) : (
            <Row gutter={[24, 24]}>
              {sortedProducts.map((product: Product) => (
                <Col
                  key={product.id}
                  xs={24}
                  sm={viewMode === 'grid' ? 12 : 24}
                  lg={viewMode === 'grid' ? 8 : 24}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}
