//  CARD LOGOUT YANG ADA DI HALAMAN PROFIL

import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";

export default function LogoutCard({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        </View>

        <CustomText variant="body" style={styles.logoutText}>
          Logout
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,

    backgroundColor: colors.surface,

    borderRadius: radius.lg,

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,

    ...shadows.card,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#FEECEC",

    justifyContent: "center",
    alignItems: "center",

    marginRight: spacing.md,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
