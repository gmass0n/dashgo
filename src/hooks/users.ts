import { useQuery, UseQueryOptions } from "react-query";

import { apiClient } from "../services/api";

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  permissions: string[];
  createdAt: string;
}

export interface GetUsersResponse {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers, ...props } = await apiClient.get("/users", {
    params: { page },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export async function getUserByEmail(email: string): Promise<User> {
  const response = await apiClient.get(`/users/${email}`);

  return response.data;
}

export async function createUser(
  data: Omit<User, "id" | "createdAt" | "permissions">
): Promise<User> {
  const response = await apiClient.post("/users", {
    ...data,
    createdAt: new Date(),
  });

  return response.data;
}

export const useUsers = (
  page: number,
  options?: UseQueryOptions<GetUsersResponse>
) => {
  return useQuery(["users", page], () => getUsers(page), {
    ...options,
    staleTime: 1000 * 60 * 2,
  });
};
