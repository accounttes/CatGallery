import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';

interface FavoriteButtonProps {
  catId: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ catId }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => 
    state.favorites.favorites.includes(catId)
  );

  const handlePress = () => {
    dispatch(toggleFavorite(catId));
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={handlePress}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 