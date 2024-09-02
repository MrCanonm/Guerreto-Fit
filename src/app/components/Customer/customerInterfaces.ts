export enum CustomerType {
  MEMBRESIA = "MEMBRESIA",
  PASE_DIARIO = "PASE_DIARIO",
}
export enum MembershipStatus {
  ACTIVO = "ACTIVO",
  CANCELADO = "CANCELADO",
  PENDIENTE = "PENDIENTE",
}

export type Customer = {
  id: number;
  name: string;
  sureName: string;
  customerType: CustomerType;
  membership?: Membership;
  dailyPass?: DailyPass;
};

export type Membership = {
  id: number;
  customerId: number;
  email?: string;
  phone?: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: MembershipStatus;
};

export type DailyPass = {
  id: number;
  customerId: number;
  accessDate: Date;
  price: number;
};
