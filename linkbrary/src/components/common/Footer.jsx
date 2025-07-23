import styled from "@emotion/styled";
import Link from "next/link";

const FooterWrapper = styled.div`
  height: 160px;
  position: relative;
  background-color: ${({ theme }) => theme.color.gray20};
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 28px;
  margin: 0 auto;

  @media (min-width: 1280px) {
    width: 1040px;
    padding: 32px 0;
  }
`;

const Copyright = styled.div`
  position: absolute;
  bottom: 28px;
  color: ${({ theme }) => theme.color.gray40};
  font-size: ${({ theme }) => theme.fontSize.fz16};

  @media (min-width: 768px) {
    position: static;
  }
`;

const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSize.fz16};
  color: ${({ theme }) => theme.color.gray50};
  a {
    margin-right: 30px;
  }
`;

const SNS = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    margin-right: 12px;
  }
`;
const SrOnly = styled.span`
  position: absolute;
  display: block;
  text-indent: -9999px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <Copyright>©codeit - 2025</Copyright>
        <Menu>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </Menu>
        <SNS>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ic_facebook.svg" alt="페이스북" />
            <SrOnly>Facebook</SrOnly>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ic_twiter.svg" alt="트위터" />
            <SrOnly> Twitter</SrOnly>
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ic_youtube.svg" alt="유튜브" />
            <SrOnly>Youtube</SrOnly>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/ic_instagram.svg" alt="인스타그램" />
            <SrOnly> instagram</SrOnly>
          </a>
        </SNS>
      </FooterContent>
    </FooterWrapper>
  );
}
