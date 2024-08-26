"use client"

import { PostDataType } from "@/lib/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios";
import { Loader } from "lucide-react";
import { Post } from "../posts/post";
import { Button } from "../ui/button";


export const Feed = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ["post-feed", "for-you"],
        queryFn: async ({pageParam}) => {
            const res = await axios.get("http://localhost:3000/api/posts/get-all", {
                params: pageParam ? { cursor: pageParam } : undefined
            });
            if (res.status !== 200) {
                throw Error(`Request failed with status code ${res.status}`)
            };

            return res.data;
        },
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    const posts = data?.pages.flatMap(page => page.posts) || [];


    if(status === "pending") {
        return (
            <div className="w-full"> 
                <Loader className="mx-auto h-5 w-5 animate-spin"/>
            </div>
        )
    }

    if(status === "error") {
        return (
            <p className="text-destructive text-center w-full">
                An error occured while loading posts
            </p>
        )
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Post key={post.id} post={post}/>
            ))}
            <Button onClick={() => fetchNextPage()}>
                Load more
            </Button>
        </div>
    )
}