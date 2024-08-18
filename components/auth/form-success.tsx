import { CheckCheck } from "lucide-react"


interface FormSuccessProps {
    message: string
}

export const FormSuccess = ({
    message
}: FormSuccessProps) => {

    if(!message) {
        return null
    }

    return (
        <div className="flex items-center gap-x-2 bg-emerald-500/25 py-1.5 px-4 rounded-md text-emerald-500">
            <CheckCheck strokeWidth={1.5} className="w-5 h-5 mr-2"/>
            <p>{message}</p>
        </div>
    )
}