import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ProfileMenuItem({
  icon,
  title,
  onPress,
  showBorder = true,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, !showBorder && styles.lastItem]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>

        <CustomText variant="body">{title}</CustomText>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,

    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,

    backgroundColor: "#F4F0FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: spacing.md,
  },
});
