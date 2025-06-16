import { Card, Button, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import type { Product } from '../../types/ProductInterface';
import { useAddToCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { mutate: addItem } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ product, quantity: 1 });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        hoverable
        className={`product-card overflow-hidden ${className}`}
        cover={
          <div className="relative h-48 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <Button
              type="text"
              icon={<HeartOutlined />}
              className="absolute top-3 right-3 glass-effect rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:bg-opacity-30"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </div>
        }
        actions={[
          <div className="flex flex-col gap-2 px-4">
            <Button
              key="cart"
              type="primary"
              icon={<ShoppingCartOutlined />}
              className="gradient-bg border-0 font-medium w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>

        ]}
      >
        <Card.Meta
          title={
            <h3 className="font-semibold text-gray-900 truncate">
              {product.title}
            </h3>
          }
          description={
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              {product.rating && (
                <div className="flex items-center">
                  <Rate disabled defaultValue={product.rating.rate} className="text-sm" />
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating.count})
                  </span>
                </div>
              )}
              <div className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
}
