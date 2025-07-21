/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";
import ContentList from "components/linkPage/ContentList"; // ✅ 재사용할 리스트 컴포넌트

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

const FavoriteListWrapper = styled.div``;

export default function FavoritesPage() {
  return (
    <>
      <FavoritesSectionWrapper>
        <LinkWrapper>
          <Title>⭐즐겨찾기</Title>
        </LinkWrapper>
      </FavoritesSectionWrapper>

      <FavoriteListWrapper>
        <ContentList />
      </FavoriteListWrapper>
    </>
  );
}
