import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FavoriteButton } from './FavoriteButton';
import { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
  onPress: (cat: Cat) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => onPress(cat)}
    >
      <Image source={{ uri: cat.url }} style={styles.image} />
      <View style={styles.actions}>
        <FavoriteButton catId={cat.id} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  actions: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}); 