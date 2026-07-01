import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../atoms/CustomText';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function CustomHeader({
  title,
  onBack,
  rightAction, // React Node (Button/Icon)
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <CustomText variant="h3" color={colors.textPrimary}>
              {'<'}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <CustomText variant="h3" color={colors.textPrimary} style={styles.title}>
          {title}
        </CustomText>
      </View>

      <View style={styles.rightContainer}>
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    textAlign: 'center',
  }
});
