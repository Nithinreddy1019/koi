"use client"


interface InputMaterialProps {
    inputLabel: string,

}


export const InputMaterial = ({
    inputLabel
}: InputMaterialProps) => {
    return (
        <div className="w-full">
            <label className="relative">
                <input
                    required 
                    className="outline-none py-2 border-b-2 border-gray-800 bg-transparent w-full text-sm focus:border-gray-600 duration-200 peer"/>
                <span 
                    className="absolute top-0 left-0 text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 duration-200 text-gray-400 pb-4"
                >
                    {inputLabel}
                </span>
            </label>
        </div>
    )
}