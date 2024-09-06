export interface StatisticsData {
  totalActiveMemberships: number;
  todayDailyPassCount: number;
  totalDailyPassCount: number;
  totalMembershipAmount: number;
  totalDailyPassAmountToday: number;
  totalDailyPassAmount: number;
  totalAmmout: number;
}

export interface ServicePriceData {
  membershipPrice: { monto: number };
  dailypassPrice: { monto: number };
}
