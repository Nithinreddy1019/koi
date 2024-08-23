import { Prisma } from "@prisma/client";


export const postDataIncludes = {
    user: {
        select: {
            name: true,
            image: true
        }
    }
} satisfies Prisma.PostInclude;

export type PostDataType = Prisma.PostGetPayload<{
    include: typeof postDataIncludes
}>