"use client"

import { useSession } from "next-auth/react";


const HomePage = () => {
    
    const { data, status } = useSession();
    

    return (
        <main className="h-[200vh] w-full ">
            <div>
                Home page
            </div>
        </main>
    );
}
 
export default HomePage;