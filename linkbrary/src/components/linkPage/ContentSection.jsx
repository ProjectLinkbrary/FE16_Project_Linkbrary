/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme.js";
import { useState, useEffect } from "react";
import ContentList from "./ContentList.jsx";
import NoLinks from "./Nolinks.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import SearchBar from "./SearchBar.jsx";

const ContentSectionWrapper = styled.section`
  /* margin: 24px 0; */
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 1rem 0;

  ${theme.media.tablet} {
    margin: 2.5rem 0 1.5rem 0;
  }
  ${theme.media.desktop} {
    margin: 3rem 0 2rem 0;
  }
`;

const FolderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const FolderTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FolderActions = styled.div``;
const IconButton = styled.button``;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  margin: 4rem 0 4rem 0;
`;

const cardData = [
  {
    id: 1,
    thumbnail: "/images/thumnailimg.jpg",
    title: "이메일 자동화 정복하기",
    description: "ChatGPT + Gmail 확장으로 메일 지원 자동 응답서비스",
    timeAgo: "10 minutes ago",
    date: "2025.07.18",
  },
  {
    id: 2,
    thumbnail: "/images/thumnailimg.jpg",
    title: "Next.js 배우기",
    description: "React 기반 SSR 프레임워크를 익혀봅시다",
    timeAgo: "1 hour ago",
    date: "2025.07.17",
  },
  {
    id: 3,
    thumbnail: "/images/thumnailimg.jpg",
    title: "Emotion 스타일링",
    description: "CSS-in-JS 라이브러리로 쉽고 빠른 스타일링 방법",
    timeAgo: "3 hours ago",
    date: "2025.07.16",
  },
];

const defaultPageNumbers = ["<", 1, 2, 3, 4, 5, ">"];

export default function ContentSection() {
  // const [page, setPage] = useState(1);
  const [list, setList] = useState(cardData);

  // useEffect(() => {
  //   console.log("list 상태:", list);
  // }, []);

  return (
    <ContentSectionWrapper>
      <SearchBar />

      {list.length > 0 ? (
        <>
          <CategoryFilter />
          <ContentWrapper>
            <FolderTag>
              <FolderTitle>전체</FolderTitle>
              <FolderActions>
                <IconButton type="button">
                  <img src="/images/ic_share.svg" alt="공유" />
                </IconButton>
                <IconButton type="button">
                  <img src="/images/ic_btn.svg" alt="폴더 수정하기" />
                </IconButton>
                <IconButton type="button">
                  <img src="/images/ic_trash.svg" alt="폴더 삭제" />
                </IconButton>
              </FolderActions>
            </FolderTag>
          </ContentWrapper>

          <ContentList list={list} />

          <Pagination>
            {defaultPageNumbers.map((num) => (
              <button key={num} type="button" disabled>
                {num}
              </button>
            ))}
          </Pagination>
        </>
      ) : (
        <NoLinks />
      )}
    </ContentSectionWrapper>
  );
}
