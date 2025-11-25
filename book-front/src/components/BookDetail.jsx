import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../api/api";
import dayjs from "dayjs";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { page = 0, keyword = "", type = "all" } = location.state || {};

  // 🔹 로그인 사용자 정보 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null)); // 인증 실패 → 비로그인 처리
  }, []);

  // 🔹 도서 상세 정보
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("도서 상세 정보 오류:", error);
      }
    };
    fetchBookDetail();
  }, [id]);

  // 🔹 리뷰 목록
  const loadReviews = async () => {
    const res = await api.get(`/reviews/${id}`);
    setReviews(res.data);
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  // 🔹 리뷰 등록
  const handleReviewSubmit = async () => {
    if (!content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      await api.post("/reviews", { content, bookId: id });
      setContent("");
      loadReviews();
    } catch (err) {
      console.log("리뷰 등록 실패:", err);
    }
  };

  return (
    <div style={{ width: "60%", margin: "50px auto" }}>
      <h1>📖 도서 상세보기</h1>

      <div style={{ textAlign: "left", lineHeight: "1.8" }}>
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>제목:</strong> {book.title}</p>
        <p><strong>저자:</strong> {book.author}</p>
        {book.regDate && (
          <p>
            <strong>등록일:</strong> {dayjs(book.regDate).format("YYYY-MM-DD HH:mm")}
          </p>
        )}
      </div>

      <hr />

      {/* 🔹 리뷰 작성 (로그인 한 경우만 표시) */}
      <h2>리뷰 작성</h2>

      {user ? (
        <div>
          <input
            type="text"
            value={user.fullname}
            readOnly
            style={{ width: "30%", marginRight: "10px", padding: "7px" }}
          />

          <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "60%", padding: "7px" }}
          />

          <button
            onClick={handleReviewSubmit}
            style={{ marginLeft: "10px" }}
          >
            등록
          </button>
        </div>
      ) : (
        <p style={{ color: "gray" }}>
          리뷰 작성은 <strong>로그인 후</strong> 가능합니다.
        </p>
      )}

      <hr />

      {/* 🔹 리뷰 목록 */}
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
};

export default BookDetail;
