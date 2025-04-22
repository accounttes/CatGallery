import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'favorites', label: 'Избранное' },
    { id: 'uploaded', label: 'Мои фото' },
  ];

  const sorts = [
    { id: 'newest', label: 'Новые', icon: 'arrow-down' },
    { id: 'oldest', label: 'Старые', icon: 'arrow-up' },
  ];

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSortPress = (sortId: string) => {
    setActiveSort(sortId);
    onSortChange(sortId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && { backgroundColor: colors.primary },
            ]}
            onPress={() => handleFilterPress(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                { color: activeFilter === filter.id ? colors.background : colors.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sortContainer}>
        {sorts.map((sort) => (
          <TouchableOpacity
            key={sort.id}
            style={[
              styles.sortButton,
              activeSort === sort.id && { backgroundColor: colors.primary },
            ]}
            onPress={() => handleSortPress(sort.id)}
          >
            <Ionicons
              name={sort.icon as any}
              size={20}
              color={activeSort === sort.id ? colors.background : colors.text}
            />
            <Text
              style={[
                styles.sortText,
                { color: activeSort === sort.id ? colors.background : colors.text },
              ]}
            >
              {sort.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  sortText: {
    marginLeft: 5,
    fontSize: 12,
  },
}); 