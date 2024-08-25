"use client"

import { PostDataType } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { Loader } from "lucide-react";
import { Post } from "../posts/post";


export const Feed = () => {
    const query = useQuery<PostDataType[]>({
        queryKey: ["post-feed", "for-you"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/api/posts/get-all");
            if (res.status !== 200) {
                throw Error(`Request failed with status code ${res.status}`)
            };

            return res.data;
        }
    });

    if(query.status === "pending") {
        return (
            <div className="w-full"> 
                <Loader className="mx-auto h-5 w-5 animate-spin"/>
            </div>
        )
    }

    if(query.status === "error") {
        return (
            <p className="text-destructive text-center w-full">
                An error occured while loading posts
            </p>
        )
    }

    return (
        <>
            {query.data.map((post) => (
                <Post key={post.id} post={post}/>
            ))}
        </>
    )
}