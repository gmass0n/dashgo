import { useQuery, UseQueryOptions } from "react-query";

import { apiClient } from "../services/api";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface GetUsersResponse {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await apiClient.get("/users", { params: { page } });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
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

export async function getUserById(id: string): Promise<User> {
  const response = await apiClient.get(`/users/${id}`);

  return response.data;
}

export async function createUser(
  data: Omit<User, "id" | "createdAt">
): Promise<User> {
  const response = await apiClient.post("/users", {
    user: {
      ...data,
      createdAt: new Date(),
    },
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
