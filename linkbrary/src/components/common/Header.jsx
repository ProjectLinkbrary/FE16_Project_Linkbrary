import styled from "@emotion/styled";
import Logo from "./Logo.jsx";
import { SecondaryButton } from "./Button.jsx";

const HeaderContainer = styled.header`
  position: absolute;
  padding: 16px 32px;
  background-color: #000;

  @media (min-width: 768px) {
    padding: 45px 0;
  }

  @media (min-width: 1024px) {
    padding: 32px 0;
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

  @media (min-width: 768px) {
    width: 1040px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <HeaderLogo />
        <NavMenu>
          <SecondaryButton href="/login">로그인</SecondaryButton>
        </NavMenu>
      </Nav>
    </HeaderContainer>
  );
}
