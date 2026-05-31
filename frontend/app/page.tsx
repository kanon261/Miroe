"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, password }),
      });
      if (!res.ok) {
        setError("ユーザー名またはパスワードが間違っています");
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      router.push("/home");
    } catch (e) {
      setError("通信エラーが発生しました");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      {/* ヘッダー */}
      <div style={{
        width: "100%",
        backgroundColor: "#fdf0f5",
        paddingTop: "60px",
        paddingBottom: "40px",
        display: "flex",
        justifyContent: "center"
      }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#e8407d",
          margin: 0 }}>Miroé</h1>
      </div>

      {/* フォーム */}
      <div style={{
        width: "100%",
        maxWidth: "390px",
        padding: "0 40px",
        marginTop: "40px"
      }}>

        {/* ユーザー名 */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "8px",
            fontWeight: "500"
          }}>
            ユーザー名
          </label>
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#f2f2f2",
              border: "none",
              borderRadius: "12px",
              padding: "0 16px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              color: "#212121"
            }}
          />
        </div>

        {/* パスワード */}
        <div style={{ marginBottom: "32px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "8px",
            fontWeight: "500"
          }}>
            パスワード
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#f2f2f2",
              border: "none",
              borderRadius: "12px",
              padding: "0 16px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
              color: "#212121"
            }}
          />
        </div>

        {/* エラーメッセージ */}
        {error && (
          <p style={{
            color: "#e8407d",
            fontSize: "13px",
            marginBottom: "16px",
            textAlign: "center"
          }}>
            {error}
          </p>
        )}

        {/* ログインボタン */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#e8407d",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          ログイン
        </button>

        {/* 新規登録リンク */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{
            fontSize: "13px",
            color: "#999",
            marginBottom: "4px" }}>アカウントをお持ちでない方</p>
          <a href="/register" style={{
            fontSize: "13px",
            color: "#e8407d",
            fontWeight: "500",
            textDecoration: "none"
          }}>
            新規登録はこちら →
          </a>
        </div>
    </div>
    </div>
  );
}