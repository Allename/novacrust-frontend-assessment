import service from "../service";
import type { CreatePostModel } from "./post.model";

export const fetchUserPosts = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, id] = queryKey;

  const response = await service.get(`/posts?userId=${id}`);
  return response.data;
}

export const createUserPost = async (data: CreatePostModel) => {
  const response = await service.post(`/posts`, data);
  return response.data;
}

export const deleteUserPost = async (id: string) => {
  const response = await service.delete(`/posts/${id}`);
  return response.data;
}