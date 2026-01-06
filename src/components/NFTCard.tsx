"use client";

type Props = {
  title: string;
  content?: string;
  hasAccess: boolean;
};

export default function NFTCard({ title, content, hasAccess }: Props) {
  const locked = !hasAccess;

  return (
    <div
      style={{
        width: 300,
        height: 180,
        borderRadius: 12,
        border: locked ? "1px solid #999" : "1px solid #ff9800",
        backgroundColor: locked ? "#f5f5f5" : "#fff3e0",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: locked ? 0.6 : 1,
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 14 }}>
          {locked
            ? "This content is locked. NFT or subscription required."
            : content}
        </p>
      </div>
      <div style={{ fontSize: 24 }}>
        {locked ? "🔒 Locked" : "💎 Premium"}
      </div>
    </div>
  );
}
