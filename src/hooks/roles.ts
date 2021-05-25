import { useQuery, UseQueryOptions } from "react-query";

import { apiClient } from "../services/api";
import { formatDate } from "../utils/formatDate";

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  createdAt: string;
}

export interface GetRolesResponse {
  totalCount: number;
  roles: Role[];
}

export async function getUsers(page: number): Promise<GetRolesResponse> {
  const { data, headers } = await apiClient.get("/roles", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const roles = data.roles.map((role) => {
    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions,
      createdAt: formatDate(new Date(role.createdAt)),
    };
  });

  return {
    roles,
    totalCount,
  };
}

export async function getRoleByName(name: string): Promise<Role> {
  const response = await apiClient.get(`/roles/${name}`);

  return response.data;
}

export async function createRole(
  data: Omit<Role, "id" | "createdAt">
): Promise<Role> {
  const response = await apiClient.post("/roles", {
    ...data,
    createdAt: new Date(),
  });

  return response.data;
}

export const useRoles = (
  page: number,
  options?: UseQueryOptions<GetRolesResponse>
) => {
  return useQuery(["roles", page], () => getUsers(page), {
    ...options,
    staleTime: 1000 * 60 * 2,
  });
};
