import { Spin } from 'antd';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  className?: string;
}

export default function LoadingSpinner({ size = 'default', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <Spin size={size} />
    </div>
  );
}
