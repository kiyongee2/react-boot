import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api.js";

// 도서 수정 컴포넌트
const BookEdit = () => {
  const {id} = useParams(); // URL 파라미터에서 도서 ID 추출
  const [title, setTitle] = useState(""); // 도서명 상태
  const [author, setAuthor] = useState(""); // 저자명 상태
  const navigate = useNavigate();  // 페이지 이동 훅

  // 수정할 도서 정보 불러오기
  React.useEffect(() => {
    const fetchBook = async () => {
      try { 
        const res = await api.get(`/books/${id}`); // 도서 정보 API 호출
        setTitle(res.data.title); // 도서명 상태 설정
        setAuthor(res.data.author); // 저자명 상태 설정
      } catch (error) {
        console.error("도서 정보 불러오기 실패:", error);
      } 
    };
    fetchBook(); // 함수 호출
  }, [id]);
  
  // 도서 수정 처리 
  const handleUpdate = async () => {
    try {
      await api.put(`/books/${id}`, { title, author }); // 도서 수정 API 호출 
      alert("도서 수정 완료!");
      navigate("/"); // 수정 후 도서 목록 페이지로 이동
    } catch (error) {
      console.error("수정 실패:", error);
    }
  }

  return (
    <>
    {/* <div> 수정 페이지 작업 중...</div> */}
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 수정</h1>
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
      <button onClick={handleUpdate}>저장</button>
      <button onClick={() => navigate("/")}>취소</button>
    </div>
    </>
  );
} 

export default BookEdit;