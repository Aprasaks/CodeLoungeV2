// App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈페이지 */}
        <Route path="/" element={<Home />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 나중에 방 페이지 등도 추가 가능 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
