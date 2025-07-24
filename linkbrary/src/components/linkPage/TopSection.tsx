/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useState } from "react";

const TopSectionWrapper = styled.section`
  background: url("/images/bg_linkpage.png") no-repeat center center / cover;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  overflow: hidden;

  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    height: 368px;
  }
`;

const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  ${({ theme }) => theme.media.tablet} {
    gap: 2.5rem;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;

  ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 52px;

  ${({ theme }) => theme.media.tablet} {
    width: 35.563rem;
    height: 70px;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 40rem;
  }
`;

const LinkIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

const LinkInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem 3rem 0.5rem 3rem;

  border-radius: 100px;
  border: none;
  font-size: 1rem;

  color: #b3b3b3;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color.gray50};
`;

const LightButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  background: none;
  border: none;

  color: #000000;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 50px;
  background-color: #ffffff;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    height: 3.125rem;
    padding: 8px 30px;
  }
`;

export default function TopSection() {
  return (
    <TopSectionWrapper>
      <LinkWrapper>
        <Title>세상의 모든 정보, 필요한 순간에</Title>
        <InputWrapper>
          <LinkIcon src="/images/ic_link.svg" alt="링크 아이콘" />
          <LinkInput placeholder="링크를 추가해 보세요" />
          <LightButton>추가하기</LightButton>
        </InputWrapper>
      </LinkWrapper>
    </TopSectionWrapper>
  );
}
