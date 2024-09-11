export type ServicePrice = {
  id: number;
  serviceId: number;
  ammout: number;
  date: Date;
  service: Service;
};

export type Service = {
  id: number;
  serviceName: string;
};
