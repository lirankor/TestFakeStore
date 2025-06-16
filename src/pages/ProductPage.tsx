import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Rate, InputNumber, Breadcrumb, Carousel, Tabs } from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const { TabPane } = Tabs;

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading: loading } = useProduct(parseInt(id || '0'));
  const [quantity, setQuantity] = useState(1);
  const [, setActiveImage] = useState(0);

  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  const images = [product.image]; // In a real app, you'd have multiple images

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card className="glass-card">
            <Carousel
              dots
              autoplay
              className="mb-4"
              beforeChange={(_, next) => setActiveImage(next)}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-96 object-contain rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12}>
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="text-sm text-blue-600 font-medium mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {product.rating && (
                <div className="flex items-center mb-4">
                  <Rate disabled defaultValue={product.rating.rate} className="text-lg" />
                  <span className="ml-2 text-gray-600">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center text-green-600">
                <CheckCircleOutlined className="mr-2" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center text-blue-600">
                <TruckOutlined className="mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center text-purple-600">
                <SafetyOutlined className="mr-2" />
                <span>1 Year Warranty</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  className="glass-effect"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  className="flex-1 gradient-bg border-0 font-semibold h-12"
                >
                  Add to Cart
                </Button>
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  className="glass-effect h-12"
                />
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  className="glass-effect h-12"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Details Tabs */}
      <Row className="mt-12">
        <Col span={24}>
          <Card className="glass-card">
            <Tabs defaultActiveKey="description" size="large">
              <TabPane tab="Description" key="description">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Premium quality materials</li>
                      <li>Advanced technology integration</li>
                      <li>Ergonomic design for comfort</li>
                      <li>Durable construction for long-lasting use</li>
                      <li>Compatible with multiple devices</li>
                    </ul>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Specifications" key="specifications">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Technical Specifications</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category:</dt>
                        <dd className="font-medium">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Weight:</dt>
                        <dd className="font-medium">0.5 lbs</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Dimensions:</dt>
                        <dd className="font-medium">10" x 8" x 2"</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Warranty:</dt>
                        <dd className="font-medium">1 Year</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Compatibility</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ iOS devices</li>
                      <li>✓ Android devices</li>
                      <li>✓ Windows computers</li>
                      <li>✓ Mac computers</li>
                    </ul>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Reviews" key="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <Button type="primary" className="gradient-bg border-0">
                      Write a Review
                    </Button>
                  </div>

                  {product.rating && (
                    <div className="glass-effect rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl font-bold">{product.rating.rate}</div>
                        <div>
                          <Rate disabled defaultValue={product.rating.rate} />
                          <div className="text-sm text-gray-600">
                            Based on {product.rating.count} reviews
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-center text-gray-500 py-8">
                    No reviews yet. Be the first to review this product!
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Shipping & Returns" key="shipping">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Shipping Information</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Free standard shipping on orders over $50</p>
                      <p>• Express shipping available for $9.99</p>
                      <p>• Orders placed before 2 PM ship same day</p>
                      <p>• Delivery time: 3-7 business days</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Return Policy</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• 30-day return window</p>
                      <p>• Items must be in original condition</p>
                      <p>• Free returns for defective items</p>
                      <p>• Refunds processed within 5-7 business days</p>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
