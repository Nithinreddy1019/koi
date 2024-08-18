"use server"

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/auth-schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validatedfields = LoginSchema.safeParse(values);

    if (!validatedfields.success) {
        return { error: "Invalid credentials"}
    };

    const { email, password } = validatedfields.data;

    const existingUser = await db.user.findUnique({
        where: { email}
    });
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email not found" }
    };

    // WIP: Add email verification
    
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT
        });
    } catch (error) {
        if(error instanceof AuthError) {
            console.log(error.type);

            switch(error.type) {
                case "CredentialsSignin": 
                    return { error: "Invalid credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        };

        throw error;
    };

    return { success: "Login successfull" }

}