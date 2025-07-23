import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "./Logo.jsx";
import { SecondaryButton } from "./Button.jsx";

const HeaderContainer = styled.header`
  width: 100%;
  position: absolute;
  padding: 16px 32px;
  background-color: #000;

  @media (min-width: 768px) {
    padding: 45px 32px;
  }

  @media (min-width: 1024px) {
    padding: 32px 32px;
  }
`;

const HeaderLogo = styled(Logo)`
  width: 88px;

  @media (min-width: 768px) {
    width: 133px;
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

const UserIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/images/ic_user.svg");
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.fz14};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.fz16};
  }
`;

const FavoriteButton = styled(SecondaryButton)`
  margin-right: 24px;
  padding-left: 30px;
  background-image: url("/images/ic_fav.svg");
  background-position: left center;
`;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <HeaderContainer>
      <Nav>
        <HeaderLogo />
        <NavMenu>
          {isLoggedIn ? (
            <>
              <FavoriteButton href="/favorite">즐겨찾기</FavoriteButton>
              <UserInfo>
                <UserIcon />
                <UserName>이용섭</UserName>
              </UserInfo>
            </>
          ) : (
            <SecondaryButton href="/login">로그인</SecondaryButton>
          )}
        </NavMenu>
      </Nav>
    </HeaderContainer>
  );
}
