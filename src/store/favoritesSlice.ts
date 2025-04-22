import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cat, Favorite } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(fav => fav.catId !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, setLoading, setError } = favoritesSlice.actions;

export const loadFavorites = (userId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const favorites = await AsyncStorage.getItem(`favorites_${userId}`);
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const toggleFavorite = (cat: Cat, userId: string) => async (dispatch: any) => {
  try {
    const favorites = await AsyncStorage.getItem(`favorites_${userId}`);
    let favoritesList: Favorite[] = favorites ? JSON.parse(favorites) : [];
    
    const existingFavorite = favoritesList.find(fav => fav.catId === cat.id);
    
    if (existingFavorite) {
      favoritesList = favoritesList.filter(fav => fav.catId !== cat.id);
      dispatch(removeFavorite(cat.id));
    } else {
      const newFavorite: Favorite = {
        id: `${cat.id}_${userId}`,
        catId: cat.id,
        userId,
        createdAt: new Date(),
      };
      favoritesList.push(newFavorite);
      dispatch(addFavorite(newFavorite));
    }
    
    await AsyncStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritesList));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export default favoritesSlice.reducer; 