// HALAMAN TAMBAH LANGGANAN

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { colors } from "../../constants/colors";

import SubscriptionApi from "../../api/SubscriptionApi";
import SubscriptionModel from "../../models/SubscriptionModel";
import LocalNotificationService from "../../services/LocalNotificationService";

export default function TambahLanggananScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    dueDate: "",
    category: "",
    note: "",
  });

  const categories = ["HIBURAN", "TOOLS", "KERJA", "PRODUKTIVITAS"];

  const handleSave = async () => {


    console.log("===== HANDLE SAVE DIJALANKAN =====");

    if (
      !formData.name ||
      !formData.price ||
      !formData.dueDate ||
      !formData.category
    ) {
      Alert.alert("Peringatan", "Harap isi semua field yang wajib!");
      return;
    }

    console.log("===== DATA FORM =====");
    console.log(formData);

    try {
      const today = new Date().toISOString().split("T")[0];

      const subscription = new SubscriptionModel({
        user_id: 1,

        name: formData.name,

        price: parseInt(formData.price),

        category: formData.category,

        billing_cycle: "Monthly",

        start_date: today,

        next_payment_date: formData.dueDate,

        reminder_days: 2,

        status: "active",

        created_at: new Date().toISOString(),
      });

      console.log("Sebelum create");
      const insertedId =
        await SubscriptionApi.create(subscription);

      subscription.id = insertedId;

      await LocalNotificationService.scheduleSubscriptionReminders(
        subscription
      );
      console.log("Sesudah create");

      setFormData({
        name: "",
        price: "",
        dueDate: "",
        category: "",
        note: "",
      });

      Alert.alert("Berhasil", "Langganan berhasil ditambahkan!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log("========== ERROR TAMBAH LANGGANAN ==========");
      console.log(error);
      console.log(error.message);
      console.log(error.stack);

      Alert.alert("Error", error.message || "Gagal menyimpan data.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.title}>Tambah Langganan</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.subtitle}>
            Masukkan detail pembayaran rutin Anda
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAMA LAYANAN</Text>

              <TextInput
                style={styles.input}
                placeholder="Contoh: Netflix"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    name: text,
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>HARGA BULANAN</Text>

              <TextInput
                style={styles.input}
                placeholder="50000"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    price: text,
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TANGGAL PEMBAYARAN</Text>

              <TextInput
                style={styles.input}
                placeholder="2026-07-20"
                value={formData.dueDate}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    dueDate: text,
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>KATEGORI</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value,
                    })
                  }
                >
                  <Picker.Item label="Pilih Kategori" value="" />

                  {categories.map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATATAN</Text>

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Catatan tambahan..."
                multiline
                numberOfLines={4}
                value={formData.note}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    note: text,
                  })
                }
              />
            </View>

            <View style={styles.reminderRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>i</Text>
              </View>

              <Text style={styles.reminderText}>
                FluxPay akan mengingatkan Anda 7, 3, dan 1 hari sebelum tanggal pembayaran.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>Simpan Langganan</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  backButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  headerContent: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 30,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },

  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: "#FAFBFC",
    color: colors.textPrimary,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoIconText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  reminderText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  primaryButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: "#FAFBFC",
    overflow: "hidden",
  },
});
