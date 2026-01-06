"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

interface Props {
  address: string;
}

export default function SignInButton({ address }: Props) {
  const { data: session } = useSession();

  if (session?.user) {
    return <div>Signed in as {session.user.name}</div>;
  }

  async function handleSignIn() {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        walletAddress: address,
      });

      if (res?.error) {
        alert("Sign in failed: " + res.error);
      } else {
        alert("Signed in!");
      }
    } catch (err: any) {
      alert("Sign in error: " + err.message);
    }
  }

  return <button onClick={handleSignIn}>Sign in with Ethereum</button>;
}
