import { Prisma } from "@prisma/client";

export const userDataSelect = {
    id: true,
    name: true,
    image: true,
    email: true
} satisfies Prisma.UserSelect


export const postDataIncludes = {
    user: {
        select: userDataSelect
    }
} satisfies Prisma.PostInclude;

export type PostDataType = Prisma.PostGetPayload<{
    include: typeof postDataIncludes
}>