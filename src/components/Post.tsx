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
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 14 }}>{content}</p>
      </div>
      <div style={{ fontSize: 24, color: "#4caf50" }}>🆓 Free</div>
    </div>
  );
}
