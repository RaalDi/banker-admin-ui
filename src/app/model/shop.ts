import { Address, Company, User } from "./";

export class Shop {
  id: number;
  name: String;
  active: boolean;
  address: Address;
  company: Company;
  users: User[] = [];
}
