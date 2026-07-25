// HALAMAN EXPORT CSV

import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import ExportHeader from "../../components/organisms/ExportHeader";
import ExportInfoCard from "../../components/molecules/ExportInfoCard";
import DateRangeCard from "../../components/molecules/DateRangeCard";
import CustomButton from "../../components/atoms/CustomButton";

import ExportApi from "../../api/ExportApi";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

export default function ExportScreen({ navigation }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeDate = (event, date) => {
    setShowPicker(false);

    if (date) {
      setSelectedDate(date);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);

      await ExportApi.exportPDF();

      Alert.alert("Berhasil", "PDF berhasil dibuat.");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Gagal membuat PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ExportHeader navigation={navigation} />

        <ExportInfoCard />

        <DateRangeCard
          date={
            selectedDate
              ? selectedDate.toLocaleDateString("id-ID")
              : "Belum dipilih"
          }
          onPress={() => setShowPicker(true)}
        />


        <CustomButton
          title={loading ? "Membuat PDF..." : "Export PDF"}
          icon="download-outline"
          onPress={handleExport}
        />
      </ScrollView>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
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
});
