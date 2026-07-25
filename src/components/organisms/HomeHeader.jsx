// Header halaman Dashboard
import { Image } from "react-native";
import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import ReminderAPI from "../../api/ReminderApi";
import AuthAPI from "../../api/AuthApi";

import { Ionicons } from "@expo/vector-icons";

import CustomText from "../atoms/CustomText";

import { colors } from "../../constants/colors";

export default function HomeHeader({ navigation }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const currentUser = await AuthAPI.currentUser();

          setUser(currentUser);

          const count = await ReminderAPI.getTodayCount();

          setNotificationCount(count);
        } catch (error) {
          console.log(error);
        }
      };

      loadData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatarImage} />
          ) : (
            <CustomText variant="body" color="#FFFFFF">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
            </CustomText>
          )}
        </View>

        <View style={styles.info}>
          <CustomText variant="caption" color={colors.textSecondary}>
            Halo,
          </CustomText>

          <CustomText variant="body" style={styles.name}>
            {user?.full_name || "Pengguna"}
          </CustomText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.notification}
        onPress={() => navigation.navigate("Notifikasi")}
      >
        <Ionicons
          name="notifications-outline"
          size={28}
          color={colors.primary}
        />

        {notificationCount > 0 && (
          <View style={styles.badge}>
            <CustomText variant="caption" color="#FFFFFF">
              {notificationCount}
            </CustomText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D9CCFF",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    marginLeft: 12,
  },

  name: {
    fontWeight: "700",
  },

  notification: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
});
