"use client"

import { useSession } from "next-auth/react";


const HomePage = () => {
    
    const { data, status } = useSession();
    

    return (
        <div>
            Hello
        </div>
    );
}
 
export default HomePage;