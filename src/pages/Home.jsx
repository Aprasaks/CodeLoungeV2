import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/RoomDetail.css";

function RoomDetail() {
  const { id } = useParams();
  const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
  const room = rooms.find((r) => r.id === Number(id));

  const [activeTab, setActiveTab] = useState("html");
  const [viewMode, setViewMode] = useState("preview");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [hasRun, setHasRun] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const iframeRef = useRef();

  // 콘솔 로그 수신
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "log") {
        setConsoleLogs((prev) => [...prev, ...event.data.data]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 실행 버튼 클릭
  const handleRunClick = () => {
    setHasRun(true);
    setConsoleLogs([]);
    setRunKey((prev) => prev + 1);
  };

  // 콘솔용 JS-only 코드 생성
  const generateConsoleCode = () => {
    return `
      <html>
        <head>
          <style>
            body {
              background-color: #121212;
              color: white;
              font-size: 16px;
              padding: 1rem;
            }
          </style>
        </head>
        <body>
          <script>
            const originalLog = console.log;
            console.log = function(...args) {
              window.parent.postMessage({ type: 'log', data: args }, '*');
              originalLog.apply(console, args);
            };
            try {
              ${jsCode}
            } catch (e) {
              console.log("에러:", e.message);
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
        </div>
      </div>

      {/* 좌우 박스 */}
      <div className="room-content">
        {/* 왼쪽 코드 입력 영역 */}
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
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="HTML 코드를 입력하세요"
              />
            )}
            {activeTab === "css" && (
              <textarea
                className="code-input"
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                placeholder="CSS 코드를 입력하세요"
              />
            )}
            {activeTab === "js" && (
              <textarea
                className="code-input"
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                placeholder="JS 코드를 입력하세요"
              />
            )}
          </div>
        </div>

        {/* 오른쪽 미리보기/콘솔 영역 */}
        <div className="panel-wrapper">
          <div className="panel-header">
            <button
              className={`panel-button ${viewMode === "preview" ? "active" : ""}`}
              onClick={() => {
                setViewMode("preview");
                setHasRun(false);
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
            {viewMode === "console" && (
              <button className="run-button" onClick={handleRunClick}>
                실행
              </button>
            )}
          </div>

          <div className="right-panel">
            {/* 미리보기 iframe */}
            {viewMode === "preview" && (
              <iframe
                className="preview-frame"
                title="미리보기"
                srcDoc={`
                  <html>
                    <head><style>${cssCode}</style></head>
                    <body>
                      ${htmlCode}
                      <script>${jsCode}<\/script>
                    </body>
                  </html>
                `}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  backgroundColor: "#1e1e1e",
                }}
              />
            )}

            {/* 콘솔 iframe + 로그 */}
            {viewMode === "console" && hasRun && (
              <>
                <iframe
                  key={runKey}
                  ref={iframeRef}
                  title="콘솔 실행"
                  className="preview-frame"
                  srcDoc={generateConsoleCode()}
                  style={{
                    width: "100%",
                    height: "50%",
                    border: "none",
                    backgroundColor: "#1e1e1e",
                  }}
                />
                <div className="console-log-box">
                  {consoleLogs.length === 0 ? (
                    <p className="console-empty">콘솔 로그가 없습니다.</p>
                  ) : (
                    consoleLogs.map((log, index) => (
                      <div key={index} className="console-log">
                        {String(log)}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
