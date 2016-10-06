import { User, Role, Permission } from "./";

export class RolePermission {
  id: number;
  user: User;
  role: Role;
  permission: Permission;
}
