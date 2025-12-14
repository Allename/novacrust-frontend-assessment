/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/users/$userId.posts";
import { deleteUserPost } from "@/services/posts/postService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();
  const { userId } = Route.useParams();

  const handleDeletePost = useMutation({
    mutationFn: (id: string) => deleteUserPost(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["posts", userId] });

      const previousPosts = queryClient.getQueryData<any[]>(["posts", userId]);

      // oRemove post from UI without invalidating the query
      queryClient.setQueryData(["posts", userId], (old: any[]) => {
        if (!old) return [];
        return old.filter((p) => p.id !== id);
      });

      return { previousPosts };
    },
    onError: (_err, _id, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", userId], context.previousPosts);
      }
      toast.error("Failed to delete post");
    },
    onSuccess: () => {
      toast.success("Post deleted");
    },
  });

  const deletePost = () => {
    handleDeletePost.mutate(post?.id)
  }

  return (
    <div className="border border-[#E2E8F0] rounded-lg p-4 h-[293px] w-[270px]">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive p-0 w-6 h-6 m-[-0.5rem] cursor-pointer"
          onClick={() => deletePost()}
        >
          <Trash2 />
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[18px] font-[500] leading-7">{post?.title}</h3>
        <p className="line-clamp-6">{post?.body}</p>
      </div>
    </div>
  );
}