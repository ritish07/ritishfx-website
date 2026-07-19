import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          // Auto-register for testing purposes
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split("@")[0],
              plan: "BASIC", // Default to BASIC so they can test the generator
            }
          });
        }

        return { id: user.id, name: user.name, email: user.email, plan: user.plan };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = (user as any).plan;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).plan = token.plan;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST };
