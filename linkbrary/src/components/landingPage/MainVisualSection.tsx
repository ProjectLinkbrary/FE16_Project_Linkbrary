import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "../common/Button";
import styled from "@emotion/styled";
import { fetchFolders, addFolder } from "../../pages/api/folder";
import { useEffect, useState } from "react";

const MainVisualWrapper = styled.div`
  width: 100%;
  background-color: #171717;
`;

const MainVisual = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  min-height: 608px;

  background-image: url("/images/bg_pc_mainvisual.png");
  background-repeat: no-repeat;
  background-position: bottom -50px center;
  background-size: cover;

  h1 {
    padding: 111px 0 32px;
    font-size: ${({ theme }) => theme.fontSize.fz32};
    line-height: ${({ theme }) => theme.lineHeight.lh120};
    color: ${({ theme }) => theme.color.white};
    font-family: "Pretendard";
    font-weight: 100;

    strong {
      font-weight: bold;
    }

    span {
      display: block;
    }
  }

  ${({ theme }) => theme.media.tablet} {
    height: 907px;
    background-position: bottom center;

    h1 {
      padding: 173px 0 32px;
      font-size: ${({ theme }) => theme.fontSize.fz40};

      span {
        display: none;
      }
    }
  }

  ${({ theme }) => theme.media.desktop} {
    height: 1040px;
    max-width: 1440px;
    margin: 0 auto;

    h1 {
      font-size: ${({ theme }) => theme.fontSize.fz56};
      padding: 173px 0 46px;
    }
  }
`;

export default function MainVisualSection() {
  return (
    <>
      <MainVisualWrapper>
        <MainVisual>
          <h1>
            <strong>세상의 모든 정보</strong>를 <br />
            쉽게 저장하고
            <span></span>
            관리해 보세요
          </h1>
          <PrimaryButton as="a" href="/links/${folderId}">
            링크 추가하기
          </PrimaryButton>
        </MainVisual>
      </MainVisualWrapper>
    </>
  );
}
