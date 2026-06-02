"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, email, password }),
      });
      if (!res.ok) {
        setError("ユーザー名またはメールアドレスが既に使われています");
        return;
      }
      router.push("/");
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
      alignItems: "center" }}>

      {/* ヘッダー */}
      <div style={{
        width: "100%",
        backgroundColor: "#fdf0f5",
        paddingTop: "60px",
        paddingBottom: "40px",
        paddingLeft: "40px" }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#e8407d",
          margin: 0 }}>アカウント作成</h1>
      </div>

      {/* フォーム */}
      <div style={{
        width: "100%",
        maxWidth: "390px",
        padding: "0 40px",
        marginTop: "40px" }}>

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
              color: "#212121"}}
          />
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "8px",
            fontWeight: "500"
          }}>
            メールアドレス
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div style={{ marginBottom: "24px" }}>
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

        {/* パスワード（確認） */}
        <div style={{ marginBottom: "32px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            color: "#999",
            marginBottom: "8px",
            fontWeight: "500"
          }}>パスワード（確認）
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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

        {/* 登録ボタン */}
        <button
          onClick={handleRegister}
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
          登録する
        </button>

        {/* ログインリンク */}
        <div style={{textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "13px", color: "#999", marginBottom: "4px" }}>すでにアカウントをお持ちの方</p>
          <a href="/" style={{ fontSize: "13px", color: "#e8407d", fontWeight: "500", textDecoration: "none" }}>
            ← ログインに戻る
          </a>
        </div>

      </div>
    </div>
  );
}