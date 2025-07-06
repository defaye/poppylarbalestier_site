export interface Image {
  id: number;
  name: string;
  extension: string;
  size: number;
  reference: string;
  created_at: string;
  updated_at: string;
  path: string;
  filename: string;
  alt_text?: string;
  pivot?: {
    imageable_id: number;
    image_id: number;
    imageable_type: string;
    position: number;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: number;
  name: string;
  element_name: string;
  body?: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  component?: Component;
  images?: Image[];
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
  images?: Image[];
}

export interface NavigationItem {
  id: number;
  name: string;
  position: number;
  page: Page;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
