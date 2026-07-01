import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDashboardSummary } from './src/services/DashboardService';
import { formatIDR } from './src/utils/currencyUtils';

export default function App() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const jalaninTes = async () => {
      const hasil = await getDashboardSummary();
      console.log("=== HASIL TES DASHBOARD ===");
      console.log(JSON.stringify(hasil, null, 2));
      
      if (hasil.status === 'success') {
        setSummary(hasil.data);
      }
    };

    jalaninTes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Tes Backend 2 - FluxPay</Text>
      
      {summary ? (
        <View style={styles.box}>
          <Text>Total Langganan Aktif: {summary.totalActiveSubs} Layanan</Text>
          <Text style={styles.total}>
            Total Pengeluaran: {formatIDR(summary.totalMonthlyExpense)}
          </Text>
          <Text style={{marginTop: 10, fontWeight: 'bold'}}>Breakdown Kategori:</Text>
          <Text>• Hiburan: {formatIDR(summary.categoryBreakdown.Hiburan || 0)}</Text>
          <Text>• Produktivitas: {formatIDR(summary.categoryBreakdown.Produktivitas || 0)}</Text>
        </View>
      ) : (
        <Text>Menghitung data...</Text>
      )}

      <Text style={styles.info}>Cek juga terminal VS Code kamu buat lihat log lengkapnya.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  judul: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  box: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10, width: '100%' },
  total: { fontSize: 16, fontWeight: 'bold', color: '#2563eb', marginTop: 5 },
  info: { marginTop: 20, fontSize: 12, color: '#666', textAlign: 'center' }
});