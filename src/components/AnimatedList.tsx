import React from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface AnimatedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  keyExtractor: (item: T) => string;
  numColumns?: number;
  onEndReached?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const AnimatedList = <T extends unknown>({
  data,
  renderItem,
  keyExtractor,
  numColumns = 1,
  onEndReached,
  onRefresh,
  refreshing,
}: AnimatedListProps<T>) => {
  const { colors } = useTheme();
  const scrollY = new Animated.Value(0);

  const animatedItem = (index: number) => {
    const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return {
      transform: [{ scale }],
      opacity,
    };
  };

  return (
    <Animated.FlatList
      data={data}
      renderItem={({ item, index }) => (
        <Animated.View style={[styles.itemContainer, animatedItem(index)]}>
          {renderItem(item, index)}
        </Animated.View>
      )}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
}); 