import { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { GiftOutlined } from '@ant-design/icons';

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (values: { email: string }) => {
    console.log('Exit popup email:', values.email);
    setVisible(false);
    // Here you would typically send the email to your backend
  };

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      centered
      className="exit-popup"
      maskStyle={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-linear-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GiftOutlined className="text-white text-2xl" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Wait! Don't Leave Yet!
        </h3>
        
        <p className="text-gray-600 mb-6">
          Get <strong>15% off</strong> your first order with code <strong>TECH15</strong>
        </p>

        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              placeholder="Enter your email for the discount"
              size="large"
              className="glass-effect"
            />
          </Form.Item>
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-linear-to-r from-red-500 to-pink-500 border-0 font-semibold"
            >
              Get My 15% Discount
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="text"
          onClick={() => setVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          No thanks, I'll pay full price
        </Button>
      </div>
    </Modal>
  );
}
