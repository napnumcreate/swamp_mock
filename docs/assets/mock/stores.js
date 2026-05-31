var MOCK_STORES = [
  {
    id: 'genesis',
    name: 'SWAMP',
    status: '営業中',
    todaySales: 1380000,
    monthlySales: 26800000,
    achievementRate: 85,
    hostCount: 12,
    monthlyVisits: 186,
    avgSpend: 98000,
    vipCount: 24,
    prevMonthChange: 8.2,
    progress: {
      daily: { actual: 1380000, progressPct: 85, timeAchievementPct: 98 },
      weekly: { actual: 4200000, progressPct: 72, timeAchievementPct: 95 },
      monthly: { actual: 26800000, progressPct: 85, timeAchievementPct: 97 }
    }
  },
  {
    id: 'monstar',
    name: '店舗A',
    status: '営業中',
    todaySales: 1200000,
    monthlySales: 24500000,
    achievementRate: 78,
    hostCount: 18,
    monthlyVisits: 248,
    avgSpend: 98800,
    vipCount: 31,
    prevMonthChange: 7.8,
    progress: {
      daily: { actual: 1200000, progressPct: 78, timeAchievementPct: 96 },
      weekly: { actual: 3800000, progressPct: 68, timeAchievementPct: 94 },
      monthly: { actual: 24500000, progressPct: 78, timeAchievementPct: 95 }
    }
  },
  {
    id: 'atop',
    name: '店舗B',
    status: '準備中',
    todaySales: 680000,
    monthlySales: 15100000,
    achievementRate: 52,
    hostCount: 10,
    monthlyVisits: 154,
    avgSpend: 98000,
    vipCount: 18,
    prevMonthChange: -1.6,
    progress: {
      daily: { actual: 680000, progressPct: 52, timeAchievementPct: 88 },
      weekly: { actual: 2100000, progressPct: 48, timeAchievementPct: 85 },
      monthly: { actual: 15100000, progressPct: 52, timeAchievementPct: 87 }
    }
  },
  {
    id: 'crossguild',
    name: '店舗C',
    status: '営業中',
    todaySales: 920000,
    monthlySales: 20300000,
    achievementRate: 68,
    hostCount: 15,
    monthlyVisits: 206,
    avgSpend: 98500,
    vipCount: 27,
    prevMonthChange: 5.2,
    progress: {
      daily: { actual: 920000, progressPct: 68, timeAchievementPct: 92 },
      weekly: { actual: 2900000, progressPct: 62, timeAchievementPct: 90 },
      monthly: { actual: 20300000, progressPct: 68, timeAchievementPct: 91 }
    }
  }
];
