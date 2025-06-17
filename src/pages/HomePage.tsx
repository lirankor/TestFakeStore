import { Button, Row, Col, Card, Form, Input, Statistic } from 'antd';
import {
  SoundOutlined,
  ThunderboltOutlined,
  LaptopOutlined,
  SafetyOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/ProductInterface';

export default function HomePage() {
  const { data: products = [], isLoading: loading } = useProducts(4);


  const featuredCategories = [
    {
      icon: <SoundOutlined className="text-2xl text-white" />,
      title: 'Audio',
      description: 'Premium headphones & speakers',
      color: 'from-blue-500 to-blue-600',
      href: '/products?category=electronics',
    },
    {
      icon: <ThunderboltOutlined className="text-2xl text-white" />,
      title: 'Charging',
      description: 'Cables & wireless chargers',
      color: 'from-purple-500 to-purple-600',
      href: '/products?category=electronics',
    },
    {
      icon: <LaptopOutlined className="text-2xl text-white" />,
      title: 'Computing',
      description: 'Keyboards, mice & stands',
      color: 'from-indigo-500 to-indigo-600',
      href: '/products?category=electronics',
    },
    {
      icon: <SafetyOutlined className="text-2xl text-white" />,
      title: 'Protection',
      description: 'Cases & screen protectors',
      color: 'from-green-500 to-green-600',
      href: '/products?category=electronics',
    },
  ];

  const bestSellers = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Premium{' '}
                    <span className="text-gradient">Tech Accessories</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Discover cutting-edge technology accessories that enhance your digital lifestyle.
                    From premium cables to innovative gadgets.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products">
                    <Button
                      type="primary"
                      size="large"
                      className="gradient-bg border-0 font-semibold px-8 py-6 h-auto hover-scale"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button
                      size="large"
                      className="glass-effect font-semibold px-8 py-6 h-auto hover:bg-white hover:bg-opacity-20"
                    >
                      Explore Categories
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <Row gutter={32} className="pt-8 border-t border-gray-200">
                  <Col span={8}>
                    <Statistic title="Products" value={500} suffix="+" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Happy Customers" value={50} suffix="K+" />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Rating" value={4.9} suffix="★" precision={1} />
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div className="relative">
                <div className="floating-animation">
                  <img
                    src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                    alt="Tech Accessories Display"
                    className="rounded-3xl shadow-2xl glass-card w-full"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 glass-effect rounded-2xl flex items-center justify-center">
                  <SoundOutlined className="text-2xl text-blue-600" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 glass-effect rounded-xl flex items-center justify-center">
                  <LaptopOutlined className="text-xl text-purple-600" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium tech accessories
            </p>
          </div>

          <Row gutter={[24, 24]}>
            {featuredCategories.map((category) => (
              <Col key={category.title} xs={12} md={6}>
                <Link to={category.href}>
                  <Card
                    hoverable
                    className="glass-card text-center hover-scale cursor-pointer h-full"
                    bodyStyle={{ padding: '24px' }}
                  >
                    <div className={`w-16 h-16 bg-linear-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <span className="text-blue-600 text-sm font-medium">
                      Browse <ArrowRightOutlined className="ml-1" />
                    </span>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16 bg-white bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Sellers</h2>
              <p className="text-gray-600">Most popular items this month</p>
            </div>
            <Link to="/products">
              <Button type="text" className="text-blue-600 font-medium hover:text-blue-700">
                View All <ArrowRightOutlined />
              </Button>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row gutter={[24, 24]}>
              {bestSellers.map((product: Product) => (
                <Col key={product.id} xs={12} md={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="glass-card p-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest tech accessories, exclusive deals, and product launches delivered to your inbox.
            </p>

            <Form
              layout="horizontal"
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center"
              onFinish={(values) => console.log('Newsletter signup:', values)}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
                className="flex-1"
              >
                <Input
                  placeholder="Enter your email"
                  size="large"
                  className="glass-effect rounded-full"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="gradient-bg border-0 font-semibold px-8 rounded-full"
                >
                  Subscribe
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
