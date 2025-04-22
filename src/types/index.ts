export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface Favorite {
  id: string;
  catId: string;
  userId: string;
  createdAt: Date;
} 