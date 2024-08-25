import { PostDataType } from "@/lib/types"
import Link from "next/link"
import { UserAvatar } from "../main/user-avatar"
import { FormatdateRelative } from "@/lib/utils"


interface PostProps {
    post: PostDataType
}

export const Post = ({
    post
}: PostProps) => {
    return(
        <div className="space-y-2 rounded-xl bg-card p-4 shadow-sm">
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
                        {/* {FormatdateRelative(post.createdAt)} */}
                    </Link>
                </div>
            </div>
            <div className="whitespace-pre-line break-words">
                {post.content}
            </div>
        </div>
    )
}