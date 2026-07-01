export const DUMMY_SUBSCRIPTIONS = [
  { 
    id: 1, 
    name: 'Netflix Premium', 
    price: 186000, 
    category: 'Streaming', // Kategori baru hasil kesepakatan
    billing_cycle: 'Bulanan',
    start_date: '2026-06-01',
    next_payment_date: '2026-07-01', 
    reminder_days: 3,
    status: 'active',
    created_at: '2026-06-01'
  },
  { 
    id: 2, 
    name: 'Spotify Individual', 
    price: 54990, 
    category: 'Hiburan', 
    billing_cycle: 'Bulanan',
    start_date: '2026-06-05',
    next_payment_date: '2026-07-05', 
    reminder_days: 7,
    status: 'active',
    created_at: '2026-06-05'
  },
  { 
    id: 3, 
    name: 'Langganan Udemy/Coursera', 
    price: 150000, 
    category: 'Pendidikan', // Kategori baru hasil kesepakatan
    billing_cycle: 'Bulanan',
    start_date: '2026-06-20',
    next_payment_date: '2026-07-20', 
    reminder_days: 1,
    status: 'active',
    created_at: '2026-06-20'
  },
  { 
    id: 4, 
    name: 'Gym Membership', 
    price: 250000, 
    category: 'Kesehatan', 
    billing_cycle: 'Bulanan',
    start_date: '2026-04-10',
    next_payment_date: '2026-05-10', 
    reminder_days: 3,
    status: 'inactive',
    created_at: '2026-04-10'
  }
];