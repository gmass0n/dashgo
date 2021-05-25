const permissionsName: Record<string, string> = {
  users: "Usuários",
  "users.list": "Ver usuários",
  "users.create": "Criar usuário",
  roles: "Grupos de permissões",
  "roles.list": "Ver grupos de permissões",
  "roles.create": "Criar grupo de permissões",
};

export function formatPermissionName(permission: string): string {
  return permissionsName[permission];
}
