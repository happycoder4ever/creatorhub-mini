import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { SiweMessage } from "siwe";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.message || !credentials?.signature) return null;

        try {
          const siwe = new SiweMessage(credentials.message);
          const verified = await siwe.verify({
            signature: credentials.signature,
          });

          if (!verified.success) return null;

          // Find or create user
          let user = await prisma.user.findUnique({
            where: { wallet: siwe.address },
          });

          if (!user) {
            user = await prisma.user.create({
              data: { wallet: siwe.address },
            });
          }

          // Must return object compatible with NextAuth User
          return {
            id: user.id,
            name: user.wallet,
            email: undefined,
            image: undefined,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // optional, 30 days
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
