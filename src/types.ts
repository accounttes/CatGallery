export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
  categories?: Category[];
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    error: string;
    success: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  timestamp: number;
}

export interface RootState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
  cats: {
    items: Cat[];
    loading: boolean;
    error: string | null;
  };
  favorites: {
    items: string[];
  };
  error: {
    message: string | null;
  };
} 