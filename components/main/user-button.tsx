"use client"

import { signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import { CheckCheck, LogOut, Monitor, Moon, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";


interface UserButtonProps {
    className?: string
}

export const UserButton = ({
    className
}: UserButtonProps) => {

    const { data, status } = useSession();

    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("rounded-full", className)}>
                    <UserAvatar avatarUrl={data?.user?.image} size={40}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Logged in as @{data?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`users/${data?.user?.name}`}>
                    <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2"/>
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 h-4 w-4"/>
                        Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Monitor className="w-4 h-4 mr-2"/>
                                System default
                                {theme === "system" && (<CheckCheck className="ms-2 h-4 w-4"/>)}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun className="w-4 h-4 mr-2"/>
                                Light
                                {theme === "light" && (<CheckCheck className="ms-2 h-4 w-4"/>)}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon className="w-4 h-4 mr-2"/>
                                Dark
                                {theme === "dark" && (<CheckCheck className="ms-2 h-4 w-4"/>)}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => signOut()}
                >
                    <LogOut className="h-4 w-4 mr-2"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}