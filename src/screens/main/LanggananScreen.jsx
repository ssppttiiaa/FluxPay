import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';

import SubscriptionHeader from '../../components/organisms/SubscriptionHeader';
import SearchBar from '../../components/molecules/SearchBar';
import CategoryChip from '../../components/atoms/CategoryChip';
import SubscriptionListCard from '../../components/molecules/SubscriptionListCard';
import FloatingActionButton from '../../components/organisms/FloatingActionButton';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function LanggananScreen({ navigation }) {

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

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

        <SubscriptionListCard
          logo="🎬"
          name="Netflix Premium"
          category="HIBURAN"
          dueDate="28 Oktober 2026"
          price="Rp186.000"
        />

        <SubscriptionListCard
          logo="🎵"
          name="Spotify Premium"
          category="HIBURAN"
          dueDate="02 November 2026"
          price="Rp54.990"
        />

        <SubscriptionListCard
          logo="☁️"
          name="Google One"
          category="TOOLS"
          dueDate="10 November 2026"
          price="Rp26.900"
        />

        <SubscriptionListCard
          logo="🎨"
          name="Canva Pro"
          category="PRODUKTIVITAS"
          dueDate="15 November 2026"
          price="Rp95.000"
        />

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

});