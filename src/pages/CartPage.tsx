import { Row, Col, Card, Button, InputNumber, Empty, Divider, Alert } from 'antd';
import {
  DeleteOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getItemCount, clearCart } = useCartStore();

  const taxRate = 0.19; // 19%
  const totalWithTax = getTotalPrice(); // This is the price including tax
  const subtotal = totalWithTax / (1 + taxRate); // Remove tax to get pre-tax amount
  const tax = totalWithTax - subtotal; // Calculate the tax amount
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = totalWithTax + shipping; // Total = price with tax + shipping


  const upsellItems = [
    {
      id: 'upsell-1',
      title: 'Premium Phone Case',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=60&h=60&fit=crop',
    },
    {
      id: 'upsell-2',
      title: 'Laptop Stand',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop',
    },
  ];

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="glass-card text-center p-12">
          <Empty
            image={<ShoppingOutlined className="text-6xl text-gray-300" />}
            description={
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              </div>
            }
          >
            <Link to="/products">
              <Button type="primary" size="large" className="gradient-bg border-0 font-semibold">
                Start Shopping
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <Row gutter={32}>
        {/* Cart Items */}
        <Col xs={24} lg={16}>
          {subtotal > 50 ? (
            <Alert message={<span><b>Free shipping</b> on orders over $50</span>} type="success" showIcon className="mb-4" />
          ) : (
            <Alert message={<span><b>Shipping</b> $9.99, Order over $50 for free shipping</span>} type="info" showIcon className="mb-4" />
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Cart Items ({getItemCount()})
            </h2>
            <Button type="text" onClick={clearCart} className="text-red-500 hover:text-red-700">
              Clear All
            </Button>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 p-4 glass-effect rounded-xl">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
                  <div className="text-lg font-bold text-gray-900">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.productId, value || 1)}
                    className="glass-effect"
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Order Summary */}
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            {/* Summary */}
            <Card className="glass-card sticky top-24 z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getItemCount()} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Divider />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button
                  type="primary"
                  size="large"
                  icon={<CreditCardOutlined />}
                  className="w-full gradient-bg border-0 font-semibold mb-4"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  size="large"
                  className="w-full glass-effect font-semibold hover:bg-white hover:bg-opacity-30"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Card>

            <Card className="glass-card z-1">
              <div className="flex items-center gap-2 mb-4">
                <GiftOutlined className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">You might also like</h3>
              </div>

              <div className="space-y-4">
                {upsellItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-blue-600 font-medium">${item.price}</div>
                    </div>
                    <Button
                      type="text"
                      size="small"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
