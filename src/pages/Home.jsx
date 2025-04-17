//첫 시작 홈페이지 메인화면
import { useNavigate } from "react-router-dom"; //로그인 전환 라우터
import "../styles/Home.css";
import FeatureBox from "../components/FeatureBox";

const features = [
  {
    icon: "💬",
    title: "실시간 협업",
    description: "여러 명이 동시에 코드를 수정하고 즉시 결과를 볼 수 있어요.",
  },
  {
    icon: "📦",
    title: "다양한 코드방",
    description: "Todo 리스트부터 계산기까지 원하는 주제의 코드방을 만들 수 있어요.",
  },
  {
    icon: "⚡",
    title: "즉시 미리보기",
    description: "HTML/CSS/JS 결과를 실시간으로 바로 확인하세요.",
  },
];

function Home() {
  const navigate = useNavigate(); // 라우터 페이지 이동용 훅

  return (
    <div className="home-container">
      {/* 헤더 */}
      <header className="top-header">
        <div className="logo">CodeLounge</div>
        {/* 여기 로그인 버튼을 클릭하면 /login 으로 이동 */}
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
      </header>

      {/* 메인 */}
      <main>
        <section className="hero">
          <h1>
            Welcome to <span className="logo">CodeLounge</span>
          </h1>
          <p>실시간으로 함께 코딩하는 공간. 협업의 즐거움을 느껴보세요.</p>
          {/* 시작하기버튼으로만 코드룸 입장가능 */}
          <button className="btn-start" onClick={() => navigate("/rooms")}>
            시작하기 →
          </button>
        </section>

        <section className="features">
          <div className="feature">
            {features.map((item, index) => (
              <FeatureBox
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="home-footer">&copy; 2025 CodeLounge. All rights reserved.</footer>
    </div>
  );
}

export default Home;
