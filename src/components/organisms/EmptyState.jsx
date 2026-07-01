import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../atoms/CustomText';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function EmptyState({
  title,
  description,
  illustration, // React Node (Image or Icon)
}) {
  return (
    <View style={styles.container}>
      {illustration && (
        <View style={styles.illustrationContainer}>
          {illustration}
        </View>
      )}
      <CustomText variant="h3" color={colors.textPrimary} style={styles.title}>
        {title}
      </CustomText>
      <CustomText variant="body" color={colors.textSecondary} style={styles.description}>
        {description}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  illustrationContainer: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  }
});
