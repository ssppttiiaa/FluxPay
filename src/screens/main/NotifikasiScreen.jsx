// HALAMAN NOTIFIKASI

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
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';

import ReminderAPI from "../../api/ReminderApi";

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';

export default function NotifikasiScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mendapatkan ikon berdasarkan kategori notifikasi
  const getNotificationIcon = (category) => {
    switch (category) {
      case 'LANGGANAN':
        return '📋';
      case 'PENGINGAT':
        return '⏰';
      case 'SEHASIL':
        return '💰';
      case 'INFO':
        return 'ℹ️';
      default:
        return '📌';
    }
  };

  // Fungsi untuk mendapatkan warna latar belakang ikon
  const getIconBackgroundColor = (category) => {
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

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const reminders = await ReminderAPI.getReminders();
      const expired = await ReminderAPI.getExpired();

      const notif = [];

      reminders.forEach(item => {
        notif.push({
          id: item.id,
          category: "LANGGANAN",
          time: `${item.days} hari lagi`,
          title: item.message,
        });
      });

      expired.forEach(item => {
        notif.push({
          id: `expired-${item.id}`,
          category: "PENGINGAT",
          time: "Jatuh Tempo",
          title: `${item.name} telah jatuh tempo.`,
        });
      });

      setNotifications(notif);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [])
  );

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
                {/* Lingkaran ikon */}
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: getIconBackgroundColor(item.category) + '20' }, // transparan
                  ]}
                >
                  <Text style={styles.iconText}>
                    {getNotificationIcon(item.category)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#F0F0F0',
  },
  iconText: {
    fontSize: 22,
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