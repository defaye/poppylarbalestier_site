import axios from 'axios';
import { NavigationItem, Page, Post, Category, Tag } from '@/types';

const api = axios.create({
  baseURL: `${import.meta.env.BASE_URL}api`,
  timeout: 10000,
});

// Navigation
export const getNavigation = async (): Promise<NavigationItem[]> => {
  const response = await api.get<NavigationItem[]>('/navigation.json');
  return response.data;
};

// Pages
export const getPages = async (): Promise<Page[]> => {
  const response = await api.get<Page[]>('/pages');
  return response.data;
};

export const getPage = async (slug: string): Promise<Page> => {
  const response = await api.get<Page>(`/${slug}.json`);
  return response.data;
};

export const getHomePage = async (): Promise<Page> => {
  const response = await api.get<Page>('/home.json');
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

// Testimonials
export const getTestimonials = async (page: number = 1, perPage: number = 32): Promise<{
  data: Category[];
  meta: {
    count: number;
    current_page: number;
    first_item: number;
    has_more_pages: boolean;
    last_item: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}> => {
  const response = await api.get('/categories', {
    params: {
      with: ['images', 'tags'],
      name: 'testimonial',
      page,
      per_page: perPage
    }
  });
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

// Contact
export const submitContact = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptcha: string;
}): Promise<boolean> => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export default api;
