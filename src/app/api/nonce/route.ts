import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET() {
  const nonce = randomBytes(8).toString("hex"); // 16 chars
  return NextResponse.json({ nonce });
}
