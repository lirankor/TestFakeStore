import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Button, Badge, Avatar, Dropdown, Menu } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useLogout } from '../../hooks/useAuth';
// import { useProductStore } from '../../stores/products';

const { Header: AntHeader } = Layout;

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const { user, isLoggedIn } = useAuthStore();
  const { getItemCount } = useCartStore();
  // const { setSearchQuery } = useProductStore();

  const cartItemCount = getItemCount();
  const handleLogout = useLogout();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/account'),
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'Orders',
      onClick: () => navigate('/account?tab=orders'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/account?tab=settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const navItems = [
    { key: '/', label: 'Home' },
    { key: '/products', label: 'Products' },
    { key: '/products', label: 'Deals' },
  ];

  return (
    <AntHeader className="nav-glass sticky top-0 z-50 px-4 py-0 h-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">T</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">FakeStore</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.key} to={item.key}>
                <Button
                  type="text"
                  className={`font-medium ${location.pathname === item.key
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                    }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <>
              {/* User Avatar */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Avatar
                    icon={<UserOutlined />}
                    size="default"
                    className="border-2 border-white shadow-sm"
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                </div>
              </Dropdown>
            </>
          ) : (
            <Link to="/login">
              <Button type="primary" className="gradient-bg border-0">
                Sign In
              </Button>
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart">
            <Badge count={cartItemCount} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                className="glass-effect rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:bg-opacity-20"
                size="large"
              />
            </Badge>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="md:hidden glass-effect rounded-lg"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-card border-t">
          <Menu mode="vertical" className="border-0 bg-transparent">
            {navItems.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.key} onClick={() => setMobileMenuVisible(false)}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      )}
    </AntHeader>
  );
}
