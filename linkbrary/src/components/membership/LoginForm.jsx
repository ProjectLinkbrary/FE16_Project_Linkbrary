import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 이메일 유효성 검사
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("8자 이상 작성해 주세요.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    if (password !== "password123") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    router.push("/");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/images/signup-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 40,
          backgroundColor: "rgba(18, 18, 18, 0.85)",
          borderRadius: 12,
          color: "#fff",
          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        {/* 로고 버튼 */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Link
            href="/"
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Linkbrary
          </Link>
        </div>

        {/* 회원가입 안내 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 30,
            fontSize: 14,
          }}
        >
          <span>회원이 아니신가요?</span>
          <Link
            href="/signup"
            style={{
              color: "#6D6AFE",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            회원 가입하기
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* 이메일 입력 */}
          <label
            style={{ display: "flex", flexDirection: "column", fontSize: 14 }}
          >
            이메일
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="codeit@codeit.com"
              style={{
                height: 54,
                borderRadius: 200,
                border: emailError ? "1px solid red" : "1px solid #757575",
                backgroundColor: "#2C2C2C",
                padding: "0 20px",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
                marginTop: 6,
              }}
              required
            />
            {emailError && (
              <span style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {emailError}
              </span>
            )}
          </label>

          {/* 비밀번호 입력 */}
          <label
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              fontSize: 14,
            }}
          >
            비밀번호
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호를 입력하세요"
              style={{
                height: 54,
                borderRadius: 200,
                border: passwordError ? "1px solid red" : "1px solid #757575",
                backgroundColor: "#2C2C2C",
                padding: "0 50px 0 20px",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
                marginTop: 6,
              }}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? (
                <img
                  src="/images/ic_eyes-on.svg"
                  alt="비밀번호 숨기기"
                  width={24}
                  height={24}
                />
              ) : (
                <img
                  src="/images/ic_eyes-off.svg"
                  alt="비밀번호 보이기"
                  width={24}
                  height={24}
                />
              )}
            </button>
            {passwordError && (
              <span style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {passwordError}
              </span>
            )}
          </label>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            style={{
              height: 54,
              borderRadius: 200,
              border: "none",
              backgroundColor: "#fff",
              color: "#121212",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
