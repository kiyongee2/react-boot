import { Link } from "react-router-dom";

const Header = () => {
  return(
    <div className="header">
      <Link to="/">KH-Lib</Link>
      <Link to="/booklist">도서 목록</Link>
    </div>
  )
}

 export default Header;