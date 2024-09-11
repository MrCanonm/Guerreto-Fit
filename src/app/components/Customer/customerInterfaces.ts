export enum CustomerType {
  MEMBRESIA = "MEMBRESIA",
  PASE_DIARIO = "PASE_DIARIO",
}

export enum MembershipStatus {
  ACTIVO = "ACTIVO",
  CANCELADO = "CANCELADO",
  VENCIDA = "VENCIDA",
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
  dni: string;
  email?: string;
  phone?: string;
  startDate: Date;
  endDate: Date;
  monthsToPay?: number;
  totalAmout: number;
  status: MembershipStatus;
  servicePriceId: number;
  servicePrice: ServicePrice;
};

export type DailyPass = {
  id: number;
  customerId: number;
  accessDate: Date;
  servicePriceId: number;
  servicePrice: ServicePrice;
};

export type ServicePrice = {
  id: number;
  serviceId: number;
  ammout: number;
  date: Date;
  services: Service;
};

export type Service = {
  id: number;
  serviceName: string;
};
