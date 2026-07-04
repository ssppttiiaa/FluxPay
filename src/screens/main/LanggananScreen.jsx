import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';

import SubscriptionHeader from '../../components/organisms/SubscriptionHeader';
import SearchBar from '../../components/molecules/SearchBar';
import CategoryChip from '../../components/atoms/CategoryChip';
import SubscriptionListCard from '../../components/molecules/SubscriptionListCard';
import FloatingActionButton from '../../components/organisms/FloatingActionButton';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

const STORAGE_KEY = '@subscriptions';

export default function LanggananScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const data = stored ? JSON.parse(stored) : [];
      setSubscriptions(data);
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
    }, [])
  );

  const filteredData = subscriptions.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = [
    'Semua',
    'HIBURAN',
    'TOOLS',
    'KERJA',
    'PRODUKTIVITAS',
  ];

  return (
    <SafeArea style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SubscriptionHeader />

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item) => (
            <View key={item} style={styles.chip}>
              <CategoryChip
                label={item}
                isActive={selectedCategory === item}
                onPress={() => setSelectedCategory(item)}
              />
            </View>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada langganan.</Text>
            <Text style={styles.emptySubText}>Tambahkan dengan tombol + di bawah.</Text>
          </View>
        ) : (
          filteredData.map((item) => (
            <SubscriptionListCard
              key={item.id}
              logo="📦"
              name={item.name}
              category={item.category}
              dueDate={item.dueDate}
              price={item.price}
              onPress={() => navigation.navigate('KelolaLangganan', { subscriptionId: item.id })}
            />
          ))
        )}
      </ScrollView>

      <FloatingActionButton
        onPress={() => navigation.navigate('TambahLangganan')}
      />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },
  categoryContainer: {
    paddingBottom: spacing.md,
  },
  chip: {
    marginRight: spacing.sm,
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
});