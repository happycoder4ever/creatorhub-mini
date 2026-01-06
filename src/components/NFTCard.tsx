// components/NFTCard.tsx
"use client";

type Props = {
  hasAccess: boolean;
};

export default function NFTCard({ hasAccess }: Props) {
  return (
    <div
      style={{
        width: 300,
        height: 180,
        borderRadius: 12,
        border: "1px solid #333",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: hasAccess ? 1 : 0.5,
      }}
    >
      <div>
        <h3>CreatorHub NFT Content</h3>
        <p style={{ fontSize: 14 }}>
          {hasAccess
            ? "You have access to this content."
            : "This content is locked. NFT required."}
        </p>
      </div>

      <div style={{ fontSize: 24 }}>
        {hasAccess ? "✅ Unlocked" : "🔒 Locked"}
      </div>
    </div>
  );
}
