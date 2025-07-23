/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";

const ContentListSection = styled.section`
  margin-top: 16px;
`;

const CardList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;

  ${theme.media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  width: 100%;

  ${theme.media.tablet} {
    width: calc(50% - 0.75rem);
  }

  ${theme.media.desktop} {
    width: calc(33.333% - 1rem);
  }
`;

const CardThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FavoritesIcon = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 20px;
`;

const CardDescription = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NoFavortiesTitle = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 8rem 0;
`;

export default function ContentList({ list = [] }) {
  return (
    <ContentListSection>
      <CardList>
        {list.length > 0 ? (
          list.map(({ id, thumbnail, title, description, timeAgo, date }) => (
            <Card key={id}>
              <CardThumbnail>
                <img src={thumbnail} alt={title} />
                <FavoritesIcon>
                  <img src="/images/ic_favorites.svg" alt="favorites icon" />
                </FavoritesIcon>
              </CardThumbnail>

              <CardContent>
                <span>{timeAgo}</span>
                <h2>{title}</h2>
                <CardDescription>{description}</CardDescription>
                <span>{date}</span>
              </CardContent>
            </Card>
          ))
        ) : (
          <NoFavortiesTitle>등록된 즐겨찾기가 없습니다.</NoFavortiesTitle>
        )}
      </CardList>
    </ContentListSection>
  );
}
