"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CosmeticCreateModal from "../../components/modals/CosmeticCreateModal";

const categories = ["すべて", "リップ", "アイシャドウ", "チーク"];

const categoryMap: { [key: string]: string } = {
  すべて: "",
  リップ: "lip",
  アイシャドウ: "eye",
  チーク: "cheek",
};

const statusColors: { [key: string]: string } = {
  owned: "#e8407d",
  wishlist: "#9966cc",
  tried: "#33b280",
};

const statusLabels: { [key: string]: string } = {
  owned: "持ってる",
  wishlist: "欲しい",
  tried: "試した",
};

const categoryLabels: { [key: string]: string } = {
  lip: "リップ",
  eye: "アイシャドウ",
  cheek: "チーク",
};

type Cosmetic = {
  id: number;
  name: string;
  brand: string;
  category: string;
  color_code: string;
  status: string;
};

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCosmetics = () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  fetch("http://localhost:8000/cosmetics/", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setCosmetics(data);
      }
    })
    .catch((e) => console.error(e));
};


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchCosmetics();
  }, [router]);

  const filtered = cosmetics.filter((c) => {
    if (selectedCategory === "すべて") return true;
    return c.category === categoryMap[selectedCategory];
  });

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      maxWidth: "390px",
      margin: "0 auto" }}>

      {/* ヘッダー */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #d9d9d9" }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#e8407d",
          margin: 0 }}>Miroé</h1>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px" }}>
          <span style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#212121"
          }}>Kanon</span>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#f5c0d7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center" }}>
            <span style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#e8407d" }}>K</span>
          </div>
        </div>
      </div>

      {/* カテゴリタブ */}
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "12px 20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
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

      {/* コスメ一覧 */}
      <div style={{
        flex: 1,
        padding: "0 20px",
        overflowY: "auto",
        paddingBottom: "80px" }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center",
            marginTop: "60px",
            color: "#999",
            fontSize: "14px" }}>
            <p>コスメが登録されていません</p>
            <p>右下の＋ボタンから追加してください</p>
          </div>
        ) : (
          filtered.map((cosmetic) => (
            <div
              key={cosmetic.id}
              onClick={() => router.push(`/cosmetics/${cosmetic.id}`)}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #d9d9d9",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "12px",
                cursor: "pointer",
                backgroundColor: "#fff" }}
            >
              <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: cosmetic.color_code || "#f2f2f2",
                flexShrink: 0 }} />
              <div style={{ marginLeft: "16px" }}>
                <p style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "#212121",
                  margin: "0 0 4px 0"
                }}>
                  {cosmetic.name}
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "#999",
                  margin: "0 0 8px 0"
                }}>
                  {cosmetic.brand}
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{
                    height: "28px",
                    padding: "0 10px",
                    borderRadius: "14px",
                    backgroundColor: statusColors[cosmetic.status],
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    {statusLabels[cosmetic.status]}
                  </span>
                  <span style={{
                    height: "28px",
                    padding: "0 10px",
                    borderRadius: "14px",
                    backgroundColor: "#f2f2f2",
                    color: "#999",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    {categoryLabels[cosmetic.category]}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 追加ボタン */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "68px",
          right: "calc(50% - 195px + 20px)",
          width: "56px",
          height: "56px",
          borderRadius: "28px",
          backgroundColor: "#e8407d",
          border: "none",
          color: "#fff",
          fontSize: "28px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        +
      </button>

      {/* コスメ登録モーダル */}
      {showModal && (
        <CosmeticCreateModal
          onClose={() => setShowModal(false)}
          onCreated={fetchCosmetics}
        />
      )}

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
        justifyContent: "space-around"
      }}>
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
            <span style={{ fontSize: "18px", color: "#999" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", color: "#999" }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}