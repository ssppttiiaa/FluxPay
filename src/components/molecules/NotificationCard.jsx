import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../atoms/CustomText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';
import { shadows } from '../../constants/shadows';

export default function NotificationCard({ title, description, time }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <CustomText variant="h3" color={colors.textPrimary} style={styles.title}>
          {title}
        </CustomText>
        <CustomText variant="body" color={colors.textSecondary}>
          {description}
        </CustomText>
      </View>
      <View style={styles.timeContainer}>
        <CustomText variant="caption" color={colors.primary}>
          {time}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    ...shadows.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
  timeContainer: {
    alignItems: 'flex-end',
  }
});
