"use client";

import { useRouter } from "next/navigation";

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

// ダミーデータ（後でAPIから取得する）
const dummyCosmetic = {
  id: 1,
  name: "ルージュ アリュール",
  brand: "CHANEL",
  category: "lip",
  color_code: "#D93350",
  status: "owned",
  rating: 4,
};

export default function CosmeticDetailPage() {
  const router = useRouter();
  const cosmetic = dummyCosmetic;

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < cosmetic.rating ? "★" : "☆"
  ).join("");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", maxWidth: "390px", margin: "0 auto" }}>

      {/* ヘッダー（カラー背景） */}
      <div style={{ backgroundColor: "#fdf0f5", paddingBottom: "20px" }}>
        <div style={{ padding: "16px 20px" }}>
          <button
            onClick={() => router.back()}
            style={{ background: "none", border: "none", fontSize: "20px", color: "#e8407d", cursor: "pointer", padding: 0 }}
          >
            ←
          </button>
        </div>

        {/* カラーサークル */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "16px" }}>
          <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: cosmetic.color_code }} />
          <p style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>{cosmetic.color_code}</p>
        </div>
      </div>

      {/* コスメ情報 */}
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#212121", margin: "0 0 8px 0" }}>{cosmetic.name}</h1>
        <p style={{ fontSize: "14px", color: "#999", margin: "0 0 12px 0" }}>{cosmetic.brand}</p>

        {/* タグ */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <span style={{ height: "28px", padding: "0 10px", borderRadius: "14px", backgroundColor: "#fdf0f5", color: "#e8407d", fontSize: "12px", fontWeight: "500", display: "flex", alignItems: "center" }}>
            {categoryLabels[cosmetic.category]}
          </span>
          <span style={{ height: "28px", padding: "0 10px", borderRadius: "14px", backgroundColor: statusColors[cosmetic.status], color: "#fff", fontSize: "12px", fontWeight: "500", display: "flex", alignItems: "center" }}>
            {statusLabels[cosmetic.status]}
          </span>
        </div>

        <div style={{ borderTop: "1px solid #d9d9d9", paddingTop: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", color: "#999", fontWeight: "500", margin: "0 0 8px 0" }}>評価</p>
          <p style={{ fontSize: "22px", color: "#e8407d", margin: 0 }}>{stars}</p>
        </div>

        <div style={{ borderTop: "1px solid #d9d9d9", paddingTop: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", color: "#999", fontWeight: "500", margin: "0 0 8px 0" }}>カラーコード</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: cosmetic.color_code }} />
            <p style={{ fontSize: "16px", fontWeight: "500", color: "#212121", margin: 0 }}>{cosmetic.color_code}</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #d9d9d9", paddingTop: "16px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => alert("編集モーダルを開く（後で実装）")}
              style={{ flex: 1, height: "48px", backgroundColor: "#fdf0f5", color: "#e8407d", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}
            >
              ✏  編集
            </button>
            <button
              onClick={() => alert("削除確認（後で実装）")}
              style={{ flex: 1, height: "48px", backgroundColor: "#ffeded", color: "#d9334d", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}
            >
              🗑  削除
            </button>
          </div>
        </div>
      </div>

      {/* ナビバー */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "390px", height: "48px", backgroundColor: "#fff", borderTop: "1px solid #d9d9d9", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        {[{ icon: "⊟", label: "ホーム", path: "/home" }, { icon: "◎", label: "傾向", path: "/trends" }, { icon: "◈", label: "試着", path: "/" }, { icon: "◉", label: "設定", path: "/" }].map((item) => (
          <button key={item.label} onClick={() => router.push(item.path)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
            <span style={{ fontSize: "18px", color: "#999" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", color: "#999" }}>{item.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}