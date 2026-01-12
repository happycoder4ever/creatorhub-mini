"use client";

type Props = {
  title: string;
  content: string;
};

export default function Post({ title, content }: Props) {
  return (
    <div
      style={{
        width: 300,
        height: 180,
        borderRadius: 12,
        border: "1px solid #4caf50",
        backgroundColor: "#e8f5e9",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Top block: title + content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <h3
          style={{
            margin: 0,
            minHeight: 40, // reserve 1–2 lines for title
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
          {content}
        </p>
      </div>

      {/* Label always fixed at bottom */}
      <div
        style={{
          fontSize: 24,
          color: "#4caf50",
          marginTop: 8,
        }}
      >
        🆓 Free
      </div>
    </div>
  );
}
