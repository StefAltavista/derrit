import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import GitHub from "@auth/core/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_SECRET || !GITHUB_CLIENT_ID) {
    throw new Error("Missing github OAuth credentials");
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        //Usually not needed, just fixing a bug in nextauth, where the id is not assigned to the session
        async session({ session, user }: any) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
});
