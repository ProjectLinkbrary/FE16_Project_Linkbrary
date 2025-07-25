import Image from "next/image";
import styled from "@emotion/styled";
import type { AnchorHTMLAttributes } from "react";

const LogoWrapper = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
  position: relative;
  display: block;
  width: 88px;
  height: 33px;

  ${({ theme }) => theme.media.tablet} {
    width: 133px;
    height: 33px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export default function Logo() {
  return (
    <LogoWrapper href="/">
      <Image
        src="/images/logo.svg"
        alt="Linkbrary 로고"
        fill
        style={{ objectFit: "contain" }}
      />
    </LogoWrapper>
  );
}
