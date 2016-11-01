import { AbstractModel } from "./";

export class User extends AbstractModel {
  id: number;
  firstName: String;
  lastName: String;
  username: String;
  phoneNumber: String;
  password: String;
  signedInDate: String;
  active: boolean;
  signedIn: boolean;
  companyId: number;
  addressId: number;
  role: String;
  shopId: number;
}
