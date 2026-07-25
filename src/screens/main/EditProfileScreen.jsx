// HALAMAN EDIT PROFIL

import * as ImagePicker from "expo-image-picker";

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ExportHeader from "../../components/organisms/ExportHeader";
import CustomInput from "../../components/atoms/CustomInput";
import CustomButton from "../../components/atoms/CustomButton";

import AuthAPI from "../../api/AuthApi";
import UserAPI from "../../api/UserApi";
import UserModel from "../../models/UserModel";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  // ==========================
  // LOAD USER
  // ==========================
  const loadUser = async () => {
    try {
      const user = await AuthAPI.currentUser();

      if (user) {
        setName(user.full_name);
        setEmail(user.email);
        setPhone(user.phone || "");
        setPassword(user.password || "");
        setPhoto(user.photo || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // PILIH FOTO DARI GALERI
  // ==========================
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Izin Ditolak", "Silakan izinkan akses galeri.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  // ==========================
  // SIMPAN PROFIL
  // ==========================
  const saveProfile = async () => {
    try {
      const currentUser = await AuthAPI.currentUser();

      const user = new UserModel({
        id: currentUser.id,
        full_name: name,
        email: currentUser.email,
        password: currentUser.password,
        phone: phone,
        photo: photo,
        created_at: currentUser.created_at,
      });

      await UserAPI.update(user);

      Alert.alert("Berhasil", "Profil berhasil diperbarui.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ExportHeader navigation={navigation} title="Edit Profil" />

        <View style={styles.photoContainer}>
          <Image
            source={
              photo
                ? { uri: photo }
                : {
                  uri:
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(name) +
                    "&background=7B61FF&color=fff",
                }
            }
            style={styles.avatar}
          />

          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <CustomInput label="Nama" value={name} onChangeText={setName} />

        <View style={{ height: spacing.md }} />

        <CustomInput label="Email" value={email} editable={false} />

        <View style={{ height: spacing.md }} />

        <CustomInput
          label="Nomor HP"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />

        <View style={{ height: spacing.md }} />

        <CustomInput
          label="Password"
          value={password}
          secureTextEntry
          editable={false}
        />

        <View style={{ height: spacing.xl }} />

        <CustomButton title="Simpan Perubahan" onPress={saveProfile} />
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
    paddingBottom: 60,
  },

  photoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  cameraButton: {
    position: "absolute",
    bottom: 45,
    right: 115,

    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  changePhotoButton: {
    width: 170,
    marginTop: spacing.md,
  },
});
