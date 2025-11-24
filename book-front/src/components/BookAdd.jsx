import React, { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

const BookAdd = () => {
  const [title, setTitle] = useState(""); // 도서명 상태
  const [author, setAuthor] = useState(""); // 저자명 상태
  const navigate = useNavigate();  // 페이지 이동 훅

  // 도서 등록 처리
  const handleSubmit = async () => {
    if (!title.trim() || !author.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      await api.post("/books", { title, author }); // 도서 등록 API 호출
      alert("도서 등록 완료!");
      navigate("/"); // 등록 후 도서 목록 페이지로 이동
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 등록</h1>
      <input
        type="text"
        placeholder="도서명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="저자명"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <button onClick={handleSubmit}>등록</button>
      <button onClick={() => navigate("/")}>취소</button>
    </div>
  );
};

export default BookAdd;
