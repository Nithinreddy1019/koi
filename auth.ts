import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { LoginSchema } from "./schemas/auth-schema";
import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "./actions/user-action";

const prisma = db;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        
        if(validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if(!user || !user.password ) return null;

          const passwordmatch = await bcrypt.compare(password, user.password);

          if(passwordmatch) return user;

        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
});
