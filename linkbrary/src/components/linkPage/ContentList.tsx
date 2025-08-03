/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
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

const NoFavoritesTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
`;

const NolinkImg = styled.img`
  width: 30%;
`;

interface ContentListProps {
  list: Link[];
<<<<<<< HEAD
  onDelete: (id: number) => void;
  onFavoriteToggle?: (id: number) => void; // 물음표 추가
}

export default function ContentList({ list, onDelete, onFavoriteToggle }: ContentListProps) {
  return (
   <ContentListSection>
  <CardList>
    {list.length > 0 ? (
      list.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle ?? (() => {})} // 이벤트 꼭 전달
        />
      ))
    ) : (
      <NoFavortiesTitle>등록된 즐겨찾기가 없습니다.</NoFavortiesTitle>
    )}
  </CardList>
  </ContentListSection>
)
};
=======
  onDeleteRequest: (link: Link) => void;
  onEdit: (link: Link) => void;
  onToggleFavorite: (link: Link) => void;
  loading?: boolean;
  error?: string | null;
}

export default function ContentList({
  list,
  onDeleteRequest,
  onEdit,
  onToggleFavorite,
  loading = false,
  error = null,
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
        setOpenMenuCardId(null);
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
              menuRef={(el) => {
                kebabRefs.current[link.id] = el;
              }}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <NoFavoritesTitle>
            <NolinkImg src="/images/nolink.png" alt="비어있음" />
            <h2>등록된 즐겨찾기가 없습니다.</h2>
          </NoFavoritesTitle>
        )}
      </CardList>
    </ContentListSection>
  );
}
>>>>>>> aa8c8bc21b221b84dbed9918b3b9e632aab15d73
