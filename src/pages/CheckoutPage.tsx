import { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Radio, Checkbox, Divider, Steps } from 'antd';
import {
  CreditCardOutlined,
  GiftOutlined,
  CheckCircleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useCheckout } from '../hooks/useCart';

const { Step } = Steps;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upsellItems, setUpsellItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const upsellDiscount = upsellItems.length > 0 ? 15.99 : 0;
  const total = subtotal + shipping + tax - upsellDiscount;
  const { mutate: cartCheckout } = useCheckout();

  const upsellOptions = [
    {
      id: 'laptop-sleeve',
      title: 'Premium Laptop Sleeve',
      originalPrice: 39.99,
      salePrice: 31.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop',
    },
    {
      id: 'bluetooth-mouse',
      title: 'Bluetooth Mouse',
      originalPrice: 29.99,
      salePrice: 23.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop',
    },
  ];

  const handlePlaceOrder = async (values: any) => {
    setLoading(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Order placed:', {
        user,
        items,
        shipping: values.shipping,
        payment: values.payment,
        total,
      });

      cartCheckout();
      clearCart();
      setCurrentStep(2);
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && currentStep !== 2) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="glass-card text-center p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add some items to your cart before checkout.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <Steps current={currentStep} className="mb-8">
        <Step title="Shipping" icon={<CreditCardOutlined />} />
        <Step title="Payment" icon={<LockOutlined />} />
        <Step title="Complete" icon={<CheckCircleOutlined />} />
      </Steps>

      {currentStep === 2 ? (
        // Order Success
        <div className="text-center py-12">
          <Card className="glass-card max-w-md mx-auto p-8">
            <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You'll receive an email confirmation shortly.
            </p>
            <Button type="primary" className="gradient-bg border-0" href="/">
              Continue Shopping
            </Button>
          </Card>
        </div>
      ) : (
        <Row gutter={32}>
          {/* Checkout Form */}
          <Col xs={24} lg={16}>
            <div className="space-y-8">
              {/* Shipping Information */}
              <Card className="glass-card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                <Form layout="vertical" size="large">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                      >
                        <Input className="glass-effect rounded-xl" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                      >
                        <Input className="glass-effect rounded-xl" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input className="glass-effect rounded-xl" />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address' }]}
                  >
                    <Input className="glass-effect rounded-xl" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter your city' }]}
                      >
                        <Input className="glass-effect rounded-xl" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="ZIP Code"
                        name="zipCode"
                        rules={[{ required: true, message: 'Please enter your ZIP code' }]}
                      >
                        <Input className="glass-effect rounded-xl" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>

              {/* Payment Information */}
              <Card className="glass-card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

                {/* Payment Methods */}
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="grid grid-cols-3 gap-4 mb-6"
                >
                  <Radio.Button value="card" className="text-center h-16 glass-effect">
                    <div>
                      <CreditCardOutlined className="text-2xl mb-1" />
                      <div className="text-sm">Card</div>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="paypal" className="text-center h-16 glass-effect">
                    <div>
                      <span className="text-2xl mb-1">💳</span>
                      <div className="text-sm">PayPal</div>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="apple" className="text-center h-16 glass-effect">
                    <div>
                      <span className="text-2xl mb-1">🍎</span>
                      <div className="text-sm">Apple Pay</div>
                    </div>
                  </Radio.Button>
                </Radio.Group>

                {paymentMethod === 'card' && (
                  <Form layout="vertical" size="large" onFinish={handlePlaceOrder}>
                    <Form.Item
                      label="Card Number"
                      name="cardNumber"
                      rules={[{ required: true, message: 'Please enter your card number' }]}
                    >
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="glass-effect rounded-xl"
                      />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Expiry Date"
                          name="expiryDate"
                          rules={[{ required: true, message: 'Please enter expiry date' }]}
                        >
                          <Input
                            placeholder="MM/YY"
                            className="glass-effect rounded-xl"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="CVV"
                          name="cvv"
                          rules={[{ required: true, message: 'Please enter CVV' }]}
                        >
                          <Input
                            placeholder="123"
                            className="glass-effect rounded-xl"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 border-0 font-semibold"
                      >
                        Place Order
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Card>

              {/* Upsell Offers */}
              <Card className="glass-card border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <GiftOutlined className="text-white text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Special Offer - Limited Time!</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Add these popular accessories to complete your tech setup and save 20%!
                </p>

                <Checkbox.Group
                  value={upsellItems}
                  onChange={setUpsellItems}
                  className="w-full"
                >
                  <div className="space-y-3">
                    {upsellOptions.map((item) => (
                      <Checkbox
                        key={item.id}
                        value={item.id}
                        className="w-full"
                      >
                        <div className="flex items-center gap-3 p-3 glass-effect rounded-xl cursor-pointer hover:bg-green-50">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-600">
                              <span className="line-through text-gray-400">
                                ${item.originalPrice}
                              </span>
                              <span className="text-green-600 font-medium ml-2">
                                ${item.salePrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Card>
            </div>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card className="glass-card sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </div>
                      <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <Divider />
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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
                {upsellDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Upsell Savings</span>
                    <span>-${upsellDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Divider />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Your payment information is secured with 256-bit SSL encryption
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
