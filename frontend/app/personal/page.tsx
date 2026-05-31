"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const personalColors = [
  { label: "Spring", color: "#F4B3C2" },
  { label: "Summer", color: "#D2EAF0" },
  { label: "Autumn", color: "#E2983E" },
  { label: "Winter", color: "#1797CF" },
];

const skeletonTypes = ["Straight", "Wave", "Natural"];

const faceTypes = [
  "Cute", "Active Cute", "Fresh", "Cool Casual",
  "Soft Elegant", "Feminin", "Elegant", "Cool",
];

export default function PersonalPage() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("Summer");
  const [selectedSkeleton, setSelectedSkeleton] = useState("Straight");
  const [selectedFace, setSelectedFace] = useState("Cool");

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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #d9d9d9" }}>
        <h1 style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#212121",
          margin: 0 }}>パーソナル管理</h1>
        <button style={{
          background: "none",
          border: "none",
          fontSize: "20px",
          color: "#e8407d",
          cursor: "pointer"
        }}>✏</button>
      </div>

      {/* プロフィールアイコン */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 0 16px"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#f5c0d7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#e8407d"
          }}>K</span>
        </div>
        <p style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#212121",
          marginTop: "8px"
        }}>Kanon</p>
      </div>

      <div style={{ padding: "0 20px" }}>

        {/* パーソナルカラー */}
        <div style={{
          borderTop: "1px solid #d9d9d9",
          paddingTop: "16px",
          marginBottom: "16px"
        }}>
          <p style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 16px 0"
          }}>パーソナルカラー</p>
          <div style={{ display: "flex", gap: "16px" }}>
            {personalColors.map((item) => (
              <div key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px" }}>
                <div
                  onClick={() => setSelectedColor(item.label)}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    cursor: "pointer",
                    border: selectedColor === item.label ? "3px solid #e8407d" : "3px solid transparent",
                  }}
                />
                <span style={{
                  fontSize: "11px",
                  color: selectedColor === item.label ? "#e8407d" : "#999",
                  fontWeight: selectedColor === item.label ? "bold" : "normal" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 骨格タイプ */}
        <div style={{
          borderTop: "1px solid #d9d9d9",
          paddingTop: "16px",
          marginBottom: "16px" }}>
          <p style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 12px 0"
          }}>骨格タイプ</p>
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "12px" }}>
            {skeletonTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedSkeleton(type)}
                style={{
                  height: "30px",
                  padding: "0 16px",
                  borderRadius: "15px",
                  border: "none",
                  backgroundColor: selectedSkeleton === type ? "#e8407d" : "#f2f2f2",
                  color: selectedSkeleton === type ? "#fff" : "#999",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            ))}
          </div>
          {selectedSkeleton && (
            <div style={{
              backgroundColor: "#fdf0f5",
              borderRadius: "12px",
              padding: "12px 16px" }}>
              <p style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#e8407d",
                margin: "0 0 4px 0" }}
                >{selectedSkeleton}
                （{selectedSkeleton === "Straight" ? "ストレート" :
                selectedSkeleton === "Wave" ? "ウェーブ" : "ナチュラル"}）</p>
              <p style={{
                fontSize: "11px",
                color: "#999",
                margin: 0 }}>
                {selectedSkeleton === "Straight" ? "骨格がしっかりしていて、メリハリのある体型" :
                selectedSkeleton === "Wave" ? "柔らかく曲線的なラインが特徴の体型" : "骨感や関節が目立ちやすい体型"}
              </p>
            </div>
          )}
        </div>

        {/* 顔タイプ */}
        <div style={{
          borderTop: "1px solid #d9d9d9",
          paddingTop: "16px",
          marginBottom: "16px" }}>
          <p style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 12px 0" }}>顔タイプ</p>
          <div style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "12px" }}>
            {faceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFace(type)}
                style={{
                  height: "30px",
                  padding: "0 14px",
                  borderRadius: "15px",
                  border: "none",
                  backgroundColor: selectedFace === type ? "#9966cc" : "#f2f2f2",
                  color: selectedFace === type ? "#fff" : "#999",
                  fontSize: "12px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            ))}
          </div>
          {selectedFace && (
            <div style={{
              backgroundColor: "#f5eeff",
              borderRadius: "12px",
              padding: "12px 16px" }}>
              <p style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#9966cc",
                margin: "0 0 4px 0" }}>{selectedFace}
                （{selectedFace === "Cool" ? "クール" : selectedFace}）</p>
              <p style={{
                fontSize: "11px",
                color: "#999",
                margin: 0 }}>大人顔×直線。シャープでクールな印象の顔立ち</p>
            </div>
          )}
        </div>

        {/* 編集ボタン */}
        <button
          onClick={() => alert("パーソナル情報編集モーダルを開く（後で実装）")}
          style={{
            width: "100%",
            height: "48px",
            backgroundColor: "#e8407d",
            color: "#fff",
            border: "none",
            borderRadius: "24px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "24px" }}
        >
          パーソナル情報を編集する
        </button>

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
          { icon: "◈", label: "試着", path: "/" },
          { icon: "◉", label: "設定", path: "/personal" },
        ].map((item) => (
          <button key={item.label} onClick={() => router.push(item.path)}
          style={{
            background: "none",
            border: "none", cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px" }}>
            <span style={{
              fontSize: "18px",
              color: "#999" }}>{item.icon}</span>
            <span style={{
              fontSize: "10px",
              color: "#999" }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}