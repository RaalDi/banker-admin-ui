import { Address, User, Shop } from "./";

export class Company {
  id: number;
  name: String;
  address: Address;
  users: User[] = [];
  shops: Shop[] = [];
}
