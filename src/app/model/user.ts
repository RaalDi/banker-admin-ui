import { Company, Address, RolePermission, Shop } from "./";

export class User {
  id: number;
  firstName: String;
  lastName: String;
  phoneNumber: String;
  password: String;
  loggedInDate: String;
  active: boolean;
  company: Company;
  address: Address;
  rolePermission: RolePermission[] = [];
  shop: Shop;
}
