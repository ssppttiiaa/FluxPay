import MockRepo from '../repositories/MockSubscriptionRepository';

export const getDashboardSummary = async () => {
  try {
    const activeSubs = await MockRepo.getAllActive();

    // 1. Hitung total pengeluaran bulanan
    const totalExpense = activeSubs.reduce((sum, item) => sum + item.price, 0);

    // 2. Hitung pengeluaran per kategori (untuk grafik Pie Chart)
    const categoryStats = activeSubs.reduce((acc, item) => {
      const cat = item.category || 'Lainnya';
      acc[cat] = (acc[cat] || 0) + item.price;
      return acc;
    }, {});

    return {
      status: 'success',
      data: {
        totalActiveSubs: activeSubs.length,
        totalMonthlyExpense: totalExpense,
        categoryBreakdown: categoryStats,
        rawActiveList: activeSubs
      }
    };
  } catch (error) {
    console.error("Gagal menarik summary dasbor:", error);
    return { status: 'error', message: error.message };
  }
};