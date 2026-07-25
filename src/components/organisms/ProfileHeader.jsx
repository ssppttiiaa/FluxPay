// HEADER DI HALAMAN PROFIL

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <CustomText variant="h2" style={styles.logo}>
        FluxPay
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: spacing.xl,
  },

  logo: {
    color: colors.primary,
    fontWeight: "700",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginRight: spacing.md,
  },

  avatarButton: {
    width: 34,
    height: 34,
    borderRadius: 17,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    justifyContent: "center",
    alignItems: "center",
  },
});
