// HALAMAN KELOLA LANGGANAN

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import SubscriptionApi from "../../api/SubscriptionApi";

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

  // Ambil data berdasarkan ID
  useEffect(() => {
    const loadData = async () => {

      try {

        if (!subscriptionId) {
          Alert.alert("Error", "Data tidak ditemukan");
          navigation.goBack();
          return;
        }

        const subscription =
          await SubscriptionApi.getById(subscriptionId);

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
      Alert.alert(
        "Peringatan",
        "Harap isi semua field."
      );
      return;
    }

    try {

      const subscription =
        await SubscriptionApi.getById(subscriptionId);

      subscription.name = formData.name;
      subscription.price = Number(formData.price);
      subscription.category = formData.category;
      subscription.next_payment_date = formData.dueDate;

      await SubscriptionApi.update(subscription);

      Alert.alert(
        "Berhasil",
        "Data berhasil diperbarui.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Gagal memperbarui data."
      );

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

              Alert.alert(
                "Berhasil",
                "Langganan berhasil dihapus.",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                  },
                ]
              );

            } catch (error) {

              console.log(error);

              Alert.alert(
                "Error",
                "Gagal menghapus data."
              );

            }

          },

        },
      ]
    );

  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Memuat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Kelola Langganan</Text>
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
            placeholder="Kategori"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  primaryButton: {
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    height: 50,
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});