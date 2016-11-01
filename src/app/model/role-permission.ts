import { User, Role, Permission, AbstractModel } from "./";

export class RolePermission {
  id: number;
  user: User;
  role: Role;
  permission: Permission;
}
