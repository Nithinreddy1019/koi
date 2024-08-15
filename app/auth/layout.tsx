import { AuthSlider } from "@/components/auth/auth-slider";


const AuthLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="h-screen flex">
            <div className="h-full flex-1 hidden lg:flex">
                <AuthSlider />
            </div>
            <div className="w-full lg:w-1/2 xl:w-[650px] dark bg-background z-50">
                {children}
            </div>
        </div>
    );
}
 
export default AuthLayout;