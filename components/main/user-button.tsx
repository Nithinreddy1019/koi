"use client"

import { signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";


interface UserButtonProps {
    className?: string
}

export const UserButton = ({
    className
}: UserButtonProps) => {

    const { data, status } = useSession();

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