import { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");  // ⬅ 토큰 변수를 의존성으로 사용

  // 로그인 사용자 정보 조회
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // 토큰 없으면 로그인 안 된 상태

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data); // { username, fullname, role }
      })
      .catch(() => {
        setUser(null);
      });
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

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/api";

// const Header = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState(null);

//   // 로그인 사용자 정보 불러오기
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setUsername(null);
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/auth/me"); // 사용자 정보 API 필요
//         setUsername(res.data.username);
//       } catch (err) {
//         console.error("사용자 정보 불러오기 실패:", err);
//         setUsername(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   // 로그아웃 기능
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     alert("로그아웃되었습니다.");
//     setUsername(null);
//     navigate("/");
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         padding: "15px 25px",
//         background: "#333",
//         color: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: "30px"
//       }}
//     >
//       {/* 로고 또는 홈 링크 */}
//       <div style={{ fontSize: "20px", fontWeight: "bold" }}>
//         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//           📚 Book System
//         </Link>
//       </div>

//       <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//         {username ? (
//           <>
//             <span>👤 {username} 님</span>
//             <button
//               onClick={handleLogout}
//               style={{
//                 padding: "5px 12px",
//                 cursor: "pointer",
//                 backgroundColor: "#ff6666",
//                 border: "none",
//                 color: "white",
//                 borderRadius: "4px"
//               }}
//             >
//               로그아웃
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               style={{
//                 padding: "5px 12px",
//                 cursor: "pointer",
//                 backgroundColor: "#4CAF50",
//                 border: "none",
//                 color: "white",
//                 borderRadius: "4px"
//               }}
//             >
//               로그인
//             </button>
//             <button
//               onClick={() => navigate("/register")}
//               style={{
//                 padding: "5px 12px",
//                 cursor: "pointer",
//                 backgroundColor: "#2196F3",
//                 border: "none",
//                 color: "white",
//                 borderRadius: "4px"
//               }}
//             >
//               회원가입
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
