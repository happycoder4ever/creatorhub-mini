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
      if (!window.ethereum) {
        alert("No Ethereum wallet detected. Please install MetaMask or another wallet.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Fetch nonce for SIWE
      const nonceRes = await fetch("/api/auth/nonce");
      if (!nonceRes.ok) throw new Error("Failed to fetch nonce");
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

      let signature: string;
      try {
        signature = await signer.signMessage(message);
      } catch (err: any) {
        // User rejected the signature
        alert("Wallet signature request was rejected. Please try again.");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        message,
        signature,
      });

      if (res?.error) {
        // Friendly error for server-side issues
        alert(res.error.includes("Invalid") 
          ? "Sign-in failed. Please try again." 
          : res.error);
        return;
      }

      // Success → redirect
      window.location.href = "/posts";
    } catch (err: any) {
      console.error("Sign-in error:", err);
      alert(err?.message || "An unexpected error occurred. Please try again.");
    }
  }

  return (
    <button
      onClick={handleSignIn}
      style={{ padding: "8px 16px", borderRadius: 8, background: "#4caf50", color: "#fff" }}
    >
      Sign in with Ethereum
    </button>
  );
}
