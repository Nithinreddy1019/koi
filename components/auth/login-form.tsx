"use client"

import { Form, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Footer } from "./footer"
import { Header } from "./header"
import { InputMaterial } from "./input-material"
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schemas/auth-schema";
import { z } from "zod";
import { FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { LoginAction } from "@/actions/login-action"



export const LoginForm = () => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    
    const { register, handleSubmit, formState: { errors }} = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });


    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        console.log(values);

        startTransition(() => {
            LoginAction(values)
            .then((data) => {
                setError(data?.error as string);
                setSuccess(data?.success as string);
            })
        })
    };


    return (
        <div className="h-full flex flex-col items-center justify-center text-white">
            <div className="flex flex-col w-72 space-y-8">
                <Header 
                    heading="Sign in to Koi"
                    subHeading="Enter your account details below"
                />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative">

                    <InputMaterial 
                        inputLabel="Email Address"
                        {...register("email")}
                        name="email"
                        errorState={!!errors.email?.message}
                    />
                    {errors.email && (<p className="absolute top-0 text-xs text-red-500">{errors.email.message}</p>)}


                    <InputMaterial  
                        inputLabel="Password"
                        {...register("password")}
                        name="password"
                        errorState={!!errors.password?.message}
                    />
                    {errors.password && (<p className="absolute bottom-16 text-xs text-red-500">{errors.password.message}</p>)}


                    <Button type="submit" className="text-white w-full" disabled={isPending}>
                        Sign in
                    </Button>

                </form>

                
                <FormError message={error!}/>
                <FormSuccess message={success!}/>

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