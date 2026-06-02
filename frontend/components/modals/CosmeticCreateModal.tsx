"use client";

import React, { useState } from "react";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CosmeticCreateModal({ onClose, onCreated }: Props): React.ReactElement {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("lip");
  const [colorCode, setColorCode] = useState("#FF0000");
  const [status, setStatus] = useState("owned");
  const [rating, setRating] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!name) {
      setError("コスメ名は必須です");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cosmetics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          brand: brand || null,
          category,
          color_code: colorCode,
          status,
          rating,
        }),
      });
      if (!res.ok) {
        setError("登録に失敗しました");
        return;
      }
      onCreated();
      onClose();
    } catch (e) {
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 100 }}>
      <div style={{
        width: "390px",
        backgroundColor: "#fff",
        borderRadius: "20px 20px 0 0",
        padding: "24px 20px 40px",
        maxHeight: "80vh",
        overflowY: "auto" }}>

        {/* ヘッダー */}
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px" }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#212121",
            margin: 0 }}>コスメを登録</h2>
          <button onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#999",
            cursor: "pointer" }}>✕</button>
        </div>

        {/* コスメ名 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>コスメ名 *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：ルージュ アリュール"
            style={{
                width: "100%",
                height: "44px",
                backgroundColor: "#f2f2f2",
                border: "none",
                borderRadius: "10px",
                padding: "0 14px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#212121" }}
          />
        </div>

        {/* ブランド */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>ブランド</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="例：CHANEL"
            style={{
                width: "100%",
                height: "44px",
                backgroundColor: "#f2f2f2",
                border: "none",
                borderRadius: "10px",
                padding: "0 14px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#212121"
              }}
          />
        </div>

        {/* カテゴリ */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>カテゴリ *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            {[{ value: "lip", label: "リップ" },
            { value: "eye", label: "アイシャドウ" },
            { value: "cheek", label: "チーク" }].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "18px",
                  border: "none",
                  backgroundColor: category === cat.value ? "#e8407d" : "#f2f2f2",
                  color: category === cat.value ? "#fff" : "#999",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* カラーコード */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>カラーコード</label>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px" }}>
            <input
              type="color"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                padding: 0 }}
            />
            <input
              type="text"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              style={{
                flex: 1,
                height: "44px",
                backgroundColor: "#f2f2f2",
                border: "none",
                borderRadius: "10px",
                padding: "0 14px",
                fontSize: "14px",
                outline: "none",
                color: "#212121"
              }}
            />
          </div>
        </div>

        {/* ステータス */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>ステータス *</label>
          <div style={{ display: "flex", gap: "8px" }}>
            {[{ value: "owned", label: "持ってる" },
            { value: "wishlist", label: "欲しい" },
            { value: "tried", label: "試した" }].map((s) => (
              <button
                key={s.value}
                onClick={() => setStatus(s.value)}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "18px",
                  border: "none",
                  backgroundColor: status === s.value ? "#e8407d" : "#f2f2f2",
                  color: status === s.value ? "#fff" : "#999",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 評価 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "6px"
          }}>評価</label>
          <div style={{
            display: "flex",
            gap: "8px"
          }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "#e8407d" : "#d9d9d9"
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <p style={{
            color: "#e8407d",
            fontSize: "13px",
            marginBottom: "16px",
            textAlign: "center"
          }}>{error}</p>
        )}

        {/* 登録ボタン */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#e8407d",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer" }}
        >
          登録する
        </button>

      </div>
    </div>
  );
}