/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";
import { Link } from "../../pages/api/types";
import LinkCard from "./LinkCard";

const ContentListSection = styled.section`
  margin-top: 16px;
`;

const CardList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const NoFavortiesTitle = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 8rem 0;
`;

interface ContentListProps {
  list: Link[];
  onDelete: (id: number) => void;
}

export default function ContentList({ list, onDelete }: ContentListProps) {
  return (
    <ContentListSection>
      <CardList>
        {list.length > 0 ? (
          list.map((link) => (
            <LinkCard key={link.id} link={link} onDelete={onDelete} />
          ))
        ) : (
          <NoFavortiesTitle>등록된 즐겨찾기가 없습니다.</NoFavortiesTitle>
        )}
      </CardList>
    </ContentListSection>
  );
}
