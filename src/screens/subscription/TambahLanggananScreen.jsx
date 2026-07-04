import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch, // Switch tetap diimport, tapi tidak digunakan lagi
  Alert,
  StyleSheet,
  KeyboardAvoidingView, // tambahkan
  Platform,             // tambahkan
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';

const STORAGE_KEY = '@subscriptions';

export default function TambahLanggananScreen({ navigation }) {
  // State reminder tidak dipakai lagi, tapi bisa dihapus atau dibiarkan
  const [reminder, setReminder] = useState(true); // tidak digunakan
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    dueDate: '',
    category: '',
    note: '',
  });

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.dueDate || !formData.category) {
      Alert.alert('Peringatan', 'Harap isi semua field yang wajib!');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const existingData = storedData ? JSON.parse(storedData) : [];

      const newSubscription = {
        id: Date.now().toString(),
        name: formData.name,
        price: `Rp ${formData.price}`,
        dueDate: formData.dueDate,
        category: formData.category,
        note: formData.note,
        createdAt: new Date().toISOString(),
      };

      const updatedData = [...existingData, newSubscription];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      Alert.alert(
        'Berhasil',
        'Langganan berhasil ditambahkan!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Gagal menyimpan:', error);
      Alert.alert('Error', 'Gagal menyimpan data. Silakan coba lagi.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      {/* Bungkus dengan KeyboardAvoidingView agar keyboard tidak menutupi input */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.subtitle}>Masukkan detail pembayaran rutin Anda</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NAMA LAYANAN</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Netflix, Spotify..."
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>HARGA BULANAN</Text>
              <TextInput
                style={styles.input}
                placeholder="Rp 0"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TANGGAL TAGIHAN</Text>
              <TextInput
                style={styles.input}
                placeholder="mm/dd/yyyy"
                value={formData.dueDate}
                onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>KATEGORI</Text>
              <TextInput
                style={styles.input}
                placeholder="Hiburan"
                value={formData.category}
                onChangeText={(text) => setFormData({ ...formData, category: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATATAN</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tulis catatan tambahan di sini..."
                multiline
                numberOfLines={3}
                value={formData.note}
                onChangeText={(text) => setFormData({ ...formData, note: text })}
              />
            </View>

            <View style={styles.reminderRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>i</Text>
              </View>
              <Text style={styles.reminderText}>
                FluxPay akan mengingatkan Anda 2 hari setelah tanggal tagihan agar saldo Anda mencukupi.
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    fontWeight: '600',
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
    backgroundColor: '#fafbfc',
    color: colors.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  infoIconText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  reminderText: {
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: 20,
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
});