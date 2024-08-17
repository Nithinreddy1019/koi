

interface HeaderProps {
    heading: string,
    subHeading: string
}

export const Header = ({
    heading,
    subHeading
}: HeaderProps) => {
    return (
        <div className="space-y-2 w-full">
            <h1 className="text-2xl">{heading}</h1>
            <p className="text-sm text-gray-300">{subHeading}</p>
        </div>
    )
}