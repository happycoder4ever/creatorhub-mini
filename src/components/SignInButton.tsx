"use client";

import { signIn } from "next-auth/react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
interface SignInButtonProps {
  address: string;
}

export default function SignInButton({ address }: SignInButtonProps) {
  async function handleSignIn() {
    try {
      if (!window.ethereum) throw new Error("No Ethereum wallet found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to CreatorHub Mini",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce,
      });

      const message = siweMessage.prepareMessage();
      const signature = await signer.signMessage(message);

      const res = await signIn("credentials", {
        redirect: false,
        message,
        signature,
      });

      if (res?.error) throw new Error(res.error);

      // Redirect after login
      window.location.href = "/posts";
    } catch (err: any) {
      console.error(err);
      alert("Sign in failed: " + err.message);
    }
  }

  return <button onClick={handleSignIn}>Sign in with Ethereum</button>;
}
