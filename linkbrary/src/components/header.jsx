/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 120px;
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <LogoImg src="/images/logo.svg" alt="Linkbrary Logo" />
      </Logo>
      <Nav>
        <NavLink href="/">즐겨찾기</NavLink>
        <NavLink href="/linkpage">MyPage</NavLink>
      </Nav>
    </HeaderWrapper>
  );
}
