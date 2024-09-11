export enum AppUserStatus {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

export type AppUser = {
  id: string;
  accessName: string;
  accessHash: string;
  personId: number;
  roleId: number;
  person: Person;
  role: Role;
  status: AppUserStatus;
};

export type Person = {
  id: number;
  name: string;
  sureName: string;
  age: number;
  email: string;
  phone: string;
  AppUser: AppUser[];
};

export type Role = {
  id: number;
  name: string;
  AppUser: AppUser[];
};
