/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ContentList from "../components/linkPage/ContentList";
import { instance } from "../pages/api/instance";
import { Link } from "../pages/api/types";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const FavoritesSectionWrapper = styled.section`
  background: url("/images/bg_linkpage.png") no-repeat center center / cover;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  overflow: hidden;
  width: 100%;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;

  ${({ theme }) => theme.media.tablet} {
    font-size: 32px;
  }
`;

const FavoriteListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0 0 0;
`;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 4rem 0;
`;

const defaultPageNumbers: (string | number)[] = ["<", 1, 2, 3, 4, 5, ">"];

interface FavoritesProps {
  initialList: Link[]; // 처음에 서버에서 받은 즐겨찾기 리스트 초기값
  onFavoriteToggle: (id: number) => void; // 즐겨찾기 토글 이벤트 전달용 함수
}

export default function Favorites({ initialList, onFavoriteToggle }: FavoritesProps) {
  const [favoriteList, setFavoriteList] = useState<Link[]>(initialList);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 페이지 변경 핸들러
  const onPageClick = (pageNum: number) => {
    setPage(pageNum);
  };

 const fetchFavorites = async () => {
  try {
    const res = await instance.get<Link[]>("/favorites", {
      params: { page, pageSize },
    });
    setFavoriteList(res.data);
  } catch (error) {
    console.error("즐겨찾기 리스트 조회 실패", error);
  }
};

  const handleFavoriteToggle = async (id: number) => {
    try {
      await instance.post("/favorite", { id });
      setFavoriteList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("즐겨찾기 토글 실패", error);
    }
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <FavoritesSectionWrapper>
        <LinkWrapper>
          <Title>⭐즐겨찾기</Title>
        </LinkWrapper>
      </FavoritesSectionWrapper>

      <FavoriteListWrapper>
        <ContentList
          list={favoriteList}
          onDelete={(id) => {
            handleFavoriteToggle(id);
            onFavoriteToggle(id);
          }}
          onFavoriteToggle={handleFavoriteToggle}
        />

        <Pagination>
          {defaultPageNumbers.map((num) =>
            typeof num === "number" ? (
              <button key={num} onClick={() => onPageClick(num)}>
                {num}
              </button>
            ) : (
              <button key={num} disabled>
                {num}
              </button>
            )
          )}
        </Pagination>
      </FavoriteListWrapper>
      <Footer />
    </>
  );
}
