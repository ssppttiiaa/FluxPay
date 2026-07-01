import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';

export default function CategoryChip({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        isActive ? styles.activeChip : styles.inactiveChip
      ]}
    >
      <CustomText
        variant="caption"
        color={isActive ? colors.surface : colors.textSecondary}
        style={{
          fontWeight: '600',
        }}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  inactiveChip: {
    backgroundColor: colors.surface,
    borderColor: '#E5E7EB',
  },
});
