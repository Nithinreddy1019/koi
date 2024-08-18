"use client"

import * as z from "zod";
import { Header } from "./header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth-schema";
import { InputMaterial } from "./input-material";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Footer } from "./footer";
import { useState, useTransition } from "react";
import { RegisterAction } from "@/actions/register-action";


export const RegisterForm = () => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values);
        startTransition(() => {
            RegisterAction(values)
            .then((data) => {
                setError(data.error as string)
                setSuccess(data.success as string)
            })
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center text-white">
            <div className="flex flex-col w-72 space-y-8">
                <Header 
                    heading="Register for Koi"
                    subHeading="Enter your account details below"
                />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative">

                    <InputMaterial 
                        inputLabel="username"
                        {...register("username")}
                        name="username"
                        errorState={!!errors.username?.message}
                    />
                    {errors.username && (<p className="absolute top-0 text-xs text-red-500">{errors.username.message}</p>)}

                    <InputMaterial 
                        inputLabel="Email Address"
                        {...register("email")}
                        name="email"
                        errorState={!!errors.email?.message}
                    />
                    {errors.email && (<p className="absolute bottom-36 text-xs text-red-500">{errors.email.message}</p>)}


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
                    footerLabel="Already have an account?"
                    backButtonLabel="Sigin in"
                    backButtonHref="/auth/login"
                />
            </div>
        </div>
    )
}