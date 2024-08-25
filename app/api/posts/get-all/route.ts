import { auth } from "@/auth";
import { db } from "@/lib/db";
import { postDataIncludes } from "@/lib/types";


export async function GET() {
    try {
        const session = await auth();

        if(!session?.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const posts = await db.post.findMany({
            include: postDataIncludes,
            orderBy: { createdAt: "desc" }
        });

        return Response.json(posts);
        
    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}