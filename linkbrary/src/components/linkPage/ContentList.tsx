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

const NoFavortiesTitle = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  padding: 8rem 0;
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
              isFavorite={link.isFavorite}
              onDeleteRequest={onDeleteRequest}
              onEdit={onEdit}
              isMenuOpen={openMenuCardId === link.id}
              onToggleMenu={() => handleToggleMenu(link.id)}
              menuRef={(el) => (kebabRefs.current[link.id] = el)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <NoFavortiesTitle>등록된 즐겨찾기가 없습니다.</NoFavortiesTitle>
        )}
      </CardList>
    </ContentListSection>
  );
}
