import { auth } from "@/auth"
import { db } from "@/lib/db";
import { userDataSelect } from "@/lib/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { UserAvatar } from "./user-avatar";
import { Button } from "../ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";


export const TrendsSidebar = () => {
    return (
        <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-4">
            <Suspense fallback={<Loader className="mx-auto animate-spin"/>}>
                <WhoToFollow />
                <TrendingTopics />
            </Suspense>
        </div>
    )
}


const WhoToFollow = async () => {
    const session = await auth();
    const user = session?.user;

    const usersToFollow = await db.user.findMany({
        where: {
            NOT: {
                id: user?.id
            }
        },
        select: userDataSelect,
        take: 5
    });

    return (
        <div className="space-y-4 rounded-xl bg-card p-4 shadow-sm">
            <div className="text-xl font-bold">
                Who to follow
            </div>
            {usersToFollow.map((user) => (
                <div
                    key={user.id}
                    className="flex items-center justify-between gap-2"
                >
                    <Link
                        href={`/users/${user.name}`}
                        className="flex items-center gap-2"
                    >   
                        <UserAvatar avatarUrl={user.image} className="flex-none"/>
                        <div>
                            <p className="line-clamp-1 break-all font-semibold hover:underline">
                                {user.name}
                            </p>
                            <p className="line-clamp-1 text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </Link>
                    <Button size={"sm"}>
                        Follow
                    </Button>
                </div>
            ))}
        </div>
    )
};

const getTrendingTopics = unstable_cache(
    async () => {
        const result = await db.$queryRaw<{hashtag: string; count: bigint}[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) as count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

        return result.map((row) => ({
            hashtag: row.hashtag,
            count: Number(row.count)
        }))
    },
    ["trending_topics"],
    {
        revalidate: 3 * 60 * 60
    }
);

const TrendingTopics = async () => {

    const trendingTopics = await getTrendingTopics();

    return (
        <div className="space-y-4 rounded-xl bg-card shadow-sm p-4">
            <div className="text-xl font-bold">
                Trending topics
            </div>
            {trendingTopics.map(({hashtag, count}) => {
                const title = hashtag.split("#")[1];

                return (
                    <Link href={`/hashtag/${title}`} key={title} className="block">
                        <p className="line-clamp-1 break-all font-semibold hover:underline" title={hashtag}>
                            {hashtag}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatNumber(count)} { count === 1 ? "post" : "posts"}
                        </p>
                    </Link>
                )
            })}
        </div>
    )
}