import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            name: string;
        } & DefaultSession["user"];
    }
}

import type { DefaultSession } from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username as string },
                });

                if (!user) return null;

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );
                if (!valid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
});
