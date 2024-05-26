import React, { useState } from 'react';
import kakaoLoginImg from '../assets/kakao_login.png';
import naverLoginImg from '../assets/naver_login.png';
import googleLoginImg from '../assets/google_login.png';
import logoImg from '../assets/logo.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    // 로그인 로직 추가
  };

  const handleSignup = () => {
    alert('회원가입 페이지로 이동합니다.');
    // 실제로는 회원가입 페이지로 이동하는 코드를 추가해야 합니다.
  };

  // 소셜 로그인 링크 설정
  const REST_API_KEY = '카카오 REST API 키';
  const REDIRECT_URI = '카카오 리디렉트 URI';
  const STATE = 'kakao';
  const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${STATE}`;

  const NAVER_CLIENT_ID = '네이버 클라이언트 ID';
  const NAVER_REDIRECT_URI = '네이버 리디렉트 URI';
  const naverLoginLink = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;

  const GOOGLE_CLIENT_ID = '구글 클라이언트 ID';
  const GOOGLE_REDIRECT_URI = '구글 리디렉트 URI';
  const googleLoginLink = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginLink;
  };

  const handleNaverLogin = () => {
    window.location.href = naverLoginLink;
  };

  const handleGoogleLogin = () => {
    window.location.href = googleLoginLink;
  };

  return (
    <div className="login-container">
      <img src={logoImg} alt="Logo" className="logo" />
      <div className="login-form">
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleSignup}>Signup</button>
        <div className="social-login-buttons">
          <button type="button" className="social-login" onClick={handleKakaoLogin}>
            <img src={kakaoLoginImg} alt="Kakao Login" />
          </button>
          <button type="button" className="social-login" onClick={handleNaverLogin}>
            <img src={naverLoginImg} alt="Naver Login" />
          </button>
          <button type="button" className="social-login" onClick={handleGoogleLogin}>
            <img src={googleLoginImg} alt="Google Login" />
          </button>
        </div>
      </div>
      <footer>
        객체패러다임 팀프로젝트 19학번 임익주 19학번 조성익
      </footer>
    </div>
  );
};

export default Login;
