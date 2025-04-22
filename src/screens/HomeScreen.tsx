import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredAndSortedCats } from '../store/catsSlice';
import { CatCard } from '../components/CatCard';
import { UploadPhoto } from '../components/UploadPhoto';
import FilterBar from '../components/FilterBar';
import { useTheme } from '../theme/ThemeContext';
import { AnimatedTransition } from '../components/AnimatedTransition';
import { AnimatedList } from '../components/AnimatedList';
import { fetchCats } from '../store/catsSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const cats = useSelector(selectFilteredAndSortedCats);
  const loading = useSelector((state: any) => state.cats.loading);
  const error = useSelector((state: any) => state.cats.error);

  useEffect(() => {
    dispatch(fetchCats());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchCats());
  };

  if (loading && !cats.length) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
      </View>
    );
  }

  return (
    <AnimatedTransition>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <FilterBar />
        <UploadPhoto />
        <AnimatedList
          data={cats}
          renderItem={({ item }) => <CatCard cat={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onRefresh={handleRefresh}
          refreshing={loading}
        />
      </View>
    </AnimatedTransition>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen; 