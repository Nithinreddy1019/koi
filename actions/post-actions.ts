"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db";
import { CreatePostSchema } from "@/schemas/post-schema";


export const SubmitPostAction = async (input: string) => {
    const session = await auth();

    if(!session?.user) throw Error ("Unauthorized");

    const validatedInput = CreatePostSchema.safeParse({ content: input });
    const userId = await session.user.id;

    await db.post.create({
        data: {
            content: validatedInput.data?.content as string,
            userId: userId as string
        }
    });
};