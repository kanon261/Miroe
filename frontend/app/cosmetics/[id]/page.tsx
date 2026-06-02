"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

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
  rating: number;
};

export default function CosmeticDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [cosmetic, setCosmetic] = useState<Cosmetic | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/"); return; }
    fetch(`http://localhost:8000/cosmetics/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCosmetic(data);
        setEditName(data.name);
        setEditBrand(data.brand || "");
        setEditStatus(data.status);
        setEditRating(data.rating || 0);
      })
      .catch((e) => console.error(e));
  }, [id, router]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleDelete = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/cosmetics/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) router.push("/home");
  else alert("削除に失敗しました");
};


  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8000/cosmetics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editName,
        brand: editBrand || null,
        category: cosmetic?.category,
        color_code: cosmetic?.color_code,
        status: editStatus,
        rating: editRating,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCosmetic(updated);
      setIsEditing(false);
    } else {
      alert("更新に失敗しました");
    }
  };

  if (!cosmetic) return
  <div style={{
    padding: "40px",
    textAlign: "center",
    color: "#999" }}>読み込み中...</div>;

  const stars = Array.from({ length: 5 }, (_, i) => i < cosmetic.rating ? "★" : "☆").join("");

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      maxWidth: "390px",
      margin: "0 auto",
      paddingBottom: "60px" }}>

      {/* ヘッダー */}
      <div style={{ backgroundColor: "#fdf0f5", paddingBottom: "20px" }}>
        <div style={{ padding: "16px 20px" }}>
          <button onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#e8407d",
            cursor: "pointer",
            padding: 0 }}>←</button>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "16px" }}>
          <div style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: cosmetic.color_code }} />
          <p style={{ fontSize: "13px", color: "#999", marginTop: "8px" }}>{cosmetic.color_code}</p>
        </div>
      </div>

      {/* コスメ情報 */}
      <div style={{ padding: "20px" }}>
        {isEditing ? (
          <>
            <input value={editName} onChange={(e) => setEditName(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                backgroundColor: "#f2f2f2",
                border: "none",
                borderRadius: "10px",
                padding: "0 14px",
                fontSize: "16px",
                color: "#212121",
                marginBottom: "12px",
                boxSizing: "border-box"
              }} />
            <input value={editBrand} onChange={(e) => setEditBrand(e.target.value)}
              placeholder="ブランド"
              style={{
                width: "100%",
                height: "44px",
                backgroundColor: "#f2f2f2",
                border: "none",
                borderRadius: "10px",
                padding: "0 14px",
                fontSize: "14px",
                color: "#212121",
                marginBottom: "12px",
                boxSizing: "border-box"
              }} />
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              {[{ value: "owned", label: "持ってる" },
              { value: "wishlist", label: "欲しい" },
              { value: "tried", label: "試した" }].map((s) => (
                <button key={s.value} onClick={() => setEditStatus(s.value)}
                  style={{
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "18px",
                    border: "none",
                    backgroundColor: editStatus === s.value ? "#e8407d" : "#f2f2f2",
                    color: editStatus === s.value ? "#fff" : "#999",
                    fontSize: "13px",
                    cursor: "pointer"
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setEditRating(star)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= editRating ? "#e8407d" : "#d9d9d9"
                  }}>
                  ★
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setIsEditing(false)}
                style={{
                  flex: 1,
                  height: "48px",
                  backgroundColor: "#f2f2f2",
                  color: "#999",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "15px",
                  cursor: "pointer"
                }}>
                キャンセル
              </button>
              <button onClick={handleEdit}
                style={{
                  flex: 1,
                  height: "48px",
                  backgroundColor: "#e8407d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}>
                保存
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#212121",
              margin: "0 0 8px 0" }}>{cosmetic.name}</h1>
            <p style={{
              fontSize: "14px",
              color: "#999",
              margin: "0 0 12px 0"
            }}>
              {cosmetic.brand}
            </p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <span style={{
                height: "28px",
                padding: "0 10px",
                borderRadius: "14px",
                backgroundColor: "#fdf0f5",
                color: "#e8407d",
                fontSize: "12px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center"
              }}>
                {categoryLabels[cosmetic.category]}
              </span>
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
            </div>
            <div style={{
              borderTop: "1px solid #d9d9d9",
              paddingTop: "16px",
              marginBottom: "16px"
            }}>
              <p style={{ fontSize: "14px", color: "#999", margin: "0 0 8px 0" }}>評価</p>
              <p style={{ fontSize: "22px", color: "#e8407d", margin: 0 }}>{stars}</p>
            </div>
            <div style={{
              borderTop: "1px solid #d9d9d9",
              paddingTop: "16px",
              marginBottom: "16px"
            }}>
              <p style={{ fontSize: "14px", color: "#999", margin: "0 0 8px 0" }}>カラーコード</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor: cosmetic.color_code
                }} />
                <p style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#212121",
                  margin: 0
                }}>
                  {cosmetic.color_code}
                </p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #d9d9d9", paddingTop: "16px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => setIsEditing(true)}
                  style={{
                    flex: 1,
                    height: "48px",
                    backgroundColor: "#fdf0f5",
                    color: "#e8407d",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}>
                  ✏  編集
                </button>
                <button onClick={() => setShowDeleteModal(true)}
                  style={{
                    flex: 1,
                    height: "48px",
                    backgroundColor: "#ffeded",
                    color: "#d9334d",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "500",
                    cursor: "pointer"
                  }}>
                  🗑  削除
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showDeleteModal && (
  <div style={{
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100, padding: "0 32px" }}>
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "24px",
      padding: "32px 24px",
      width: "100%",
      maxWidth: "320px",
      textAlign: "center" }}>
      <div style={{fontSize: "40px", marginBottom: "12px" }}>🗑️</div>
      <h2 style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#212121",
        margin: "0 0 8px 0" }}>コスメを削除しますか？</h2>
      <p style={{
        fontSize: "13px",
        color: "#999",
        margin: "0 0 4px 0" }}>「{cosmetic.name}」を削除します。</p>
      <p style={{
        fontSize: "13px",
        color: "#999",
        margin: "0 0 24px 0" }}>この操作は取り消せません。</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => setShowDeleteModal(false)}
          style={{
            flex: 1,
            height: "48px",
            backgroundColor: "#f2f2f2",
            color: "#999",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          キャンセル
        </button>
        <button
          onClick={handleDelete}
          style={{
            flex: 1,
            height: "48px",
            backgroundColor: "#d9334d",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          削除する
        </button>
      </div>
    </div>
  </div>
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
        {[{ icon: "⊟", label: "ホーム", path: "/home" },
        { icon: "◎", label: "傾向", path: "/trends" },
        { icon: "◈", label: "試着", path: "/try-on" },
        { icon: "◉", label: "設定", path: "/personal" }].map((item) => (
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