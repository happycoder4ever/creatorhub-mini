// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Mock posts data
  const posts = [
    { id: "1", title: "Free Post 1", isPremium: false, content: "This is free content" },
    { id: "2", title: "Premium Post 1", isPremium: true, content: "Secret premium content" },
    { id: "3", title: "Free Post 2", isPremium: false, content: "Another free post" },
    { id: "4", title: "Premium Post 2", isPremium: true, content: "Another secret content" },
  ];

  return NextResponse.json(posts);
}
