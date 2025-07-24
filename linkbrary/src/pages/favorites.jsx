/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";
import ContentList from "components/linkPage/ContentList"; // ✅ 재사용할 리스트 컴포넌트
import Header from "components/common/Header";
import Footer from "components/common/Footer";

const FavoritesSectionWrapper = styled.section`
  background: url("/images/linkpagebg.png") no-repeat center center / cover;
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

  ${theme.media.tablet} {
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

const defaultPageNumbers = ["<", 1, 2, 3, 4, 5, ">"];

export default function Favorites() {
  return (
    <>
      <Header />
      <FavoritesSectionWrapper>
        <LinkWrapper>
          <Title>⭐즐겨찾기</Title>
        </LinkWrapper>
      </FavoritesSectionWrapper>

      <FavoriteListWrapper>
        <ContentList />
        <Pagination>
          {defaultPageNumbers.map((num) => (
            <button key={num} type="button" disabled>
              {num}
            </button>
          ))}
        </Pagination>
      </FavoriteListWrapper>
      <Footer />
    </>
  );
}
