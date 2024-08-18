import { TriangleAlert } from "lucide-react"


interface FormErrorProps {
    message: string
}

export const FormError = ({
    message
}: FormErrorProps) => {

    if(!message) {
        return null
    }

    return (
        <div className="flex items-center gap-x-2 bg-destructive/25 py-1.5 px-4 rounded-md text-red-500">
            <TriangleAlert strokeWidth={1.5} className="w-5 h-5 mr-2"/>
            <p>{message}</p>
        </div>
    )
}