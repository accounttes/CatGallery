import { createSlice, createAsyncThunk } from '@react-reduxjs/toolkit';
import { Cat } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCachedCats,
  cacheCats,
  shouldUpdateCache,
  isOnline,
} from '../utils/cache';
import { uploadImage } from '../services/api';

export type SortOption = 'date' | 'likes';
export type FilterOption = 'all' | 'favorites';

interface CatsState {
  cats: Cat[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  uploading: boolean;
  uploadError: string | null;
  offlineMode: boolean;
  currentSort: SortOption;
  currentFilter: FilterOption;
}

const initialState: CatsState = {
  cats: [],
  favorites: [],
  loading: false,
  error: null,
  uploading: false,
  uploadError: null,
  offlineMode: false,
  currentSort: 'date',
  currentFilter: 'all',
};

const FAVORITES_KEY = '@CatGallery:favorites';

export const fetchCats = createAsyncThunk(
  'cats/fetchCats',
  async (_, { rejectWithValue }) => {
    try {
      const online = await isOnline();
      if (!online) {
        const cachedCats = await getCachedCats();
        if (cachedCats) {
          return { cats: cachedCats, offlineMode: true };
        }
        throw new Error('Нет подключения к интернету и нет кэшированных данных');
      }

      const shouldUpdate = await shouldUpdateCache();
      if (!shouldUpdate) {
        const cachedCats = await getCachedCats();
        if (cachedCats) {
          return { cats: cachedCats, offlineMode: false };
        }
      }

      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=20');
      const data = await response.json();
      await cacheCats(data);
      return { cats: data, offlineMode: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadFavorites = createAsyncThunk(
  'cats/loadFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      return rejectWithValue('Failed to load favorites');
    }
  }
);

export const uploadCatPhoto = createAsyncThunk(
  'cats/uploadCatPhoto',
  async (uri: string, { rejectWithValue }) => {
    try {
      const response = await uploadImage(uri);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const catId = action.payload;
      const index = state.favorites.indexOf(catId);
      if (index === -1) {
        state.favorites.push(catId);
      } else {
        state.favorites.splice(index, 1);
      }
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
    setSort: (state, action) => {
      state.currentSort = action.payload;
    },
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.loading = false;
        state.cats = action.payload.cats;
        state.offlineMode = action.payload.offlineMode;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(uploadCatPhoto.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })
      .addCase(uploadCatPhoto.fulfilled, (state, action) => {
        state.uploading = false;
        state.cats.unshift(action.payload);
      })
      .addCase(uploadCatPhoto.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload as string;
      });
  },
});

export const { toggleFavorite, setSort, setFilter, clearError } = catsSlice.actions;

export const selectFilteredAndSortedCats = (state: { cats: CatsState }) => {
  const { cats, favorites, currentFilter, currentSort } = state.cats;
  
  let filteredCats = cats;
  if (currentFilter === 'favorites') {
    filteredCats = cats.filter(cat => favorites.includes(cat.id));
  }

  return [...filteredCats].sort((a, b) => {
    if (currentSort === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });
};

export default catsSlice.reducer; 