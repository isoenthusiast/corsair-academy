import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    providers: [], // Populated in auth.ts
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = (user as any).role;
                token.impersonatedBy = (user as any).impersonatedBy;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.impersonatedBy = token.impersonatedBy as string | undefined;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
};
