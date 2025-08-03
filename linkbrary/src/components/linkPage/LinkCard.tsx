/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Link } from "../../pages/api/types";
import { formatDistanceToNow } from "date-fns";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    width: calc(50% - 0.75rem);
  }

  ${({ theme }) => theme.media.desktop} {
    width: calc(33.333% - 1rem);
  }
`;

const CardThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 11.875rem;
  border-radius: 16px 16px 0 0;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    height: 12.5rem;
  }
`;

const ThumbnailImage = styled.div<{ $hasImageSource: boolean }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultThumbnail = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2d2d2d 0%, #0e0e0e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkIcon = styled.img`
  width: 15%;
`;

const FavoritesIcon = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;

  svg,
  img {
    filter: ${(props) =>
      props.isFavorite ? "drop-shadow(0 0 3px #FFD700)" : "none"};
  }
`;

const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 20px;

  h2 {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #2c2c2c;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span:nth-of-type(1) {
    margin-bottom: 6px;
  }
  span {
    font-size: 14px;
    color: #757575;
  }
`;
const KebabWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 99;
`;

const KebabButton = styled.button`
  background: transparent;
  border: none;

  cursor: pointer;
`;
const IconImg = styled.img`
  width: 100%;
`;

const KebabMenu = styled.ul`
  position: absolute;
  top: 32px;
  right: -100%;
  width: 120px;
  background: white;
  border: 1px solid #757575;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const KebabMenuItem = styled.li`
  padding: 0.875rem 1.563rem;
  cursor: pointer;

  &:not(:first-of-type) {
    border-top: 1px solid #eee;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface LinkCardProps {
  link: Link;
  onDeleteRequest: (link: Link) => void;
  onEdit: (link: Link) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  menuRef: (node: HTMLUListElement | null) => void;

  isFavorite: boolean;
  onToggleFavorite: (link: Link) => void;
}

export default function LinkCard({
  link,
  onDeleteRequest,
  onEdit,
  isMenuOpen,
  onToggleMenu,
  menuRef,
  isFavorite,
  onToggleFavorite,
}: LinkCardProps) {
  const { imageSource, title, description, createdAt } = link;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const internalMenuRef = useRef<HTMLUListElement | null>(null);

  // menuRef 콜백과 internalMenuRef 연결
  const combinedMenuRef = (node: HTMLUListElement | null) => {
    internalMenuRef.current = node;
    menuRef(node);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMenuOpen &&
        internalMenuRef.current &&
        !internalMenuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onToggleMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, onToggleMenu]);

  // ESC 누르면 메뉴 닫기
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMenuOpen) {
        onToggleMenu();
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, onToggleMenu]);

  // createdAt 기준으로 현재 시점과의 상대 시간을 표시
  // date-fns 라이브러리로 formatDistanceToNow 함수 사용, addSuffix 옵션으로 'ago' 추가
  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  // 카드 클릭 시 새 탭 열기
  const handleClick = () => {
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  // 케밥 메뉴 토글 시 이벤트 버블링 차단
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleMenu();
  };

  const handleEdit = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onToggleMenu();
    onEdit(link);
  };

  const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onToggleMenu();
    onDeleteRequest(link);
  };

  return (
    <Card onClick={handleClick}>
      <CardThumbnail>
        <ThumbnailImage $hasImageSource={!!imageSource}>
          {imageSource ? (
            <Img src={imageSource} alt={title} />
          ) : (
            <DefaultThumbnail>
              <LinkIcon
                src="/images/ic_default_thumbnail.svg"
                alt="기본 썸네일"
              />
            </DefaultThumbnail>
          )}
        </ThumbnailImage>

        <FavoritesIcon
          isFavorite={isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(link);
          }}
        >
          <Image
            src={
              isFavorite
                ? "/images/ic_bg_favorites.svg"
                : "/images/ic_favorites.svg"
            }
            alt={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            width={32}
            height={32}
          />
        </FavoritesIcon>
      </CardThumbnail>

      <CardContent>
        <span>{relativeTime}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{new Date(createdAt).toLocaleDateString()}</span>

        <KebabWrapper>
          <KebabButton
            ref={buttonRef}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            aria-controls="kebab-menu"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu();
            }}
            aria-label="옵션 메뉴 열기"
          >
            <IconImg src="/images/ic_kebab.svg" alt="메뉴 버튼" />
          </KebabButton>
          {isMenuOpen && (
            <KebabMenu ref={combinedMenuRef}>
              <KebabMenuItem onClick={handleEdit}>수정하기</KebabMenuItem>
              <KebabMenuItem onClick={handleDelete}>삭제하기</KebabMenuItem>
            </KebabMenu>
          )}
        </KebabWrapper>
      </CardContent>
    </Card>
  );
}
