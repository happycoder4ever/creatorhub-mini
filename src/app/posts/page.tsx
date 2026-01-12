"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import NFTCard from "@/components/NFTCard";
import PostCard from "@/components/Post";
import { checkAccess } from "@/lib/access";

type Post = {
  id: string;
  title: string;
  content: string;
  isPremium: boolean;
};

export default function PostsPage() {
  const { data: session } = useSession();
  const wallet = session?.user?.name; // wallet stored as user name
  const [posts, setPosts] = useState<Post[]>([]);
  const [accessMap, setAccessMap] = useState<Record<string, boolean>>({});

  // Fetch posts from backend
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);

  // Check access for premium posts
  useEffect(() => {
    if (!wallet || posts.length === 0) return;

    async function fetchAccess() {
      const map: Record<string, boolean> = {};
      await Promise.all(
        posts.map(async (post) => {
          if (!post.isPremium) {
            map[post.id] = true;
          } else {
            map[post.id] = await checkAccess(wallet ?? "");
          }
        })
      );
      setAccessMap(map);
    }

    fetchAccess();
  }, [wallet, posts]);

  return (
    <main style={{ padding: 16 }}>
      {/* LOGIN STATUS */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
        }}
      >
        {session ? (
          <>
            <span>
              Logged in as: <strong>{wallet}</strong>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{ cursor: "pointer" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <span>Not logged in</span>
            <button onClick={() => signIn()} style={{ cursor: "pointer" }}>
              Sign In
            </button>
          </>
        )}
      </div>

      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        CreatorHub Posts
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: 1400,
          }}
        >
          {posts.map((post) =>
            post.isPremium ? (
              <NFTCard
                key={post.id}
                title={post.title}
                content={accessMap[post.id] ? post.content : undefined}
                hasAccess={!!accessMap[post.id]}
              />
            ) : (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
