import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용
  const [isLogin, setIsLogin] = useState(true); // 로그인 / 회원가입 모드 전환

  // 로그인 상태: 이메일, 비밀번호
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 회원가입 상태: 닉네임, 이메일, 비밀번호
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    console.log("✅ 로그인 시도:");
    console.log("이메일:", loginEmail);
    console.log("비밀번호:", loginPassword);

    // 임시로 로그인 성공했다고 가정하고 페이지 이동
    navigate("/rooms"); // 나중에 rooms 페이지로 연결
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPassword) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    console.log("✅ 회원가입 시도:");
    console.log("닉네임:", signupName);
    console.log("이메일:", signupEmail);
    console.log("비밀번호:", signupPassword);

    // 여기선 실제 저장 안하고 상태만 확인
    setIsLogin(true); // 다시 로그인 화면으로 전환
  };

  return (
    <div className={`login-container ${isLogin ? "login-mode" : "signup-mode"}`}>
      <div className="form-wrapper">
        {/* 로그인 폼 */}
        <div className="form login-form">
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
          <p>
            계정이 없으신가요? <span onClick={() => setIsLogin(false)}>회원가입</span>
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="form signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button onClick={handleSignup}>회원가입</button>
          <p>
            이미 계정이 있으신가요? <span onClick={() => setIsLogin(true)}>로그인</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
