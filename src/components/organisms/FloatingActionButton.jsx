import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../atoms/CustomText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';
import { shadows } from '../../constants/shadows';

export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity 
      style={styles.fab} 
      activeOpacity={0.8} 
      onPress={onPress}
    >
      <CustomText variant="h2" color={colors.surface} style={styles.icon}>
        +
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: spacing.xxl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.floating,
  },
  icon: {
    lineHeight: 32,
  }
});
