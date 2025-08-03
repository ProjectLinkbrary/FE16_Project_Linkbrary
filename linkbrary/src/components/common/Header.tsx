import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { SecondaryButton } from "./Button";

interface HeaderProps {
  isLoggedIn: boolean;
}

const LoginButton = styled.div`
  background-color: #2c2c2c;
  color: #fff;
  width: 95px;
  height: 49px;
  padding: 12px 24px;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-right: 10px;
`;

const HeaderContainer = styled.header`
  width: 100%;
  position: absolute;
  padding: 16px 32px;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    padding: 45px 32px;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 100%;
    padding: 32px 32px;
  }
`;

const Nav = styled.nav`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1280px) {
    width: 1040px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.fz14};
`;

const FavoriteButton = styled(SecondaryButton)`
  margin-right: 15px;

  ${({ theme }) => theme.media.tablet} {
    margin-right: 8px; // 너무 붙지 않게만 최소 간격
  

  }
`;

// 사용자 아이콘 (로그인 시 오른쪽 상단에 표시됨)
// background-image 속성은 현재 비활성화됨
const UserIcon = styled.div`
  width: 20px;
  height: 20px;
  /* background-image: url("/images/ic_user.svg"); */
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserName = styled.span`
  display: none;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.fz14};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.fz16};
    display: block;
  }
`;

export default function Header({}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nameId, setNameId] = useState<string>("");

  /*토큰에서 이름 꺼내서 넣기*/
  useEffect(() => {
    const stored = localStorage.getItem("LinkbraryData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNameId(parsed.nameId || "");
    }
  }, []);

  useEffect(() => {
    try {
      const data = localStorage.getItem("LinkbraryData");
      if (!data) return;

      const parsed = JSON.parse(data);
      if (parsed.accessToken) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("로컬스토리지 파싱 오류:", err);
    }
  }, []);
  return (
    <HeaderContainer>
      <Nav>
        <Logo />
        <NavMenu>
  {isLoggedIn ? (
    <>
      <FavoriteButton as="a" href="/favorite">
        ⭐ 즐겨찾기
      </FavoriteButton>
      <Link href="/login" passHref>
        <LoginButton as="div">로그인</LoginButton>
      </Link>
      <UserInfo>
        <UserIcon />
        {/* <UserName>이용섭</UserName> */}
      </UserInfo>
    </>
  ) : (
    <SecondaryButton as="a" href="/login">
      로그인
    </SecondaryButton>
  )}
</NavMenu>
      </Nav>
    </HeaderContainer>
  );
}
