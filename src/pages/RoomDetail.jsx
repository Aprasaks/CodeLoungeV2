import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/RoomDetail.css";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

function RoomDetail() {
  const { id } = useParams();

  const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
  const room = rooms.find((r) => r.id === Number(id));

  //고유키
  const storageKey = `roomCode_${id}`;

  const [activeTab, setActiveTab] = useState("html");
  const [viewMode, setViewMode] = useState("preview");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [hasRun, setHasRun] = useState(false);
  const [runKey, setRunKey] = useState(0); // iframe 강제 리렌더용
  const iframeRef = useRef();
  const [showChat, setShowChat] = useState(false);

  //코드불러오기
  useEffect(() => {
    const savedCode = JSON.parse(localStorage.getItem(storageKey));
    if (savedCode) {
      setHtmlCode(savedCode.html || "");
      setCssCode(savedCode.css || "");
      setJsCode(savedCode.js || "");
    }
  }, [id]);

  //자동저장하기
  useEffect(() => {
    const timeout = setTimeout(() => {
      const codeToSave = {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      };
      localStorage.setItem(storageKey, JSON.stringify(codeToSave));
    }, 500); // 0.5초 뒤 저장 (입력 중복 방지)

    return () => clearTimeout(timeout); // 타이머 초기화
  }, [htmlCode, cssCode, jsCode, storageKey]);

  //참여자 자동등록
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const participantsKey = `participants_${id}`;
    if (!currentUser) return;

    const saved = JSON.parse(localStorage.getItem(participantsKey)) || [];

    if (!saved.includes(currentUser.id)) {
      const updated = [...saved, currentUser.id];
      localStorage.setItem(participantsKey, JSON.stringify(updated));
      setParticipants(updated);
    } else {
      setParticipants(saved);
    }
  }, [id]);

  //채팅입력
  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender: "나", // 추후 로그인 사용자명으로 대체 가능
      text: chatInput,
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput(""); // 입력창 초기화
  };

  //채팅창입력 상태
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleRunClick = () => {
    setHasRun(true);
    setRunKey((prev) => prev + 1);
  };

  const navigate = useNavigate();
  //퇴장 방나가기

  const handleExit = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const participantsKey = `participants_${id}`;

    if (currentUser) {
      const saved = JSON.parse(localStorage.getItem(participantsKey)) || [];
      const updated = saved.filter((name) => name !== currentUser.id);
      localStorage.setItem(participantsKey, JSON.stringify(updated));
    }

    navigate("/rooms");
  };

  //채팅창 토글
  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
  };

  //프로필
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);

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
            <span
              className="participant-icon"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              👤
            </span>

            <span className="participant-count">1</span>
          </div>
          <button className="chat-button" onClick={handleToggleChat}>
            채팅하기
          </button>
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
              <Editor
                height="100%"
                defaultLanguage="html"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                }}
              />
            )}

            {activeTab === "css" && (
              <Editor
                height="100%"
                defaultLanguage="css"
                value={cssCode}
                onChange={(value) => setCssCode(value || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                }}
              />
            )}

            {activeTab === "js" && (
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={jsCode}
                onChange={(value) => setJsCode(value || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                }}
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
      {showChat && (
        <div className="chat-panel">
          <div className="chat-header">
            채팅
            <button className="close-chat" onClick={handleToggleChat}>
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="console-empty">채팅이 없습니다.</div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <strong>{msg.sender}</strong>: {msg.text}
                </div>
              ))
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="채팅을 입력하세요"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleSendMessage(); // 엔터 전송
              }}
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
      )}

      {/* 프로필 보여주기 */}
      {showParticipants && (
        <div className="participant-panel">
          <div className="participant-header">
            참여자 목록
            <button className="close-chat" onClick={() => setShowParticipants(false)}>
              ✕
            </button>
          </div>
          <div className="participant-list">
            {participants.map((name, index) => (
              <div key={index} className="participant-item">
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomDetail;
