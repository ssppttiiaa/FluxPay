// CARD MENU YANG ADA DI HALAMAN PROFIL

import React from "react";
import { View, StyleSheet } from "react-native";

import ProfileMenuItem from "./ProfileMenuItem";

import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";

export default function MenuCard({ navigation }) {
  return (
    <View style={styles.card}>
      <ProfileMenuItem
        icon="person-outline"
        title="Edit Profil"
        showBorder={true}
        onPress={() => navigation.navigate("EditProfile")}
      />

      <ProfileMenuItem
        icon="download-outline"
        title="Export Data"
        showBorder={true}
        onPress={() => navigation.navigate("Export")}
      />

      {/* <ProfileMenuItem
        icon="information-circle-outline"
        title="Tentang Aplikasi"
        showBorder={false}
        onPress={() => navigation.navigate("TentangAplikasi")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
});