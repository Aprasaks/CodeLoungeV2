import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 로그인 상태
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 회원가입 상태
  const [signupName, setSignupName] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // ✅ 로그인 함수
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // ⬇️ 저장된 유저 목록 불러오기
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ⬇️ 입력한 이메일/비밀번호와 일치하는 유저 찾기
    const matchedUser = users.find(
      (user) => user.id === loginEmail && user.password === loginPassword
    );

    if (!matchedUser) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      return;
    }

    // ✅ 로그인 성공 시 유저 정보 저장 (선택 사항)
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    // 로그인성공하더라도 무조건 첫페이지
    navigate("/");
  };

  // ✅ 회원가입 함수
  const handleSignup = () => {
    if (!signupName || !signupId || !signupPassword) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    // ⬇️ 새로운 유저 정보 생성
    const newUser = {
      name: signupName,
      id: signupId,
      password: signupPassword,
    };

    // ⬇️ 기존 유저 목록 불러오기
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ⬇️ 중복 이메일 방지
    const alreadyExists = users.some((u) => u.email === signupEmail);
    if (alreadyExists) {
      alert("이미 사용 중인 아이디입니다.");
      return;
    }

    // ✅ 유저 목록에 추가 후 저장
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("회원가입이 완료되었습니다. 로그인 해주세요.");
    setIsLogin(true); // 로그인 화면으로 전환
  };

  return (
    <div className={`login-container ${isLogin ? "login-mode" : "signup-mode"}`}>
      <div className="form-wrapper">
        {isLogin ? (
          <div className="form login-form">
            <h2>Sign In</h2>
            <input
              type="text"
              placeholder="ID"
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
        ) : (
          <div className="form signup-form">
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <input
              type="text"
              placeholder="ID"
              value={signupId}
              onChange={(e) => setSignupId(e.target.value)}
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
        )}
      </div>
    </div>
  );
}

export default Login;
