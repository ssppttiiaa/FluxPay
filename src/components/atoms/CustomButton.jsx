import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary' | 'secondary' | 'danger'
  disabled = false,
  loading = false,
  style
}) {
  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    if (variant === 'secondary') return 'transparent';
    if (variant === 'danger') return colors.error;
    return colors.primary; // default primary
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
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <CustomText variant="button" color={getTextColor()}>
          {title}
        </CustomText>
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
  outline: {
    borderWidth: 1,
    borderColor: colors.primary,
  }
});
