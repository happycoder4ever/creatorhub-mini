// src/components/WalletButton.tsx
"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { signIn } from "next-auth/react";
import { chains } from "@/lib/wagmi"; // make sure chains is exported from your wagmi.ts

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!address) return;

    setLoading(true);

    try {
      // 1. Request a nonce/message from your backend
      const res = await fetch("/api/nonce");
      const { message } = await res.json();

      // 2. Sign the message with the wallet
      const signature = await signMessageAsync({ message });

      // 3. Send signed message to NextAuth for verification
      const loginRes = await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });

      if (loginRes?.error) {
        console.error("SIWE login failed", loginRes.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!isConnected) {
    return (
      <button
        onClick={() =>
          connect({ connector: new InjectedConnector({ chains }) as any })
        }
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div>
      <span>Connected: {address}</span>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
