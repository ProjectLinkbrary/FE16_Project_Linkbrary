import Link from "next/link";
import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" passHref>
      <StyledAnchor className={className}>
        <img src="/images/logo.svg" alt="Linkbrary 로고" />
      </StyledAnchor>
    </Link>
  );
}

const StyledAnchor = styled.a`
  display: block;
`;
