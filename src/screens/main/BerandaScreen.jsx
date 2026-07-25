// HALAMAN DASBOARD

import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import CustomText from "../../components/atoms/CustomText";
import SummaryCard from "../../components/molecules/SummaryCard";
import SubscriptionCard from "../../components/molecules/SubscriptionCard";
import FloatingActionButton from "../../components/organisms/FloatingActionButton";
import HomeHeader from "../../components/organisms/HomeHeader";
import CategoryAnalysisCard from "../../components/molecules/CategoryAnalysisCard";
import UpcomingPaymentCard from "../../components/molecules/UpcomingPaymentCard";

import SubscriptionApi from "../../api/SubscriptionApi";
import DashboardApi from "../../api/DashboardApi";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function BerandaScreen({ navigation }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalSubscription, setTotalSubscription] = useState(0);

  const loadData = async () => {
    try {
      console.log("LOAD 1");

      const subscriptionsData = await SubscriptionApi.getActive();

      console.log("LOAD 2");

      const upcomingData = await DashboardApi.getUpcomingPayments();

      console.log("LOAD 3");

      const monthlyExpense = await DashboardApi.getMonthlyExpense();

      console.log("LOAD 4");

      const activeSubscription =
        await DashboardApi.getTotalActiveSubscription();

      console.log("LOAD 5");

      setSubscriptions(subscriptionsData);
      setUpcoming(upcomingData);
      setTotalMonthly(monthlyExpense);
      setTotalSubscription(activeSubscription);

      console.log("LOAD 6");
    } catch (error) {
      console.log("LOAD DATA ERROR");
      console.log(error);
    }
  };

  // const loadData = async () => {
  //   console.log("===== LOAD DATA BERANDA =====");
  // };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader navigation={navigation} />

        <SummaryCard
          total={`Rp${Number(totalMonthly).toLocaleString("id-ID")}`}
          totalSubscription={`${totalSubscription} Layanan`}
        />

        {/* <CategoryAnalysisCard /> */}

        <CustomText variant="h3" style={styles.section}>
          Tagihan Mendatang
        </CustomText>

        {upcoming.length > 0 && (
          <UpcomingPaymentCard
            service={upcoming[0].name}
            dueDate={upcoming[0].next_payment_date}
            amount={`Rp${Number(upcoming[0].price).toLocaleString("id-ID")}`}
          />
        )}

        <CustomText variant="h3" style={styles.section}>
          Langganan Terbaru
        </CustomText>

        {subscriptions.slice(0, 3).map((item) => (
          <SubscriptionCard
            key={item.id}
            logo="📦"
            name={item.name}
            category={item.category}
            dueDate={item.next_payment_date}
            price={`Rp${Number(item.price).toLocaleString("id-ID")}`}
          />
        ))}
      </ScrollView>

      <FloatingActionButton
        onPress={() => navigation.navigate("TambahLangganan")}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomText>TES BERHASIL</CustomText>
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

  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});
