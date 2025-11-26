import { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");  // 토큰 변수를 의존성으로 사용

  // 로그인 사용자 정보 조회
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null)); // 인증 실패 → 비로그인 처리
  }, [token]);

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "15px",
        background: "#f3f3f3",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 왼쪽 메뉴 */}
      <div>
        <Link to="/" style={{ marginRight: "15px", textDecoration: "none" }}>
          📚 도서 목록
        </Link>
        <Link to="/add" style={{ marginRight: "15px", textDecoration: "none" }}>
          ➕ 도서 등록
        </Link>
      </div>

      {/* 오른쪽 사용자 영역 */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>
              👤 {user.fullname} 님 환영합니다
            </span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ marginRight: "15px", textDecoration: "none" }}
            >
              로그인
            </Link>

            <Link
              to="/register"
              style={{ marginRight: "15px", textDecoration: "none" }}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;