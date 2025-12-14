/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { CreatePostModel } from "@/services/posts/post.model";
import { toast } from "sonner";
import { createUserPost } from "@/services/posts/postService";
import { Route } from "@/routes/users/$userId.posts";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Schema for validating post creation
const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(160, "Message must not be longer than 30 characters."),
}).strict();

type CreatePostForm = z.infer<typeof createPostSchema>;

const CreatePost = ({ open, onOpenChange }: ModalProps) => {
  const queryClient = useQueryClient();
  const { userId } = Route.useParams();

  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
  });

  // Mutation for poar creation
  const handleCreatePost = useMutation({
    mutationFn: (data: CreatePostModel) => createUserPost(data),
    onSuccess: () => {
      form.reset({});
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post creation success");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: CreatePostForm) => {
    const payload = {
      ...data,
      userId: userId 
    };
    console.log(payload);
    handleCreatePost.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-primary rounded-md max-w-[90vw] md:max-h-[70vh] md:max-w-[50vw] flex flex-col [&>button]:hidden">
        <DialogHeader className="sticky top-0 bg-background z-10">
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-primary text-4xl">New Post</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 overflow-y-auto flex-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel className="text-black">Post title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Give your post a title"
                      className="h-12 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel className="text-black">Post body</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      {...field}
                      placeholder="Write something mind-blowing"
                      className="h-18 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset({});
                    onOpenChange(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-[2rem] bg-[#155DFC] hover:bg-[#155DFC]"
                >
                  {handleCreatePost.isPending ? (
                    'Publishing...'
                  ) : (
                    "Publish"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
