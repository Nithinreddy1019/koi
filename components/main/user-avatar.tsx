import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import Image from "next/image"


interface UserAvatarProps {
    avatarUrl: string | null | undefined,
    size?: number,
    className?: string
}

export const UserAvatar = ({
    avatarUrl,
    size,
    className
}: UserAvatarProps) => {
    return (
        <>
            {avatarUrl && (
                <Image 
                src={avatarUrl}
                height={size || 48}
                width={size || 48}
                alt="Avatar"
                className={cn("aspect-square flex-none h-fit rounded-full object-cover bg-secondary", className)}
                />
            )}
            {!avatarUrl && (
                <div className={cn("bg-secondary rounded-full h-9 w-9 flex items-center justify-center", className)}>
                    <User 
                        className=""
                        strokeWidth={1.5}
                    />
                </div>
            )}
        </>
    )
}