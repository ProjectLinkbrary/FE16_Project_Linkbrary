import Link from "next/link";
import styled from "@emotion/styled";

export default function Logo({ className }) {
  return (
    <LogoWrapper href="/" className={className}>
      <img src="/images/logo.svg" alt="Linkbrary 로고" />
    </LogoWrapper>
  );
}

const LogoWrapper = styled(Link)`
  display: block;
`;
