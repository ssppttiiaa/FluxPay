// CARD PILIH TANGGAL YANG ADA DI DALAM HALAMAN SCREEN EXPORT DATA

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";

export default function DateRangeCard({ date = "Belum dipilih", onPress }) {
  return (
    <View style={styles.container}>
      <CustomText variant="caption" style={styles.label}>
        PILIH TANGGAL
      </CustomText>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color={colors.primary}
            />
          </View>

          <View>
            <CustomText variant="body">Pilih Rentang Tanggal</CustomText>

            <CustomText variant="caption" color={colors.textSecondary}>
              {date}
            </CustomText>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },

  label: {
    marginBottom: spacing.sm,
    fontWeight: "700",
    color: "#6B7280",
  },

  card: {
    backgroundColor: colors.surface,

    borderRadius: radius.lg,

    padding: spacing.md,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    ...shadows.card,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#F3EEFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: spacing.md,
  },
});
