import { PostDataType } from "@/lib/types"
import { useState } from "react"
import { DeletePostDialog } from "./delete-post-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostMoreButtonProps {
    post: PostDataType,
    className?: string
}


export const PostMoreButton = ({
    post,
    className
}: PostMoreButtonProps) => {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size={"icon"}
                        className={cn(className, "p-1")}
                        variant={"ghost"}
                    >
                        <MoreHorizontal className="size-4 text-muted-foreground"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} asChild>
                        <span className="flex items-center gap-2 text-red-500 font-medium">
                            <Trash2 className="size-4"/>
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeletePostDialog 
                post={post}
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            />
        </>
    )

}