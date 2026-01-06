"use client";

import { useAccount, useConnect, useSignMessage } from "wagmi";
import { signIn } from "next-auth/react";
import { SiweMessage } from "siwe";

export default function TestLoginPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();

  async function login() {
    if (!address) return;

    // fetch fresh nonce from backend
    const res = await fetch("/api/nonce");
    const { nonce } = await res.json();

    // prepare SIWE message
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in to CreatorHub",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce,
    }).prepareMessage();

    // sign with wallet
    const signature = await signMessageAsync({ message });

    // send to NextAuth
    const result = await signIn("credentials", {
      message,
      signature,
      redirect: false,
    });

    console.log("Sign in result:", result);
  }

  return (
    <div style={{ padding: 40 }}>
      {!isConnected && (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <button onClick={login}>
          Sign in
        </button>
      )}
    </div>
  );
}
