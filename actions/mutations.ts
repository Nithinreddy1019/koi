import { useToast } from "@/components/ui/use-toast"
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostAction, SubmitPostAction } from "./post-actions";
import { PostDataType, PostsPage } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";


export const useSubmitPostMutation = () => {
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: SubmitPostAction,
        onSuccess: async (newPost) => {
            const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    const firstPage = oldData?.pages[0];

                    if(firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [
                                {
                                    posts: [newPost, ...firstPage.posts],
                                    nextCursor: firstPage.nextCursor
                                },
                                ...oldData.pages.slice(1)
                            ]
                        }
                    };

                }
            )

            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return !query.state.data;
                },
            })

            toast({
                description: "Post created"
            })
        },
        onError(error) {
            console.log(error);

            toast({
                variant: "destructive",
                description: "Failed to post, Please ty again"
            });
        },
    });

    return mutation;
};


export const useDeletePostMutation = () => {
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: deletePostAction,
        onSuccess: async (deletedPost) => {
            const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

            await queryClient.cancelQueries();

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if(!oldData) return;

                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter(p => p.id !== deletedPost.id)
                        }))
                    };

                }
            )

            toast({
                description: "Post deleted"
            });

            if(pathname === `/posts/${deletedPost.id}`) {
                router.push(`/users/${deletedPost.user.name}`);
            }

        },
        onError(error) {
            console.log(error);
            toast({
                variant: "destructive",
                description: "Failed to delete the post, Please try again!"
            })
        },
    });

    return mutation;
}
