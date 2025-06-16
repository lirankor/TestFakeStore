import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { login as loginApi, register as registerApi } from '../services/api'
import type { LoginForm, User } from '../types/AuthInterface'

export const useLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: ({ username, password }: LoginForm) => 
      loginApi(username, password),
    
    onSuccess: (data: User) => {
      login(data)
      message.success('Login successful!')
      navigate('/')
    },
    
    onError: (error: unknown) => {
      console.log('Login error:', error)
      message.error('Login failed. Please check your credentials.')
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { message } = App.useApp()

  return useMutation({
    mutationFn: (userData: { email: string; username: string; password: string }) => 
      registerApi(userData),
    onSuccess: (data: User) => {
      login(data)
      message.success('Registration successful!')
      navigate('/')
    },
    onError: (error) => {
      console.error('Registration error:', error)
      message.error('Registration failed. Please try again.')
    },
    retry: 1,
    retryDelay: 1000,
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const { message } = App.useApp()

  return () => {
    logout()
    message.success('Logged out successfully!')
    navigate('/login')
  }
}
