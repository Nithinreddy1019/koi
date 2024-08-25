import Image from "next/image"
import Link from "next/link"
import { UserButton } from "./user-button"
import { Searchfield } from "./search-field"


export const Navbar = () => {
    return (
        <header className="sticky top-0 z-10 bg-black shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3">
                <Link href={"/home"} className="flex items-center gap-x-2">
                    <Image 
                        src={"/koi.png"}
                        height={35}
                        width={35}
                        alt="logo"
                    />
                    <h3 className="text-2xl font-semibold text-rose-500">Koi</h3>
                </Link>

                <Searchfield />

                <UserButton className="sm:ms-auto"/>
            </div>
        </header>
    )
}