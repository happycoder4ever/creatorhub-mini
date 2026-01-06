"use client";

import { useState } from "react";
import { ethers } from "ethers";

interface WalletButtonProps {
  onConnect: (address: string) => void;
}

export default function WalletButton({ onConnect }: WalletButtonProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error("No Ethereum wallet found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setAddress(walletAddress);
      onConnect(walletAddress); // notify parent page
    } catch (err: any) {
      alert("Wallet connection failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={connectWallet} disabled={loading}>
      {address ? `Connected: ${address}` : loading ? "Loading..." : "Connect Wallet"}
    </button>
  );
}
