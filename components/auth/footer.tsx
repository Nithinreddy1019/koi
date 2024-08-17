import Link from "next/link"
import { Button } from "../ui/button"

interface FooterProps {
    footerLabel: string,
    backButtonLabel: string,
    backButtonHref: string
}

export const Footer = ({
    footerLabel,
    backButtonLabel,
    backButtonHref
}: FooterProps) => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm">{footerLabel}</p>
            
            <Button 
                asChild
                variant={"secondary"}
                size={"sm"}
                className=""
            >
                <Link href={backButtonHref}>
                    {backButtonLabel}
                </Link>
            </Button>
        </div>
    )
}