"use client"

import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, Ref } from "react";


interface InputMaterialProps {
    inputLabel: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    ref?: React.Ref<HTMLInputElement>,
    name?: string,
    errorState: boolean,
    disabled?: boolean
}


export const InputMaterial = forwardRef<HTMLInputElement, InputMaterialProps>(({
    inputLabel,
    onChange,
    name,
    errorState,
    disabled
}, ref) => {
    return (
        <div className="w-full">
            <label className="relative">
                <input
                    required 
                    className={cn("outline-none py-2 border-b-2 border-gray-800 bg-transparent w-full text-sm focus:border-gray-600 duration-200 peer peer:bg-transparent autofill:bg-transparent", errorState && ("border-red-500"))}
                    ref={ref}
                    name={name}
                    onChange={onChange}
                    disabled={disabled}
                />
                <span 
                    className="absolute top-0 left-0 text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 duration-200 text-gray-400 pb-4"
                >
                    {inputLabel}
                </span>
            </label>
        </div>
    )
});



