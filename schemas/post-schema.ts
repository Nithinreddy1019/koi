import * as z from "zod";

export const CreatePostSchema = z.object({
    content: z.string()
});