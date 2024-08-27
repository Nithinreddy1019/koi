import { PostDataType } from "@/lib/types"
import Link from "next/link"
import { UserAvatar } from "../main/user-avatar"
import { FormatdateRelative } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { PostMoreButton } from "./post-more-button"


interface PostProps {
    post: PostDataType
}

export const Post = ({
    post
}: PostProps) => {

    const { data } = useSession();


    return(
        <div className="space-y-2 rounded-xl bg-card p-4 shadow-sm group/post">
            <div className="flex justify-between gap-2">
                <div className="flex items-center flex-wrap gap-2">
                    <Link href={`/users/${post.user.name}`}>
                        <UserAvatar avatarUrl={post.user.image}/>
                    </Link>
                    <div>
                        <Link 
                            href={`/users/${post.user.name}`}
                            className="block font-medium hover:underline"
                        >
                            {post.user.name}
                        </Link>
                        <Link 
                            href={`/posts/${post.id}`}
                            className="block text-sm text-muted-foreground hover:underline"
                        >
                            {FormatdateRelative(new Date(post.createdAt))}
                        </Link>
                    </div>
                </div>
                {post.user.id === data?.user?.id && (
                        <PostMoreButton 
                            post={post}
                            className="group-hover/post:opacity-100 opacity-0 transition-opacity"
                        />
                )}
            </div>
            <div className="whitespace-pre-line break-words">
                    {post.content}
            </div>
        </div>
    )
}