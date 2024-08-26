"use client"

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { SubmitPostAction } from "@/actions/post-actions";
import { UserAvatar } from "../main/user-avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import "./styles.css";


export const PostEditor = () => {

    const { data, status } = useSession();

    const editor = useEditor({
        extensions: [
            Placeholder.configure({
                placeholder: "What is up mate?"
            }),
            StarterKit.configure({
                bold: false,
                italic: false
            }),
        ],
    });

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || " ";

    const onSubmit = async () => {
        await SubmitPostAction(input);
        editor?.commands.clearContent();
    };


    return (
        <div className="flex flex-col gap-5 rounded-xl bg-card p-4 shadow-sm w-full">
            <div className="flex gap-5">
                <UserAvatar
                    avatarUrl={data?.user?.image} 
                    className="hidden sm:flex"
                />
                <EditorContent 
                    editor={editor}
                    className="w-full max-h-80 overflow-y-auto bg-background rounded-xl px-4 py-2"
                />
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={onSubmit}
                    className="min-w-20 "
                    disabled={!input.trim()}
                    size={"sm"}
                >
                    Post
                </Button>
            </div>
        </div>
    )
}