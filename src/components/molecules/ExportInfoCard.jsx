// TEKS PARAGRAF YANG ADA DI DALAM HALAMAN EXPORT CSV

import React from "react";
import { View, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ExportInfoCard() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={44} color={colors.primary} />
      </View>

      <CustomText variant="body" style={styles.text}>
        Ekspor riwayat transaksi langganan ke dalam file CSV untuk kebutuhan
        arsip maupun analisis.
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,

    backgroundColor: "#F2EEFF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: spacing.md,
  },

  text: {
    textAlign: "center",
    lineHeight: 22,
  },
});
