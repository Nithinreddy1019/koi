import { useDeletePostMutation } from "@/actions/mutations"
import { PostDataType } from "@/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface DeletePostDialogProps {
    post: PostDataType,
    open: boolean,
    onClose: () => void
}


export const DeletePostDialog = ({
    post,
    open,
    onClose
}: DeletePostDialogProps) => {

    const mutation = useDeletePostMutation();

    const handleOpenChange = (open: boolean) => {
        if(!open || !mutation.isPending) {
            onClose()
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete a post</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"destructive"}
                        onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
                        disabled={mutation.isPending}
                        className="flex"
                        size={"sm"}
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader className="w-4 h-4 mr-2 animate-spin"/>
                                Delete
                            </>
                        ): (
                            "Delete"
                        )}
                    </Button>

                    <Button
                        variant={"outline"}
                        onClick={onClose}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}