export interface StatisticsData {
  totalActiveMemberships: number;
  todayDailyPassCount: number;
  totalDailyPassCount: number;
  totalMembershipAmount: number;
  totalDailyPassAmountToday: number;
  totalDailyPassAmount: number;
  totalAmount: number;
}

export interface ServicePriceData {
  membershipPrice: { ammout: number };
  dailypassPrice: { ammout: number };
}
