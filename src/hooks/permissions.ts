import { useQuery, UseQueryOptions } from "react-query";

import { apiClient } from "../services/api";

export interface Permission {
  name: string;
  values: string[];
}

export async function getPermissions(): Promise<Permission[]> {
  const { data } = await apiClient.get<string[]>("/permissions");

  const formattedPermissions = data.reduce((acc, permission) => {
    const [name, value] = permission.split(".");

    const findPermissionIndex = acc.findIndex((p) => p.name === name);

    if (findPermissionIndex >= 0) {
      acc[findPermissionIndex] = {
        ...acc[findPermissionIndex],
        values: [...acc[findPermissionIndex].values, value],
      };
    } else {
      acc.push({ name: name, values: [value] });
    }

    return acc;
  }, []);

  return formattedPermissions;
}

export const usePermissions = (options?: UseQueryOptions<Permission[]>) => {
  return useQuery(["roles"], () => getPermissions(), {
    ...options,
    staleTime: 1000 * 60 * 2,
  });
};
