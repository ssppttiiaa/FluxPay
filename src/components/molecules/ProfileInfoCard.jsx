//  CARD INFO NAMA, EMAIL DI HALAMAN PROFIL


import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { shadows } from "../../constants/shadows";

export default function ProfileInfoCard({
  name = "Robby Dwi",
  email = "robby@email.com",
  photo = "",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={70} color={colors.primary} />
          )}
        </View>
      </View>

      <CustomText variant="h2" style={styles.name}>
        {name}
      </CustomText>

      <CustomText variant="body" color={colors.textSecondary}>
        {email}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  avatarWrapper: {
    marginBottom: spacing.md,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

    ...shadows.card,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },

  name: {
    fontWeight: "700",
    marginBottom: 4,
  },
});
