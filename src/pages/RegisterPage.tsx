import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useRegister } from '../hooks/useAuth'
import type { RegisterForm } from '../types/AuthInterface'
import { Link } from 'react-router-dom'

export const Register = () => {
     const registerMutation = useRegister()

     const onFinish = (values: RegisterForm) => {
          registerMutation.mutate(values)
     }

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
               <Card className="w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-8">Create an account</h1>
                    <Form
                         name="register"
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
                              name="email"
                              rules={[{ required: true, message: 'Please input your email!' }]}
                         >
                              <Input prefix={<MailOutlined />} placeholder="Email" />
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
                                   loading={registerMutation.isPending}
                              >
                                   {registerMutation.isPending ? 'Registering...' : 'Register'}
                              </Button>
                         </Form.Item>
                    </Form>

                    <div className="text-center mt-4">
                         Already have an account? <Link to="/login">Login!</Link>
                    </div>
               </Card>
          </div>
     )
}
