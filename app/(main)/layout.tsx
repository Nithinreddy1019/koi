import { Menubar } from "@/components/main/menu-bar";
import { Navbar } from "@/components/main/navbar";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children } : { children: React.ReactNode}) => {
    return (
        <SessionProvider>
            <div className="flex flex-col min-h-screen dark:bg-black">
                <Navbar />
                <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-4">
                    <Menubar className="bg-card sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl px-2 py-4 lg:px-4 shadow-sm xl:w-80"/>
                    {children}
                </div>
                <Menubar className="sticky bottom-0 flex w-full justify-center gap-4 border-t bg-card p-3 sm:hidden"/>
            </div>
        </SessionProvider>
        
    );
}
 
export default MainLayout;