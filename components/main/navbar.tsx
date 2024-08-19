import Image from "next/image"
import Link from "next/link"
import { UserButton } from "./user-button"


export const Navbar = () => {
    return (
        <header className="sticky top-0 z-10 bg-card shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3">
                <Link href={"/home"} className="flex items-center">
                    <Image 
                        src={"/koi-trans.png"}
                        height={35}
                        width={35}
                        alt="logo"
                    />
                    <h3 className="text-2xl font-semibold text-sky-500">Koi</h3>
                </Link>

                <UserButton />
            </div>
        </header>
    )
}