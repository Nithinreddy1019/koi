import Link from "next/link"
import { Button } from "../ui/button"
import { Bell, Bookmark, Home, Mail } from "lucide-react"


interface MenubarProps {
    className?: string
}

export const Menubar = ({
    className
}: MenubarProps) => {
    return (
        <div className={className}>
            <Button
                variant={"ghost"}
                className="flex items-center justify-start gap-3"
                asChild
                title="Home"
            >
                <Link href={"/home"}>
                    <Home className="h-5 w-5"/>
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>
            <Button
                variant={"ghost"}
                className="flex items-center justify-start gap-3"
                asChild
                title="Notifications"
            >
                <Link href={"/notifications"}>
                    <Bell className="h-5 w-5"/>
                    <span className="hidden lg:inline">Notifications</span>
                </Link>
            </Button>
            <Button
                variant={"ghost"}
                className="flex items-center justify-start gap-3"
                asChild
                title="Messages"
            >
                <Link href={"/messages"}>
                    <Mail className="h-5 w-5"/>
                    <span className="hidden lg:inline">Messages</span>
                </Link>
            </Button>
            <Button
                variant={"ghost"}
                className="flex items-center justify-start gap-3"
                asChild
                title="Bookmarks"
            >
                <Link href={"/bookmarks"}>
                    <Bookmark className="h-5 w-5"/>
                    <span className="hidden lg:inline">Bookmarks</span>
                </Link>
            </Button>
        </div>
    )
}