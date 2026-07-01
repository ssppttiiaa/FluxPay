import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { shadows } from '../../constants/shadows';

export default function SummaryCard({
  total = "Rp329.000",
  totalSubscription = "12 Layanan",
}) {
  return (

    <LinearGradient
      colors={['#8B5CF6', '#6D5EF9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <CustomText
        variant="caption"
        color="#EDE9FE"
        style={styles.title}
      >
        TOTAL PENGELUARAN BULANAN
      </CustomText>

      <CustomText
        variant="h1"
        color="#FFFFFF"
        style={styles.total}
      >
        {total}
      </CustomText>

      <View style={styles.bottomRow}>

        <View>
          <CustomText
            variant="caption"
            color="#EDE9FE"
          >
            Total Langganan Aktif
          </CustomText>

          <CustomText
            variant="body"
            color="#FFFFFF"
            style={styles.subscription}
          >
            {totalSubscription}
          </CustomText>
        </View>

        <View style={styles.iconContainer}>
          <CustomText variant="body" color="#FFFFFF">
            ☁️
          </CustomText>

          <CustomText
            variant="body"
            color="#FFFFFF"
            style={{ marginLeft: 6 }}
          >
            💳
          </CustomText>
        </View>

      </View>

    </LinearGradient>
  );

}


const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.card,
  },

  title: {
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },

  total: {
    marginBottom: spacing.xl,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  subscription: {
    marginTop: 2,
    fontWeight: '600',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.8,
  },

  circleOne: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -70,
    right: -40,
  },

  circleTwo: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -40,
    left: -30,
  },
});