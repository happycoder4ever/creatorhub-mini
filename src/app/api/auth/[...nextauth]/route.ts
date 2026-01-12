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
        if (!credentials?.message || !credentials?.signature) {
          // Return null triggers NextAuth error redirect
          throw new Error("Missing message or signature. Please try again.");
        }

        try {
          const siwe = new SiweMessage(credentials.message);
          const verified = await siwe.verify({
            signature: credentials.signature,
          });

          if (!verified.success) {
            throw new Error("Wallet signature was rejected. Please sign the message to log in.");
          }

          // Find or create user
          let user = await prisma.user.findUnique({
            where: { wallet: siwe.address },
          });

          if (!user) {
            user = await prisma.user.create({
              data: { wallet: siwe.address },
            });
          }

          return {
            id: user.id,
            name: user.wallet,
            email: undefined,
            image: undefined,
          };
        } catch (err: any) {
          console.error("Sign-in error:", err);
          // Fallback readable message
          const message =
            err.message || "Failed to sign in. Please check your wallet and try again.";
          throw new Error(message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin", // show custom sign-in page
    error: "/auth/signin",  // NextAuth sends ?error=<code> to this page
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
