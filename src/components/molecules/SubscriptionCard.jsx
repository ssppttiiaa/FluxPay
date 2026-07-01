import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { shadows } from '../../constants/shadows';

export default function SubscriptionCard({
  logo = "🎵",
  name,
  dueDate,
  category,
  price,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >

      {/* Logo */}
      <View style={styles.logoBox}>
        <CustomText variant="h3">
          {logo}
        </CustomText>
      </View>

      {/* Informasi */}
      <View style={styles.infoContainer}>

        <CustomText variant="body" style={styles.name}>
          {name}
        </CustomText>

        <CustomText
          variant="caption"
          color={colors.textSecondary}
        >
          Tagihan: {dueDate}
        </CustomText>

        <View style={styles.badge}>
          <CustomText
            variant="caption"
            color={colors.primary}
          >
            {category}
          </CustomText>
        </View>

      </View>

      {/* Harga */}
      <View style={styles.priceContainer}>

        <CustomText
          variant="body"
          style={styles.price}
        >
          {price}
        </CustomText>

        <CustomText
          variant="caption"
          color={colors.textSecondary}
        >
          Bulanan
        </CustomText>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: colors.surface,

    padding: spacing.md,

    borderRadius: radius.lg,

    marginBottom: spacing.md,

    ...shadows.card,
  },

  logoBox: {
    width: 56,
    height: 56,

    borderRadius: radius.md,

    backgroundColor: '#F3F4F6',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: spacing.md,
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontWeight: '600',
    marginBottom: 2,
  },

  badge: {
    alignSelf: 'flex-start',

    marginTop: spacing.sm,

    paddingHorizontal: 10,
    paddingVertical: 3,

    borderRadius: radius.full,

    backgroundColor: '#EEE9FF',
  },

  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  price: {
    fontWeight: '700',
    marginBottom: 3,
  },

});