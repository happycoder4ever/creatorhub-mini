"use client";

import { useAccount, useSignMessage } from "wagmi";
import { signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";

export default function TestLoginPage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const testLogin = async () => {
    if (!address) {
      alert("Connect your wallet first in MetaMask or Wagmi dev environment");
      return;
    }

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in to CreatorHub",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce: "123456", // we'll fix this later properly
    }).prepareMessage();

    const signature = await signMessageAsync({ message });

    const res = await signIn("credentials", {
      message,
      signature,
      redirect: false,
    });

    console.log(res);
    alert(res?.error ? "Login failed: " + res.error : "Login success!");
  };

  return (
    <div>
      <h1>Test SIWE Login</h1>
      <button onClick={testLogin}>Login with Wallet</button>
      {session && (
        <div>
          <p>Logged in as: {session.user?.name}</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
