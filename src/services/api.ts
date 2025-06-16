import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password })
  return response.data
}

export const register = async (userData: {
  email: string
  username: string
  password: string
}) => {
  const response = await api.post('/users', userData)
  return response.data
}

export const getProducts = async (limit = 20) => {
  const response = await api.get(`/products?limit=${limit}`)
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const getCategories = async () => {
  const response = await api.get('/products/categories')
  return response.data
}

export const createCart = async (cartData: {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}) => {
  const response = await api.post('/carts', cartData);
  return response.data;
}

export const updateCart = async (cartId: string, cartData: {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}) => {
  const response = await api.put(`/carts/${cartId}`, cartData);
  return response.data;
}