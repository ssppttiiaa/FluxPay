import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ExportHeader({
  navigation,
  title = "Export Data",
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <CustomText
        variant="h3"
        style={styles.title}
      >
        {title}
      </CustomText>

      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: spacing.xl,
  },

  title: {
    fontWeight: "700",
  },
});