import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const normalized = wallet.toLowerCase();
    const hasAccess = normalized.includes("12345");

    return NextResponse.json({ hasAccess });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
