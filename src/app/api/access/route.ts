import { NextRequest, NextResponse } from "next/server";

/**
 * TODO:
 * When contract is ready:
 * - Import viem / ethers
 * - Call NFT contract balanceOf(wallet)
 * - hasAccess = balance > 0
 */

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json(
        { error: "Invalid address" },
        { status: 400 }
      );
    }

    // -----------------------------
    // TODO: REAL CONTRACT CHECK HERE
    // -----------------------------
    // Example (future):
    // const balance = await contract.read.balanceOf([address])
    // const hasAccess = balance > 0

    // -----------------------------
    // MOCK IMPLEMENTATION FOR NOW
    // -----------------------------
    const lastChar = wallet.toLowerCase().slice(-1);
    const hasAccess = parseInt(lastChar, 16) % 2 !== 0;

    return NextResponse.json({ hasAccess });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
