import styled from "@emotion/styled";
import Image from "next/image";

const KakaoLoginStyleButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.color.white};
  background-color: rgba(30, 30, 30, 0.8);
  padding: 12px 24px;
  border-radius: 16px;
`;

export default function KakaoLoginButton() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const REDIRECT_URI = "http://localhost:3000/auth/kakao";
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`;
  return (
    <KakaoLoginStyleButton href={kakaoAuthUrl}>
      소셜 로그인
      <Image
        src="/images/ic_kakaologin.svg"
        alt="카카오 아이콘"
        width={42}
        height={42}
      />
    </KakaoLoginStyleButton>
  );
}
