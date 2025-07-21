/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import { useState, useEffect } from "react";
import ContentList from "./ContentList.jsx";
import NoLinks from "./Nolink.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import SearchBar from "./SearchBar.jsx";

const ContentSectionWrapper = styled.section`
  height: 400px;
  margin: 24px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const IconButtonList = styled.ul`
  display: flex;
  gap: 12px;
`;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
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

export default function ContentSection() {
  // const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("list 상태:", list);
  }, []);

  return (
    <ContentSectionWrapper>
      <SearchBar />

      {list.length > 0 ? (
        <>
          <CategoryFilter />
          <ContentWrapper>
            <TitleBox>
              <Title>유용한 글</Title>
              <img src="/images/ic_btn.svg" alt="아이콘" />
            </TitleBox>
            <IconButtonList>
              <li>
                <img src="/images/ic_share.svg" alt="공유" />
              </li>
              <li>
                <img src="/images/ic_trash.svg" alt="휴지통" />
              </li>
            </IconButtonList>
          </ContentWrapper>

          <ContentList list={list} />
          <Pagination>1 2 3 4 5</Pagination>
        </>
      ) : (
        <NoLinks />
      )}
    </ContentSectionWrapper>
  );
}
