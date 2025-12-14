/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModal } from "@/hooks/use-modal";
import { Route } from "@/routes/users/$userId.posts";
import { CirclePlus } from "lucide-react";
import CreatePost from "./components/modals/create-post";
import { PostCard } from "./components/post-card";
import Loader from "@/components/loader/loader";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "@/services/posts/postService";
import { useSelectedUser } from "@/context/SelectedUserContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const UserDetail = () => {
  const { userId } = Route.useParams();
  const { selectedUser } = useSelectedUser();

  const { modals, toggle } = useModal({
    createPost: false,
  });

  const posts = useQuery({
    queryKey: ['posts', userId],
    queryFn: fetchUserPosts
  });
  const postData = posts?.data;

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-8 mt-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedUser?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <h1 className="text-2xl md:text-4xl">{selectedUser?.name}</h1>
          <div>
            <span className="text-[#62748E]">{selectedUser?.email}</span>
            <span className="">
              {" "}
              • {postData?.length} {postData?.length <= 1 ? "Post" : "Posts"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.isFetching ? (
            <Loader />
          ) : (
            <>
              <div
                className="border border-dashed cursor-pointer rounded-lg p-4 h-[293px] w-[270px] flex items-center justify-center"
                onClick={() => toggle("createPost", true)}
              >
                <div className="flex flex-col items-center justify-center">
                  <CirclePlus />
                  <p>New Post</p>
                </div>
              </div>

              {postData?.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePost
        open={modals.createPost}
        onOpenChange={(open) => toggle("createPost", open)}
      />
    </div>
  );
};

export default UserDetail;
