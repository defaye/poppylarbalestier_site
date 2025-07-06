import axios from 'axios';
import { ApiResponse, NavigationItem, Page, Post, Category, Tag } from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Navigation
export const getNavigation = async (): Promise<NavigationItem[]> => {
  const response = await api.get<NavigationItem[]>('/navigation');
  return response.data;
};

// Pages
export const getPages = async (): Promise<Page[]> => {
  const response = await api.get<Page[]>('/pages');
  return response.data;
};

export const getPage = async (slug: string): Promise<Page> => {
  const response = await api.get<Page>(`/pages/${slug}`);
  return response.data;
};

export const getHomePage = async (): Promise<Page> => {
  const response = await api.get<Page>('/pages/home');
  return response.data;
};

// Posts
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const getPost = async (slug: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${slug}`);
  return response.data;
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/categories');
  return response.data;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const response = await api.get<Category>(`/categories/${slug}`);
  return response.data;
};

export const getCategoryPosts = async (slug: string): Promise<Post[]> => {
  const response = await api.get<Post[]>(`/categories/${slug}/posts`);
  return response.data;
};

// Tags
export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>('/tags');
  return response.data;
};

export default api;
