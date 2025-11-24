import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !fullname.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        username,
        password,
        fullname,
      });

      alert("회원가입 성공! 로그인해주세요.");

      // 회원가입 후 로그인 페이지로 이동
      navigate("/login");

    } catch (err) {
      console.error("회원가입 실패:", err);

      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={{ width: "400px", margin: "60px auto", textAlign: "center" }}>
      <h1>📝 회원가입</h1>

      {/* 아이디 */}
      <input
        type="text"
        placeholder="아이디(username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      {/* 이름 */}
      <input
        type="text"
        placeholder="이름(fullname)"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      {/* 비밀번호 */}
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

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "18px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        회원가입
      </button>

      <p>
        이미 계정이 있나요?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          로그인
        </span>
      </p>
    </div>
  );
};

export default Register;
