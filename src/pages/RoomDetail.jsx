import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/RoomDetail.css";
import { useNavigate } from "react-router-dom";

function RoomDetail() {
  const { id } = useParams();

  const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
  const room = rooms.find((r) => r.id === Number(id));

  const [activeTab, setActiveTab] = useState("html");
  const [viewMode, setViewMode] = useState("preview");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [hasRun, setHasRun] = useState(false);
  const [runKey, setRunKey] = useState(0); // iframe 강제 리렌더용
  const iframeRef = useRef();

  const handleRunClick = () => {
    setHasRun(true);
    setRunKey((prev) => prev + 1);
  };

  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/rooms"); // ✅ Rooms.jsx가 매핑된 경로로 이동
  };

  // 콘솔용 HTML 생성 함수
  const generateConsoleCode = () => {
    return `
      <html>
        <head>
          <style>
            body {
              background-color: #121212;
              color: #00FF00;
              font-family: monospace;
              padding: 1rem;
            }
          </style>
        </head>
        <body>
          <script>
            const originalLog = console.log;
            console.log = function(...args) {
              const logDiv = document.createElement('div');
              logDiv.textContent = args.join(' ');
              document.body.appendChild(logDiv);
              originalLog.apply(console, args);
            };
            try {
              ${jsCode}
            } catch (e) {
              console.log("오류:", e.message);
            }
          <\/script>
        </body>
      </html>
    `;
  };

  return (
    <div className="room-detail-container">
      {/* 상단 헤더 */}
      <div className="room-header">
        <div className="room-title">{room?.title || "코드방"}</div>
        <div className="chat-box">
          <div className="participant-info">
            <span className="participant-icon">👤</span>
            <span className="participant-count">1</span>
          </div>
          <button className="chat-button">채팅하기</button>
          <button className="exit-button" onClick={handleExit}>
            방 나가기
          </button>
        </div>
      </div>

      {/* 좌우 구조 */}
      <div className="room-content">
        {/* 왼쪽: 코드 입력 */}
        <div className="panel-wrapper">
          <div className="panel-header">
            {["html", "css", "js"].map((tab) => (
              <button
                key={tab}
                className={`panel-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="left-panel">
            {activeTab === "html" && (
              <textarea
                className="code-input"
                placeholder="HTML 입력"
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
              />
            )}
            {activeTab === "css" && (
              <textarea
                className="code-input"
                placeholder="CSS 입력"
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
              />
            )}
            {activeTab === "js" && (
              <textarea
                className="code-input"
                placeholder="JS 입력"
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* 오른쪽: 미리보기 / 콘솔 */}
        <div className="panel-wrapper">
          <div className="panel-header">
            <button
              className={`panel-button ${viewMode === "preview" ? "active" : ""}`}
              onClick={() => {
                setViewMode("preview");
                setHasRun(false); // 콘솔 초기화 방지
              }}
            >
              미리보기
            </button>
            <button
              className={`panel-button ${viewMode === "console" ? "active" : ""}`}
              onClick={() => setViewMode("console")}
            >
              콘솔
            </button>

            {/* 콘솔 모드일 때만 실행 버튼 */}
            {viewMode === "console" && (
              <button className="run-button" onClick={handleRunClick}>
                실행
              </button>
            )}
          </div>

          <div className="right-panel">
            {viewMode === "preview" && (
              <iframe
                title="미리보기"
                className="preview-frame"
                srcDoc={`
                  <html>
                    <head>
                      <style>${cssCode}</style>
                    </head>
                    <body>
                      ${htmlCode}
                      <script>${jsCode}<\/script>
                    </body>
                  </html>
                `}
              />
            )}

            {viewMode === "console" && hasRun && (
              <iframe
                key={runKey}
                title="콘솔 실행"
                className="preview-frame"
                srcDoc={generateConsoleCode()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
