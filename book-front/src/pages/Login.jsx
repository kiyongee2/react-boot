import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      // JWT 저장
      localStorage.setItem("token", res.data.token);

      alert("로그인 성공!");

      // 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div style={{ width: "400px", margin: "60px auto", textAlign: "center" }}>
      <h1>🔐 로그인</h1>

      {/* 아이디 입력 */}
      <input
        type="text"
        placeholder="아이디(Username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      {/* 로그인 버튼 */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "18px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        로그인
      </button>

      {/* 회원가입 이동 */}
      <p style={{ marginTop: "20px" }}>
        계정이 없나요?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          회원가입
        </span>
      </p>
    </div>
  );
};

export default Login;
