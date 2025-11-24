import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../api/api";
import dayjs from "dayjs";

const BookDeatail = () => {
  const { id } = useParams(); // URL 파라미터에서 도서 ID 추출
  const [book, setBook] = useState({}); // 도서 정보 상태
  const [reviews, setReviews] = useState([]);
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate(); // 페이지 이동 훅
  const location = useLocation();
  const { page = 0, keyword = "", type = "all" } = location.state || {};

  // 도서 상세 정보 불러오기
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await api.get(`/books/${id}`); // 도서 상세 정보 API 호출
        setBook(res.data); // 상태 업데이트
      } catch (error) {
        console.error("도서 상세 정보 불러오기 실패:", error);
      }
    };
    fetchBookDetail(); // 함수 호출
  }, [id]); // id가 변경될 때마다 실행

  // 리뷰 목록 조회
  const loadReviews = async () => {
    const res = await api.get(`/reviews/${id}`);
    setReviews(res.data);
  }

  useEffect(() => {
    loadReviews();
  }, [id]);

  // 리뷰 등록
  const handleReviewSubmit = async () => {
    if(!writer.trim() || !content.trim()){
      alert("작성자와 내용을 입력하세요.");
      return;
    }

    try{
      await api.post("/reviews", {content, bookId: id});
      setContent("");
      loadReviews();
    }catch(err){
      console.log("리뷰 등록 실패:", err);
    }
  }

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 상세보기</h1>
      <div style={{ textAlign: "left", lineHeight: "1.8" }}>
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>제목:</strong> {book.title}</p>
        <p><strong>저자:</strong> {book.author}</p>
        {book.regDate && (
          <p>
            <strong>등록일: </strong>
            {dayjs(book.regDate).format("YYYY-MM-DD HH:mm")}
          </p>
        )}
      </div>
      <hr />

      {/* 리뷰 작성 */}
      <h2>리뷰 작성</h2>
      <input 
        type="text" 
        placeholder="작성자"
        value={writer}
        onChange={(e) => setWriter(e.target.value)}
        style={{width: "30%", marginRight: "10px", padding: "7px"}}
      />
      <input 
        type="text" 
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{width: "60%", padding: "7px"}}
      />
      <button onClick={handleReviewSubmit} style={{marginLeft: "10px"}}>
        등록
      </button>
      <hr />

      {/* 리뷰 목록 */}
      {/* {reviews.length === 0 ? (
        <p>등록된 리뷰가 없습니다.</p>
      ) : ( */}
      {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            <p>
              <strong>{r.writer}</strong>  
              <span style={{ color: "#888", marginLeft: "10px" }}>
                {dayjs(r.regDate).format("YYYY-MM-DD HH:mm")}
              </span>
            </p>
            <p>{r.content}</p>
          </div>
        ))}

      <button 
        onClick={() => navigate("/", { state: { page, keyword, type } })}
      >
        목록으로
      </button>
    </div>
  );
}

export default BookDeatail;