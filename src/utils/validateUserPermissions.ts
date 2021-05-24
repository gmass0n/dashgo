interface User {
  permissions: string[];
}

interface ValidateUserPermissionsParams {
  user?: User | null;
  permissions?: string[];
}

export function validateUserPermissions({
  user = null,
  permissions,
}: ValidateUserPermissionsParams) {
  if (!user) return false;

  if (user.permissions && permissions && permissions.length > 0) {
    const hasAllPermissions = permissions.every((permission) =>
      user.permissions.includes(permission)
    );

    if (!hasAllPermissions) return false;
  }

  return true;
}
