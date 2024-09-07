export type ServicePrice = {
  id: number;
  serviceId: number;
  monto: number;
  fecha: Date;
  service: Service;
};

export type Service = {
  id: number;
  serviceName: string;
};
