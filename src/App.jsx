// App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈페이지 */}
        <Route path="/" element={<Home />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 코드룸 페이지 */}
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
