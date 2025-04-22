import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../theme/ThemeContext';

interface ShareButtonProps {
  url: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(url);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={handleShare}
    >
      <Ionicons
        name="share-outline"
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