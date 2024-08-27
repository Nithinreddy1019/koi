import { useToast } from "@/components/ui/use-toast"
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitPostAction } from "./post-actions";
import { PostsPage } from "@/lib/types";


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
}
