// HALAMAN KELOLA LANGGANAN

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import SubscriptionApi from "../../api/SubscriptionApi";
import ExportHeader from "../../components/organisms/ExportHeader";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function KelolaLanggananScreen({ navigation, route }) {
  const { subscriptionId } = route.params || {};
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    dueDate: '',
    category: '',
    note: '',
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const categories = ["HIBURAN", "TOOLS", "KERJA", "PRODUKTIVITAS"];

  // Handle perubahan tanggal dari picker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setShowDatePicker(Platform.OS === 'ios');
    setTempDate(currentDate);
    if (event.type === 'set') {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setFormData({ ...formData, dueDate: formattedDate });
    }
  };

  // Handle perubahan harga, hanya angka
  const handlePriceChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setFormData({ ...formData, price: numericText });
  };

  // Ambil data berdasarkan ID
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!subscriptionId) {
          Alert.alert("Error", "Data tidak ditemukan");
          navigation.goBack();
          return;
        }

        const subscription = await SubscriptionApi.getById(subscriptionId);

        if (!subscription) {
          Alert.alert("Error", "Data tidak ditemukan");
          navigation.goBack();
          return;
        }

        setFormData({
          name: subscription.name,
          price: subscription.price.toString(),
          dueDate: subscription.next_payment_date,
          category: subscription.category,
          note: "",
        });
        // Set tempDate berdasarkan dueDate jika ada
        if (subscription.next_payment_date) {
          const parts = subscription.next_payment_date.split('-');
          if (parts.length === 3) {
            const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
            if (!isNaN(dateObj.getTime())) {
              setTempDate(dateObj);
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subscriptionId, navigation]);

  // Update data
  const handleUpdate = async () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.dueDate ||
      !formData.category
    ) {
      Alert.alert("Peringatan", "Harap isi semua field.");
      return;
    }

    try {
      const subscription = await SubscriptionApi.getById(subscriptionId);

      subscription.name = formData.name;
      subscription.price = Number(formData.price);
      subscription.category = formData.category;
      subscription.next_payment_date = formData.dueDate;

      await SubscriptionApi.update(subscription);

      Alert.alert("Berhasil", "Data berhasil diperbarui.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal memperbarui data.");
    }
  };

  // Hapus data
  const handleDelete = () => {
    Alert.alert(
      "Hapus Langganan",
      "Yakin ingin menghapus?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await SubscriptionApi.delete(subscriptionId);
              Alert.alert("Berhasil", "Langganan berhasil dihapus.", [
                {
                  text: "OK",
                  onPress: () => navigation.goBack(),
                },
              ]);
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Gagal menghapus data.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.center}>
          <Text>Memuat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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
          <ExportHeader navigation={navigation} title="Kelola Langganan" />

          <Text style={styles.subtitle}>Edit detail langganan Anda</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>NAMA LAYANAN</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama layanan"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>HARGA BULANAN</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={handlePriceChange}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>TANGGAL TAGIHAN</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, !formData.dueDate && styles.placeholderText]}>
                {formData.dueDate || "Pilih Tanggal"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>KATEGORI</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
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
              placeholder="Catatan tambahan"
              multiline
              numberOfLines={3}
              value={formData.note}
              onChangeText={(text) => setFormData({ ...formData, note: text })}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
            <Text style={styles.primaryButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Hapus Langganan</Text>
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
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: '#FAFBFC',
    color: colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dateInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FAFBFC',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: '#FAFBFC',
    overflow: 'hidden',
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  deleteButton: {
    height: 50,
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});