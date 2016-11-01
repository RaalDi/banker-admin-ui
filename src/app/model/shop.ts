import { Address, Company, User, AbstractModel } from "./";

export class Shop {
  id: number;
  name: String;
  active: boolean;
  address: Address;
  company: Company;
  users: User[] = [];
}
