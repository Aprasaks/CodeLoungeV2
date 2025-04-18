import "../styles/Rooms.css"; // 스타일은 따로 관리할 예정
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Rooms() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState(""); // 방 제목
  const [desc, setDesc] = useState(""); // 방 설명
  const [rooms, setRooms] = useState([]); // 방 목록
  const navigate = useNavigate();

  //첫화면 로딩 새로고침
  useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
    setRooms(savedRooms);
  }, []);

  const handleCardClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleCreateRoom = () => {
    if (!title.trim()) return alert("방 제목을 입력해주세요!");

    const newRoom = {
      id: Date.now(),
      title,
      desc,
      img: `https://picsum.photos/300/200?sig=${Date.now()}`, // 랜덤 이미지
    };

    //로컬에 저장
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    localStorage.setItem("codeRooms", JSON.stringify(updatedRooms)); // ✅ 로컬에 저장

    setRooms(updatedRooms); // ✅ 상태 동기화

    // 입력값 초기화 + 폼 닫기
    setTitle("");
    setDesc("");
    setShowForm(false);
  };

  return (
    <div className="rooms-container">
      <h1>코드방 목록</h1>

      {/* 방 리스트 */}
      <div className="room-list">
        {rooms.map((room) => (
          <div
            className="room-card"
            key={room.id}
            onClick={() => handleCardClick(room.id)} // ✅ 클릭 이벤트
          >
            <img src={room.img} className="room-image" alt="방 이미지" />
            <div className="room-title">{room.title}</div>
            <div className="room-desc">{room.desc}</div>
          </div>
        ))}
      </div>

      {/* 폼 토글 버튼 */}
      <button className="create-room-btn" onClick={toggleForm}>
        ➕ 새 코드방 만들기
      </button>

      {/* 방 생성 폼 */}
      {showForm && (
        <div className="room-form">
          <input
            type="text"
            placeholder="방 제목"
            className="room-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="방 설명"
            className="room-input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="submit-room-btn" onClick={handleCreateRoom}>
            방 만들기
          </button>
        </div>
      )}
    </div>
  );
}

export default Rooms;
