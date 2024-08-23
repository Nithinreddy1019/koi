
import { Post } from "@/components/posts/post";
import { PostEditor } from "@/components/posts/post-editor";
import { db } from "@/lib/db";
import { postDataIncludes } from "@/lib/types";


const HomePage = async () => {
    
    const posts = await db.post.findMany({
        include: postDataIncludes,
        orderBy: { createdAt : "desc" },
    })
    

    return (
        <main className="w-full min-w-0">
            <div className="min-w-0 space-y-4">
                <PostEditor />
                {posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
        </main>
    );
}
 
export default HomePage;