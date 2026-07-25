import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CustomText from './CustomText';

import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon = null,
  style,
}) {
  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    if (variant === 'secondary') return 'transparent';
    if (variant === 'danger') return colors.error;
    return colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    if (variant === 'secondary') return colors.primary;
    return colors.surface;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        variant === 'secondary' && styles.outline,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={getTextColor()}
              style={styles.icon}
            />
          )}

          <CustomText variant="button" color={getTextColor()}>
            {title}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: spacing.sm,
  },

  outline: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
});