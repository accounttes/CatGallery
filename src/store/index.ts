import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    cats: catsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 