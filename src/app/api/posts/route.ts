// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mockPostsHelper } from "@/lib/mockpostshelper";

// Helper to truncate long content
function getPreview(content: string, length = 120) {
  if (content.length <= length) return content;
  return content.slice(0, length) + "...";
}

export async function GET(req: NextRequest) {
  const posts = mockPostsHelper.getAll();

  // Return only a preview of the content
  const previewPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    isPremium: post.isPremium,
    content: getPreview(post.content, 200), // first 200 chars
  }));

  return NextResponse.json(previewPosts);
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, isPremium } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing title or content" },
        { status: 400 }
      );
    }

    const newPost = mockPostsHelper.create({ title, content, isPremium });
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, isPremium } = await req.json();
    const updated = mockPostsHelper.update(id, { title, content, isPremium });

    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const success = mockPostsHelper.delete(id);

    if (!success) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
