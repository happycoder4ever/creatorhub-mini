"use client";

import { useState } from "react";
import WalletButton from "@/components/WalletButton";
import SignInButton from "@/components/SignInButton";

export default function TestLoginPage() {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <main>
      <h1>CreatorHub Mini</h1>
      <WalletButton onConnect={setAddress} />
      {address && <SignInButton address={address} />}
    </main>
  );
}
