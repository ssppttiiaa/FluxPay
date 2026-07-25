// HALAMAN PROFIL 

import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import ProfileHeader from "../../components/organisms/ProfileHeader";
import ProfileInfoCard from "../../components/molecules/ProfileInfoCard";
import MenuCard from "../../components/molecules/MenuCard";
import LogoutCard from "../../components/molecules/LogoutCard";
import CustomText from "../../components/atoms/CustomText";

import AuthAPI from "../../api/AuthApi";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ProfilScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();

    // Refresh data setiap halaman Profil dibuka kembali
    const unsubscribe = navigation.addListener("focus", () => {
      loadProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const loadProfile = async () => {
    const currentUser = await AuthAPI.currentUser();

    if (currentUser) {
      setUser(currentUser);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar dari akun?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AuthAPI.logout();

          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <ProfileInfoCard
          name={user?.full_name || "-"}
          email={user?.email || "-"}
          photo={user?.photo || ""}
        />

        <MenuCard navigation={navigation} />

        <LogoutCard onPress={handleLogout} />

        <CustomText variant="caption" style={styles.version}>
          v1.0 (Standar)
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 100,
  },

  version: {
    textAlign: "center",
    marginTop: spacing.xl,
    color: "#9CA3AF",
  },
});
