// HALAMAN LANGGANAN

import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SubscriptionHeader from "../../components/organisms/SubscriptionHeader";
import SearchBar from "../../components/molecules/SearchBar";
import CategoryChip from "../../components/atoms/CategoryChip";
import SubscriptionListCard from "../../components/molecules/SubscriptionListCard";
import FloatingActionButton from "../../components/organisms/FloatingActionButton";

import SubscriptionApi from "../../api/SubscriptionApi";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function LanggananScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi pemetaan kategori ke ikon (emoji)
  const getLogoByCategory = (category) => {
    const iconMap = {
      'HIBURAN': '🎬',
      'TOOLS': '🔧',
      'KERJA': '💼',
      'PRODUKTIVITAS': '📈',
    };
    return iconMap[category] || '📦'; // default jika tidak dikenali
  };

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await SubscriptionApi.getAll();
      console.log("===== GET ALL =====");
      console.log(JSON.stringify(data, null, 2));
      setSubscriptions(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
    }, []),
  );

  const filteredData = subscriptions.filter((item) => {
    const matchSearch = item.name
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchCategory =
      selectedCategory === "Semua" ||
      item.category.trim().toUpperCase() ===
      selectedCategory.trim().toUpperCase();

    return matchSearch && matchCategory;
  });

  const categories = ["Semua", "HIBURAN", "TOOLS", "KERJA", "PRODUKTIVITAS"];

  console.log("Subscriptions :", subscriptions);
  console.log("Selected Category :", selectedCategory);
  console.log("Filtered :", filteredData);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SubscriptionHeader />

        <SearchBar value={search} onChangeText={setSearch} />

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
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada langganan</Text>
            <Text style={styles.emptySubText}>
              Tambahkan langganan dengan tombol +
            </Text>
          </View>
        ) : (
          filteredData.map((item) => (
            <SubscriptionListCard
              key={item.id}
              logo={getLogoByCategory(item.category)} // <-- ikon sesuai kategori
              name={item.name}
              category={item.category}
              dueDate={item.next_payment_date}
              price={`Rp ${item.price}`}
              onPress={() =>
                navigation.navigate("KelolaLangganan", {
                  subscriptionId: item.id,
                })
              }
            />
          ))
        )}
      </ScrollView>

      <FloatingActionButton
        onPress={() => navigation.navigate("TambahLangganan")}
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

  categoryContainer: {
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },

  chip: {
    marginRight: spacing.sm,
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  emptySubText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});