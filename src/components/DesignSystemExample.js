import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Import semua design system constants
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';
import { radius } from '../constants/radius';
import { shadows } from '../constants/shadows';

/**
 * Komponen ini hanya sebagai contoh implementasi Design System.
 * Tidak akan digunakan di produksi akhir.
 */
export default function DesignSystemExample() {
  return (
    <View style={styles.container}>
      {/* Contoh Teks dengan Typography & Colors */}
      <Text style={styles.heading}>Design System</Text>
      <Text style={styles.bodyText}>
        Ini adalah contoh penggunaan typography, spacing, dan color system pada FluxPay.
      </Text>

      {/* Contoh Card dengan Spacing, Radius, Shadow, & Surface Color */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Pengeluaran</Text>
        <Text style={styles.cardAmount}>Rp 450.000</Text>
      </View>

      {/* Contoh Button dengan Primary Color & Radius */}
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>

      {/* Contoh Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Penggunaan Color System
    padding: spacing.lg,                // Penggunaan Spacing System
  },
  heading: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.h1,      // Penggunaan Typography System
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  bodyText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,            // Penggunaan Radius System
    ...shadows.card,                    // Penggunaan Shadow System
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,         // Penggunaan Border Color
  },
  cardTitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cardAmount: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.h2,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.button,
    color: colors.surface, // Teks putih di atas tombol ungu
  },
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
  fabIcon: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: 'bold',
  }
});
