import { Skeleton } from "../ui/skeleton"



export const PostsLoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
        </div>
    )
}

const PostLoadingSkeleton = () => {
    return (
        <div className="w-full animate-pulse space-y-2 rounded-xl bg-card p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
                <Skeleton className="size-12 rounded-full"/>
                <div className="space-y-1.5">
                    <Skeleton className="h-4 w-24 rounded"/>
                    <Skeleton className="h-4 w-24 rounded"/>
                </div>
            </div>
            <Skeleton className="h-16 rounded"/>
        </div>
    )
}