import { Form } from "react-hook-form"
import { Button } from "../ui/button"
import { Footer } from "./footer"
import { Header } from "./header"
import { InputMaterial } from "./input-material"


export const LoginForm = () => {

    

    return (
        <div className="h-full flex flex-col items-center justify-center text-white">
            <div className="flex flex-col w-72 space-y-8">
                <Header 
                    heading="Sign in to Koi"
                    subHeading="Enter your account details below"
                />

                <InputMaterial 
                    inputLabel="Email Address"
                />

                <InputMaterial 
                    inputLabel="Password"
                />

                <Button
                    className="text-white"
                >
                    Sign in
                </Button>

                <div className="border"/>


                <Footer 
                    footerLabel="Don't have an account?"
                    backButtonLabel="Get Started"
                    backButtonHref="/auth/register"
                />
            </div>
        </div>
    )
}