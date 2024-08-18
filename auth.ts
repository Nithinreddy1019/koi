import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";

const prisma = db;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [
    Credentials({
      async authorize(credentials) {
        return null;
      },
    }),
  ],
});
