"use client"

import { useRouter } from "next/navigation"
import { FormEvent } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";



export const Searchfield = () => {
    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const q = (form.q as HTMLInputElement).value.trim();
        if(!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    };
    

    return (
        <form onSubmit={handleSubmit} method="GET" action={"/search"}>
            <div className="relative">
                <Input name="q" placeholder="Search" className="pe-10"/>
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transform"/>
            </div>
        </form>
    )
}