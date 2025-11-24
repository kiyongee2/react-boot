import '../App.css';
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);      // 현재 페이지
  const [totalPages, setTotalPages] = useState(0);
  const [type, setType] = useState("all");     // 검색 유형 (all/title/author)
  const [keyword, setKeyword] = useState("");  // 검색어
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 상태가 있으면 그 값을 사용
  useEffect(() => {
    if (location.state) {
      if (location.state.page !== undefined) setPage(location.state.page);
      if (location.state.keyword !== undefined) setKeyword(location.state.keyword);
      if (location.state.type !== undefined) setType(location.state.type);
    }
  }, [location.state]);

  // 목록 불러오기 (검색 + 페이징)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get(
          `/books/pages?page=${page}&keyword=${keyword}&type=${type}`
        );
        setBooks(res.data.content); 
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("도서 목록 불러오기 실패:", error);
      }
    };
    fetchBooks();
  }, [page, keyword, type]);

  // 도서 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.delete(`/books/${id}`);
      alert("삭제 완료!");

      // 삭제 후 다시 목록 조회
      const res = await api.get(
        `/books/pages?page=${page}&keyword=${keyword}&type=${type}`
      );
      setBooks(res.data.content);  //res.data 도 가능
      setTotalPages(res.data.totalPages);

    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>📚 도서 목록</h1>

      {/* 검색 영역 */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(0); // 검색 기준 변경 시 페이지 초기화
          }}
          style={{ padding: "5px", marginRight: "10px" }}
        >
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="author">저자</option>
        </select>

        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "5px", width: "200px", marginRight: "10px" }}
        />

        <button onClick={() => setPage(0)}>검색</button>
      </div>

      {/* 도서 등록 */}
      <Link to="/add" style={{ textDecoration: "none" }}>
        <button style={{ marginBottom: "20px" }}>+ 도서 등록</button>
      </Link>

      {/* 목록 출력 */}
      {books.length === 0 ? (
        <p>등록된 도서가 없습니다.</p>
      ) : (
        <table className="table-list">
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>
              <th>제목</th>
              <th>저자</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  <Link
                    to={`/books/${book.id}`}
                    state={{ page, keyword, type }}
                  >
                    {book.title}
                  </Link>
                </td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleDelete(book.id)}>삭제</button>
                  <button
                    onClick={() =>
                      navigate(`/books/${book.id}/edit`, {
                        state: { page, keyword, type },
                      })
                    }
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 페이지 네비게이션 */}
      <div style={{ marginTop: "20px" }}>

        {/* ◀ 이전 */}
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          style={{
            margin: "3px",
            padding: "5px 10px",
            backgroundColor: page === 0 ? "#eee" : "#ccc",
            cursor: page === 0 ? "not-allowed" : "pointer"
          }}
        >
          ◀ 이전
        </button>

        {/* 숫자 페이지 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            style={{
              margin: "3px",
              padding: "5px 10px",
              backgroundColor: page === index ? "#333" : "#ccc",
              color: page === index ? "#fff" : "#000"
            }}
          >
            {index + 1}
          </button>
        ))}

        {/* 다음 ▶ */}
        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          style={{
            margin: "3px",
            padding: "5px 10px",
            backgroundColor: page === totalPages - 1 ? "#eee" : "#ccc",
            cursor: page === totalPages - 1 ? "not-allowed" : "pointer"
          }}
        >
          다음 ▶
        </button>

      </div>
    </div>
  );
};

export default BookList;
