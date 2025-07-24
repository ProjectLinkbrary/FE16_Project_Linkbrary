import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme.js";

export default function LoginFormLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 설명 박스 */}
      <div
        style={{
          flex: 1,
          padding: 40,
          color: "#fff",
          backgroundColor: "#1e1e1e",
          overflowY: "auto",
        }}
      >
        <h2>로그인 페이지("/login")</h2>
        <ul>
          <li>로그인 버튼 클릭 시 페이지 이동</li>
          <li>회원 가입하기 버튼 클릭 시 /signup 페이지 이동</li>
        </ul>
      </div>

      {/* 오른쪽 로그인 폼과 배경 */}
      <div
        style={{
          width: "1440px", // 보더 너비
          height: "982px", // 보더 높이
          backgroundImage: "url('/images/signup-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "1px solid red",
          opacity: 1,
          transform: "rotate(0deg)", // angle 0 deg 적용
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
