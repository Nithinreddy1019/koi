import { Navbar } from "@/components/main/navbar";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children } : { children: React.ReactNode}) => {
    return (
        <SessionProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="max-w-7xl mx-auto p-5">
                    {children}
                </div>
            </div>
        </SessionProvider>
        
    );
}
 
export default MainLayout;