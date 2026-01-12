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
        boxSizing: "border-box",
        opacity: locked ? 0.6 : 1,
      }}
    >
      {/* Top block: title + content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <h3
          style={{
            margin: 0,
            minHeight: 40,
            lineHeight: "20px",
            fontSize: 16,
            overflow: "hidden",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            marginTop: 8,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {locked
            ? "This content is locked. NFT or subscription required."
            : content}
        </p>
      </div>

      {/* Label always fixed at bottom */}
      <div
        style={{
          fontSize: 24,
          color: locked ? "#999" : "#ff9800",
          marginTop: 8,
        }}
      >
        {locked ? "🔒 Locked" : "💎 Premium"}
      </div>
    </div>
  );
}
