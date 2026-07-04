import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

const STORAGE_KEY = '@subscriptions';
const NOTIF_STORAGE_KEY = '@notifications';

export default function NotifikasiScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk menghitung selisih hari antara dueDate dan hari ini
  const getDaysUntilDue = (dueDateStr) => {
    // dueDateStr format: "mm/dd/yyyy"
    const parts = dueDateStr.split('/');
    if (parts.length !== 3) return null;
    const dueDate = new Date(parts[2], parts[0] - 1, parts[1]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Generate notifikasi dinamis dari data langganan
  const generateNotifications = (subscriptions) => {
    const notifList = [];

    subscriptions.forEach((sub) => {
      const daysUntil = getDaysUntilDue(sub.dueDate);
      if (daysUntil === null) return;

      // Notifikasi peringatan H-3 sampai H-1
      if (daysUntil <= 3 && daysUntil > 0) {
        notifList.push({
          id: `sub-${sub.id}-reminder`,
          category: 'LANGGANAN',
          time: `${daysUntil} hari lagi`,
          title: `${sub.name} akan diperpanjang dalam ${daysUntil} hari`,
          icon: '📺',
          timestamp: Date.now(),
        });
      }
      // Notifikasi jatuh tempo (H-0 atau sudah lewat)
      else if (daysUntil <= 0) {
        notifList.push({
          id: `sub-${sub.id}-overdue`,
          category: 'PENGINGAT',
          time: 'Jatuh tempo',
          title: `${sub.name} telah jatuh tempo, segera perbarui!`,
          icon: '🔔',
          timestamp: Date.now(),
        });
      }
    });

    return notifList;
  };

  // Ambil data dan generate notifikasi
  const loadNotifications = async () => {
    try {
      setLoading(true);

      // 1. Ambil data langganan
      const storedSubs = await AsyncStorage.getItem(STORAGE_KEY);
      const subscriptions = storedSubs ? JSON.parse(storedSubs) : [];

      // 2. Generate notifikasi dari langganan
      const dynamicNotifs = generateNotifications(subscriptions);

      // 3. Ambil notifikasi tersimpan (misal notifikasi sukses, statistik)
      const storedNotifs = await AsyncStorage.getItem(NOTIF_STORAGE_KEY);
      const savedNotifs = storedNotifs ? JSON.parse(storedNotifs) : [];

      // 4. Gabungkan, urutkan berdasarkan timestamp (terbaru dulu)
      const allNotifs = [...dynamicNotifs, ...savedNotifs];
      allNotifs.sort((a, b) => b.timestamp - a.timestamp);

      setNotifications(allNotifs);
    } catch (error) {
      console.error('Gagal memuat notifikasi:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [])
  );

  // Fungsi untuk mendapatkan warna kategori
  const getCategoryColor = (category) => {
    switch (category) {
      case 'LANGGANAN':
        return '#4A90E2';
      case 'PENGINGAT':
        return '#F39C12';
      case 'SEHASIL':
        return '#27AE60';
      case 'INFO':
        return '#8E44AD';
      default:
        return '#999';
    }
  };

  // Fungsi helper untuk menampilkan waktu yang lebih ramah
  const formatTime = (timeStr) => {
    // Jika timeStr adalah angka (timestamp), kita konversi
    if (!isNaN(timeStr)) {
      const date = new Date(parseInt(timeStr));
      const now = new Date();
      const diff = Math.floor((now - date) / (1000 * 60));
      if (diff < 1) return 'Baru saja';
      if (diff < 60) return `${diff} menit yang lalu`;
      if (diff < 1440) return `${Math.floor(diff / 60)} jam yang lalu`;
      return `${Math.floor(diff / 1440)} hari yang lalu`;
    }
    return timeStr;
  };

  if (loading) {
    return (
      <SafeArea style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat notifikasi...</Text>
        </View>
      </SafeArea>
    );
  }

  return (
    <SafeArea style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FluxPay</Text>
          <Text style={styles.headerSubtitle}>Notifikasi</Text>
          <Text style={styles.headerDesc}>Pantau jadwal pembaruan langganan Anda.</Text>
        </View>

        {/* Daftar Notifikasi */}
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada notifikasi</Text>
            <Text style={styles.emptySubText}>Semua langganan Anda dalam keadaan aman.</Text>
          </View>
        ) : (
          notifications.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardRow}>
                <View
                  style={[
                    styles.categoryIndicator,
                    { backgroundColor: getCategoryColor(item.category) },
                  ]}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <Text style={styles.timeText}>
                    {formatTime(item.time)}
                  </Text>
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <Text style={styles.actionIcon}>-</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#F5F7FA',
  },
  content: {
    paddingHorizontal: spacing.md || 20,
    paddingTop: spacing.md || 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary || '#4A90E2',
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  headerDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginTop: 4,
  },
  actionIcon: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 8,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubText: {
    marginTop: 8,
    color: '#999',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
});