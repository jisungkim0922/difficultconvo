import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account) {
        (token as any).user = {
          name: user?.name ?? (profile as any)?.name ?? "",
          email: user?.email ?? "",
          image: (user as any)?.image ?? (profile as any)?.picture ?? "",
        };
        (token as any).lastLoginAt = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = (token as any).user ?? session.user;
      (session as any).lastLoginAt = (token as any).lastLoginAt ?? null;
      return session;
    },
  },
});
