import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../../components/atoms/CustomText';
import SummaryCard from '../../components/molecules/SummaryCard';
import SubscriptionCard from '../../components/molecules/SubscriptionCard';
import FloatingActionButton from '../../components/organisms/FloatingActionButton';
import HomeHeader from '../../components/organisms/HomeHeader';
import CategoryAnalysisCard from '../../components/molecules/CategoryAnalysisCard';
import UpcomingPaymentCard from '../../components/molecules/UpcomingPaymentCard';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function BerandaScreen({ navigation }) {
  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <HomeHeader />

        <SummaryCard
          total="Rp329.000"
          totalSubscription="12 Layanan"
        />

        <CategoryAnalysisCard />

        <CustomText
          variant="h3"
          style={styles.section}
        >
          Tagihan Mendatang
        </CustomText>

        <UpcomingPaymentCard
          service="Netflix Premium"
          dueDate="28 Oktober 2026"
          amount="Rp186.000"
        />

        <CustomText
          variant="h3"
          style={styles.section}
        >
          Langganan Terbaru
        </CustomText>

        <SubscriptionCard
          logo="☁️"
          name="Google One"
          category="TOOLS"
          dueDate="05 Nov"
          price="Rp26.900"
        />

        <SubscriptionCard
          logo="🎵"
          name="Spotify"
          category="HIBURAN"
          dueDate="12 Nov"
          price="Rp54.990"
        />

        <SubscriptionCard
          logo="🎨"
          name="Canva Pro"
          category="KERJA"
          dueDate="20 Nov"
          price="Rp95.000"
        />

      </ScrollView>

      <FloatingActionButton
        onPress={() =>
          navigation.navigate('TambahLangganan')
        }
      />

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
    paddingBottom: 100,
  },

  subtitle: {
    marginBottom: spacing.lg,
  },

  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});