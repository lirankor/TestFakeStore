import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useLogin } from '../hooks/useAuth'
import type { LoginForm } from '../types/AuthInterface'
import { Link } from 'react-router-dom'

export const Login = () => {
     const loginMutation = useLogin()

     const onFinish = (values: LoginForm) => {
          loginMutation.mutate(values)
     }

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <Card className="w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
                    <Form
                         name="login"
                         onFinish={onFinish}
                         layout="vertical"
                         size="large"
                    >
                         <Form.Item
                              name="username"
                              rules={[{ required: true, message: 'Please input your username!' }]}
                         >
                              <Input prefix={<UserOutlined />} placeholder="Username" />
                         </Form.Item>

                         <Form.Item
                              name="password"
                              rules={[{ required: true, message: 'Please input your password!' }]}
                         >
                              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                         </Form.Item>

                         <Form.Item>
                              <Button
                                   type="primary"
                                   htmlType="submit"
                                   className="w-full h-[55px]"
                                   loading={loginMutation.isPending}
                              >
                                   {loginMutation.isPending ? 'Logging in...' : 'Log in'}
                              </Button>
                         </Form.Item>
                    </Form>

                    <div className="text-center mt-4">
                         Don't have an account? <Link to="/register">Register!</Link>
                    </div>
               </Card>
          </div>
     )
}
