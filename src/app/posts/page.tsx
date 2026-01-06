"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkAccess } from "@/lib/access"; // your helper
import NFTCard from "@/components/NFTCard"; // placeholder NFT content component

export default function PostsPage() {
  const { data: session } = useSession();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchAccess() {
      if (!session?.user?.name) return;

      try {
        const result = await checkAccess(session.user.name); // wallet address
        setHasAccess(result);
      } catch (err) {
        console.error(err);
        setHasAccess(false);
      }
    }

    fetchAccess();
  }, [session]);

  if (!session) return <p>Please connect wallet and sign in first.</p>;
  if (hasAccess === null) return <p>Checking access...</p>;

  return (
    <main>
      <h1>CreatorHub Mini — Posts</h1>
      <NFTCard hasAccess={hasAccess} />
    </main>
  );
}
