"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db";
import { postDataIncludes } from "@/lib/types";
import { CreatePostSchema } from "@/schemas/post-schema";


export const SubmitPostAction = async (input: string) => {
    const session = await auth();

    if(!session?.user) throw Error ("Unauthorized");

    const validatedInput = CreatePostSchema.safeParse({ content: input });
    const userId = await session.user.id;

    const newPost = await db.post.create({
        data: {
            content: validatedInput.data?.content as string,
            userId: userId as string
        },
        include: postDataIncludes
    });

    return newPost;
};


export const deletePostAction = async (id: string) => {
    const session = await auth();

    if(!session?.user) throw new Error ("Unauthorized");

    const post = await db.post.findUnique({
        where: { id: id }
    });

    if(!post) throw new Error ("Post does not exist");

    if(post.userId !== session.user.id) throw new Error("Unauthorized");

    const deletedPost = await db.post.delete({
        where: { id: id },
        include: postDataIncludes
    });
    
    return deletedPost;
}