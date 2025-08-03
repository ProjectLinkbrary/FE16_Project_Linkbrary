/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";
import { Link } from "../../pages/api/types";
import LinkCard from "./LinkCard";
import { useRef, useEffect, useState } from "react";

const ContentListSection = styled.section``;

const CardList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 4rem;
  }
`;

const NoFavortiesTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem 0 8rem 0;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;
const Images = styled.img`
  width: 45%;
`;

interface ContentListProps {
  list: Link[];
  onDeleteRequest: (link: Link) => void;
  onEdit: (link: Link) => void;
  onToggleFavorite: (link: Link) => void;
}

export default function ContentList({
  list,
  onDeleteRequest,
  onEdit,
  onToggleFavorite,
}: ContentListProps) {
  const [openMenuCardId, setOpenMenuCardId] = useState<number | null>(null);
  const kebabRefs = useRef<Record<number, HTMLUListElement | null>>({});

  const handleToggleMenu = (id: number) => {
    setOpenMenuCardId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuCardId === null) return;

      const currentRef = kebabRefs.current[openMenuCardId];
      if (currentRef && !currentRef.contains(event.target as Node)) {
        setOpenMenuCardId(null); // 메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuCardId]);

  return (
    <ContentListSection>
      <CardList>
        {list.length > 0 ? (
          list.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onDeleteRequest={onDeleteRequest}
              onEdit={onEdit}
              isMenuOpen={openMenuCardId === link.id}
              onToggleMenu={() => handleToggleMenu(link.id)}
              menuRef={(el) => (kebabRefs.current[link.id] = el)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <NoFavortiesTitle>
            <Images src="/images/nolink.png" alt="비어있음" />
            <h2>등록된 즐겨찾기가 없습니다.</h2>
          </NoFavortiesTitle>
        )}
      </CardList>
    </ContentListSection>
  );
}
