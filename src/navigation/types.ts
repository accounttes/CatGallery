import { Cat } from '../types';

export type RootStackParamList = {
  Home: undefined;
  CatDetails: { catId: string };
  Profile: undefined;
  Favorites: undefined;
  Auth: undefined;
}; 