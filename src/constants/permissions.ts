type PermissionValueKey = "list" | "create";

export type PermissionName = "users" | "roles";
type PermissionValue = Record<PermissionValueKey, string>;

type Permissions = Record<PermissionName, PermissionValue>;

export const permissions: Permissions = {
  users: {
    list: "users.list",
    create: "users.create",
  },
  roles: {
    list: "roles.list",
    create: "roles.create",
  },
};
