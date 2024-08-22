"use client"

import { PostEditor } from "@/components/posts/post-editor";
import { useSession } from "next-auth/react";


const HomePage = () => {
    
    const { data, status } = useSession();
    

    return (
        <main className="h-[200vh] w-full ">
            <div>
                <PostEditor />
            </div>
        </main>
    );
}
 
export default HomePage;