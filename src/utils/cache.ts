import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Cat } from '../types';

const CACHE_KEYS = {
  CATS: 'cats',
  FAVORITES: 'favorites',
  LAST_UPDATE: 'last_update',
};

export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

export const getCachedCats = async (): Promise<Cat[]> => {
  try {
    const cachedCats = await AsyncStorage.getItem(CACHE_KEYS.CATS);
    return cachedCats ? JSON.parse(cachedCats) : [];
  } catch (error) {
    console.error('Error getting cached cats:', error);
    return [];
  }
};

export const cacheCats = async (cats: Cat[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CACHE_KEYS.CATS, JSON.stringify(cats));
    await AsyncStorage.setItem(CACHE_KEYS.LAST_UPDATE, new Date().toISOString());
  } catch (error) {
    console.error('Error caching cats:', error);
  }
};

export const getLastUpdate = async (): Promise<Date | null> => {
  try {
    const lastUpdate = await AsyncStorage.getItem(CACHE_KEYS.LAST_UPDATE);
    return lastUpdate ? new Date(lastUpdate) : null;
  } catch (error) {
    console.error('Error getting last update:', error);
    return null;
  }
};

export const shouldUpdateCache = async (): Promise<boolean> => {
  const lastUpdate = await getLastUpdate();
  if (!lastUpdate) return true;

  const now = new Date();
  const hoursSinceLastUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastUpdate > 1; // Обновляем кэш каждый час
}; 