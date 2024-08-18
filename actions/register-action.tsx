"use server"

import * as z from "zod";
import * as bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas/auth-schema";
import { db } from "@/lib/db";



export const RegisterAction = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid credentials" }
    };

    const { username, email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
        where: { email }
    });
    if(existingUser) {
        return { error: "Email already in use" }
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.user.create({
            data: {
                email, 
                name: username,
                password: hashedPassword
            }
        });

        return { success: "User created successfully" };
    } catch (error) {
        return { error: "Somethig went wrong" };
    }
}