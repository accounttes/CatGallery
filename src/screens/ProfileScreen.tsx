import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  NotificationSettings: undefined;
  // Добавьте другие экраны по мере необходимости
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigateToNotifications = () => {
    navigation.navigate('NotificationSettings');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={theme.colors.primary}
        />
        <Text style={[styles.username, { color: theme.colors.text }]}>
          {user?.email || 'Гость'}
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.card }]}
          onPress={navigateToNotifications}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.colors.text}
            />
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              Уведомления
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.card }]}
          onPress={handleLogout}
        >
          <View style={styles.buttonContent}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color={theme.colors.error}
            />
            <Text style={[styles.buttonText, { color: theme.colors.error }]}>
              Выйти
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ProfileScreen; 