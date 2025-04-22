import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ShareButton } from '../components/ShareButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { Cat } from '../types';
import { fetchCatById } from '../services/api';
import { useDispatch } from 'react-redux';
import { setError } from '../store/slices/errorSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CatDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CatDetails'>;

export const CatDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<CatDetailsScreenNavigationProp>();
  const route = useRoute();
  const dispatch = useDispatch();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCat = async () => {
      try {
        const catId = (route.params as { catId: string }).catId;
        const catData = await fetchCatById(catId);
        setCat(catData);
      } catch (error) {
        dispatch(setError('Failed to load cat details'));
      } finally {
        setLoading(false);
      }
    };

    loadCat();
  }, [route.params, dispatch]);

  if (loading || !cat) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.background} />
        </TouchableOpacity>
        <ShareButton url={cat.url} />
      </View>

      <Image source={{ uri: cat.url }} style={styles.image} />

      <View style={[styles.infoContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Cat Details</Text>
        <Text style={[styles.text, { color: colors.text }]}>ID: {cat.id}</Text>
        {cat.breeds && cat.breeds.length > 0 && (
          <Text style={[styles.text, { color: colors.text }]}>
            Breed: {cat.breeds[0].name}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <FavoriteButton catId={cat.id} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
}); 