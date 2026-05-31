"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// ダミーデータ（後でAPIから取得する）
const lipColors = ["#D93350", "#700D20", "#F56680", "#FFB3C1", "#5C0A17"];
const eyeColors = ["#CC8050", "#7A4F35", "#F2D9C0", "#4A2518"];
const cheekColors = ["#F29999", "#FFB3B3", "#E07070"];

const barData = [
  { label: "リップ", count: 80, width: 240, color: "#e8407d" },
  { label: "アイシャドウ", count: 53, width: 160, color: "#cc9980" },
  { label: "チーク", count: 33, width: 100, color: "#f29999" },
];

export default function TrendsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      maxWidth: "390px",
      margin: "0 auto",
      paddingBottom: "60px" }}>

      {/* ヘッダー */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #d9d9d9" }}>
        <h1 style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#212121",
          margin: 0 }}>似合う色 傾向</h1>
      </div>

      <div style={{ padding: "0 20px" }}>

        {/* リップ */}
        <div style={{ paddingTop: "16px" }}>
          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#e8407d",
            margin: "0 0 12px 0" }}>リップ</p>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap" }}>
            {lipColors.map((color, i) => (
              <div key={i} style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #d9d9d9", marginTop: "16px" }} />

        {/* アイシャドウ */}
        <div style={{ paddingTop: "16px" }}>
          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#e8407d",
            margin: "0 0 12px 0" }}>アイシャドウ</p>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap" }}>
            {eyeColors.map((color, i) => (
              <div key={i} style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #d9d9d9",
          marginTop: "16px" }} />

        {/* チーク */}
        <div style={{ paddingTop: "16px" }}>
          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#e8407d",
            margin: "0 0 12px 0" }}>チーク</p>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap" }}>
            {cheekColors.map((color, i) => (
              <div key={i} style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #d9d9d9",
          marginTop: "16px" }} />

        {/* よく使うカテゴリ */}
        <div style={{ paddingTop: "16px" }}>
          <p style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 20px 0" }}>よく使うカテゴリ</p>
          {barData.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px" }}>
              <span style={{
                fontSize: "13px",
                color: "#999",
                width: "80px",
                flexShrink: 0 }}>{item.label}</span>
              <div style={{
                height: "22px",
                width: `${item.width}px`,
                borderRadius: "11px",
                backgroundColor: item.color }} />
              <span style={{
                fontSize: "12px",
                color: "#999",
                marginLeft: "8px" }}>{item.count}個</span>
            </div>
          ))}
        </div>

      </div>

      {/* ナビバー */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "390px",
        height: "48px",
        backgroundColor: "#fff",
        borderTop: "1px solid #d9d9d9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around" }}>
        {[
          { icon: "⊟", label: "ホーム", path: "/home" },
          { icon: "◎", label: "傾向", path: "/trends" },
          { icon: "◈", label: "試着", path: "/try-on" },
          { icon: "◉", label: "設定", path: "/profile" },
        ].map((item) => (
          <button key={item.label} onClick={() => router.push(item.path)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px" }}>
            <span style={{ fontSize: "18px", color: "#999" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", color: "#999" }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}