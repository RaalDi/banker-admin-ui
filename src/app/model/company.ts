import { Address, User, Shop, AbstractModel } from "./";

export class Company {
  id: number;
  name: String;
  address: Address;
  users: User[] = [];
  shops: Shop[] = [];
}
