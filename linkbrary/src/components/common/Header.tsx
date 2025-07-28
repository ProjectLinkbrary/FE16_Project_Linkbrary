import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { SecondaryButton } from "./Button";

interface HeaderProps {
  isLoggedIn: boolean;
}

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
  margin-right: 10px;

  ${({ theme }) => theme.media.tablet} {
    margin-right: 24px;
  }
`;

const UserIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/images/ic_user.svg");
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

export default function Header({ isLoggedIn }: HeaderProps) {
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
              <UserInfo>
                <UserIcon />
                <UserName>이용섭</UserName>
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
