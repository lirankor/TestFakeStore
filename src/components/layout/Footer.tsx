import { Layout, Row, Col, Space } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const socialLinks = [
    { icon: <FacebookOutlined />, href: '#' },
    { icon: <TwitterOutlined />, href: '#' },
    { icon: <InstagramOutlined />, href: '#' },
    { icon: <LinkedinOutlined />, href: '#' },
  ];

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'Audio', href: '/products?category=electronics' },
        { label: 'Charging', href: '/products?category=electronics' },
        { label: 'Computing', href: '/products?category=electronics' },
        { label: 'Protection', href: '/products?category=electronics' },
        { label: 'All Products', href: '/products' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Warranty', href: '/warranty' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <AntFooter className="glass-card border-t border-gray-200 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} md={6}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <h3 className="text-lg font-bold text-gradient">TechStore</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your trusted partner for premium tech accessories. Quality, innovation, and style in every product.
              </p>
              <Space size="middle">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-primary transition-colors text-lg"
                  >
                    {social.icon}
                  </a>
                ))}
              </Space>
            </div>
          </Col>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <Col key={section.title} xs={12} md={6}>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 TechStore. All rights reserved. Made with ❤️ for tech enthusiasts.
          </p>
        </div>
      </div>
    </AntFooter>
  );
}
