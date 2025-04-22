import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationSettings } from '../store/notificationsSlice';

export const NotificationSettings: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => state.notifications.settings);

  const handleToggle = (key: string) => {
    dispatch(setNotificationSettings({ ...settings, [key]: !settings[key] }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>Настройки уведомлений</Text>
      
      <View style={styles.setting}>
        <Text style={[styles.label, { color: colors.text }]}>Кот дня</Text>
        <Switch
          value={settings.dailyCat}
          onValueChange={() => handleToggle('dailyCat')}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={settings.dailyCat ? colors.primary : colors.border}
        />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, { color: colors.text }]}>Новые фото</Text>
        <Switch
          value={settings.newPhotos}
          onValueChange={() => handleToggle('newPhotos')}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={settings.newPhotos ? colors.primary : colors.border}
        />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.label, { color: colors.text }]}>Избранное</Text>
        <Switch
          value={settings.favorites}
          onValueChange={() => handleToggle('favorites')}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={settings.favorites ? colors.primary : colors.border}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
}); 