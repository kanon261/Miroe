"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const categories = ["リップ", "アイシャドウ", "チーク"];

const colorPalette: { [key: string]: string[] } = {
  リップ: ["#D93350", "#700D20", "#F56680", "#FFB3C1", "#5C0A17", "#FFD6DC"],
  アイシャドウ: ["#CC8050", "#7A4F35", "#F2D9C0", "#4A2518", "#E8C9A0", "#2D1510"],
  チーク: ["#F29999", "#FFB3B3", "#E07070", "#F5C0C0", "#D46060", "#FFCCCC"],
};

export default function TryOnPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("リップ");
  const [selectedColor, setSelectedColor] = useState("#D93350");
  const [opacity, setOpacity] = useState(0.7);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [router]);

  const colors = colorPalette[selectedCategory];

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
            margin: 0 }}>メイク試着</h1>
      </div>

      {/* 顔プレビューエリア */}
      <div style={{
        margin: "16px 20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "20px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden" }}>

        {/* 顔のシルエット */}
        <div style={{
            position: "relative",
            width: "150px",
            height: "180px" }}>
          {/* 顔 */}
          <div style={{
            width: "150px",
            height: "160px",
            borderRadius: "50% 50% 45% 45%",
            backgroundColor: "#F5DFD0",
            position: "absolute",
            top: 0 }} />

          {/* アイシャドウ（左） */}
          {selectedCategory === "アイシャドウ" && (
            <>
              <div style={{
                position: "absolute",
                top: "48px",
                left: "22px",
                width: "40px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: selectedColor,
                opacity: opacity * 0.6 }} />
              <div style={{
                position: "absolute",
                top: "48px",
                right: "22px",
                width: "40px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: selectedColor,
                opacity: opacity * 0.6
              }} />
            </>
          )}

          {/* 目（左） */}
          <div style={{
            position: "absolute",
            top: "55px",
            left: "28px",
            width: "32px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "#2D1F1F"
          }} />
          <div style={{
            position: "absolute",
            top: "59px",
            left: "34px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#fff"
          }} />

          {/* 目（右） */}
          <div style={{
            position: "absolute",
            top: "55px",
            right: "28px",
            width: "32px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "#2D1F1F"
          }} />
          <div style={{
            position: "absolute",
            top: "59px",
            right: "34px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#fff"
          }} />

          {/* チーク（左） */}
          {selectedCategory === "チーク" && (
            <>
              <div style={{
                position: "absolute",
                top: "88px",
                left: "8px",
                width: "40px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: selectedColor,
                opacity: opacity * 0.5
              }} />
              <div style={{
                position: "absolute",
                top: "88px",
                right: "8px",
                width: "40px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: selectedColor,
                opacity: opacity * 0.5
              }} />
            </>
          )}

          {/* リップ */}
          <div style={{
            position: "absolute",
            top: "108px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            height: "20px",
            borderRadius: "10px",
            backgroundColor: selectedCategory === "リップ" ? selectedColor : "#C47A7A",
            opacity: selectedCategory === "リップ" ? opacity : 0.8
          }} />
        </div>

        {/* アップロードヒント */}
        <p style={{
            fontSize: "12px",
            color: "#999",
            marginTop: "12px" }}>写真をアップロードして試着</p>
      </div>

      {/* アップロードボタン */}
      <div style={{ padding: "0 20px", marginBottom: "16px" }}>
        <button
          onClick={() => alert("写真認識機能は個人開発フェーズで実装予定です")}
          style={{
            width: "100%",
            height: "44px",
            backgroundColor: "#fdf0f5",
            color: "#e8407d",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer" }}
        >
          📷  写真をアップロード
        </button>
      </div>

      <div style={{ padding: "0 20px" }}>

        {/* カテゴリタブ */}
        <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedColor(colorPalette[cat][0]);
              }}
              style={{
                height: "32px",
                padding: "0 14px",
                borderRadius: "16px",
                border: "none",
                backgroundColor: selectedCategory === cat ? "#e8407d" : "#f2f2f2",
                color: selectedCategory === cat ? "#fff" : "#999",
                fontSize: cat === "アイシャドウ" ? "11px" : "13px",
                fontWeight: selectedCategory === cat ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* カラーパレット */}
        <p style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 12px 0" }}>カラーを選ぶ</p>
        <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px" }}>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: color,
                cursor: "pointer",
                border: selectedColor === color ? "3px solid #e8407d" : "3px solid transparent",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* 透け感スライダー */}
        <p style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#212121",
            margin: "0 0 8px 0" }}>透け感</p>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          style={{
            width: "100%",
            accentColor: "#e8407d",
            marginBottom: "20px"
          }}
        />

        {/* 保存ボタン */}
        <button
          onClick={() => alert("試着結果を保存しました！（後で実装）")}
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
            marginBottom: "12px"
          }}
        >
          試着結果を保存
        </button>

        <p style={{ fontSize: "11px", color: "#999", textAlign: "center" }}>
          ※ 写真認識機能は個人開発フェーズで実装予定
        </p>
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
          { icon: "◉", label: "設定", path: "/personal" },
        ].map((item) => (
          <button key={item.label} onClick={() => router.push(item.path)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px"
          }}>
            <span style={{
                fontSize: "18px",
                color: item.path === "/try-on" ? "#e8407d" : "#999" }}>{item.icon}</span>
            <span style={{
                fontSize: "10px",
                color: item.path === "/try-on" ? "#e8407d" : "#999" }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}