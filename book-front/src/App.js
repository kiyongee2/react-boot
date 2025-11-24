import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookAdd from "./components/BookAdd";
import BookDetail from "./components/BookDetail";
import BookEdit from "./components/BookEdit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./layout/Header";

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookAdd />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
