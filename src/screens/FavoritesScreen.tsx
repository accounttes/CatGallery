import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedCats } from '../store/catsSlice';
import { CatCard } from '../components/CatCard';
import FilterBar from '../components/FilterBar';
import { useTheme } from '../theme/ThemeContext';

const FavoritesScreen = () => {
  const { theme } = useTheme();
  const cats = useSelector(selectFilteredAndSortedCats);

  if (cats.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
          No favorite cats yet
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FilterBar />
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatCard cat={item} />}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default FavoritesScreen; 