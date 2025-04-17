import "../styles/Rooms.css"; // 스타일은 따로 관리할 예정

function Rooms() {
  return (
    <div className="rooms-container">
      <h1>코드방 목록</h1>

      {/* 방 목록 */}
      <div className="room-list">
        <div className="room-card">
          <img
            src={`https://picsum.photos/300/200?sig=${Math.floor(Math.random() * 1000)}`}
            className="room-image"
            alt="방 이미지"
          />

          <div className="room-title">JS 기초 스터디</div>
          <div className="room-desc">함께 공부해요!</div>
        </div>
        <div className="room-card">🎨 CSS 레이아웃 연습</div>
        <div className="room-card">🧠 알고리즘 토론방</div>
      </div>

      {/* 방 생성 버튼 */}
      <button className="create-room-btn">➕ 새 코드방 만들기</button>
    </div>
  );
}

export default Rooms;
