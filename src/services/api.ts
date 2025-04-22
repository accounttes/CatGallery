import { Cat } from '../types';
import { API_CONFIG, API_HEADERS } from '../config/api';

export const uploadImage = async (uri: string): Promise<Cat> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.uploadEndpoint}`, {
      method: 'POST',
      body: formData,
      headers: {
        ...API_HEADERS,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке изображения');
    }

    const data = await response.json();
    return {
      id: data.id,
      url: data.url,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Не удалось загрузить изображение');
  }
};

export const fetchCats = async (limit: number = API_CONFIG.defaultLimit): Promise<Cat[]> => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.searchEndpoint}?limit=${limit}`,
      {
        headers: API_HEADERS,
      }
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке котиков');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не удалось загрузить котиков');
  }
};

export const fetchCatById = async (id: string): Promise<Cat> => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/images/${id}`, {
      headers: API_HEADERS,
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке котика');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не удалось загрузить котика');
  }
};

export const fetchBreeds = async () => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.breedsEndpoint}`, {
      headers: API_HEADERS,
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке пород');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch breeds error:', error);
    throw new Error('Не удалось загрузить породы');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.categoriesEndpoint}`, {
      headers: API_HEADERS,
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке категорий');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch categories error:', error);
    throw new Error('Не удалось загрузить категории');
  }
}; 