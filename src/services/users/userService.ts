import service from "../service";
import type { FetchUsersParams } from "./user.model";

export const fetchUsers = async ({ queryKey }: { queryKey: [string, FetchUsersParams] }) => {
  const [, params] = queryKey;
  const { pageNumber, pageSize } = params;

  const response = await service.get(`/users?page=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
}

export const fetchUsersCount = async () => {
  const response = await service.get(`/users/count`);
  return response.data;
}