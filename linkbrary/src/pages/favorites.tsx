/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ContentList from "../components/linkPage/ContentList";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import { Link } from "../pages/api/types";
import {
  fetchFavoriteLinks,
  toggleFavorite,
  deleteLink,
} from "../pages/api/link";
import { useEffect, useState } from "react";
import EditLinkModal from "../components/modals/Link/EditLinkModal";
import DeleteLinkModal from "../components/modals/Link/DeleteLinkModal";
import { saveLinksToStorage, loadLinksFromStorage } from "../utils/storage";

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
  width: 100%;
  max-width: 66.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  padding: 4rem 1.563rem 0 1.563rem;
  cursor: pointer;
  margin: 0 auto;

  h2 {
  }
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
  list: Link[];
  onDeleteRequest: (link: Link) => void;
}

export default function Favorites({
  list = [],
  onDeleteRequest,
}: FavoritesProps) {
  const [links, setLinks] = useState<Link[]>([]);

  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadFavorites = async () => {
    const res = await fetchFavoriteLinks();
    setLinks(res.list);
  };

  const handleToggleFavorite = async (link: Link) => {
    try {
      // 1) 서버 업데이트
      await toggleFavorite(link.id, !link.isFavorite);

      // 2) 로컬에서 해당 링크를 목록에서 제거합니다.
      const updatedLinks = links.filter((l) => l.id !== link.id);
      setLinks(updatedLinks);

      // 3) ✅ 로컬 스토리지에 변경된 링크 목록을 저장합니다.
      // 기존에 localStorage에 저장된 전체 링크 목록에서 해당 링크의 isFavorite 상태를 false로 변경해야 합니다.
      const allLinks = loadLinksFromStorage();
      const updatedAllLinks = allLinks.map((l) =>
        l.id === link.id ? { ...l, isFavorite: false } : l
      );
      saveLinksToStorage(updatedAllLinks);
    } catch (err) {
      console.error("즐겨찾기 토글 실패:", err);
      alert("즐겨찾기 설정에 실패했습니다.");
      // 오류 발생 시 롤백 로직이 필요하다면 여기에 추가할 수 있습니다.
    }
  };

  // 수정 요청
  const handleEdit = (link: Link) => {
    setEditingLink(link);
  };

  // 삭제 요청 (모달 띄우기)
  const handleDeleteRequest = (link: Link) => {
    setDeletingLink(link);
  };

  // 삭제 확정 처리
  const handleDeleteConfirm = async () => {
    if (!deletingLink) return;
    setDeleteLoading(true);
    try {
      await deleteLink(deletingLink.id);
      setDeletingLink(null);
      await loadFavorites();
    } catch (err) {
      alert("삭제 실패");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

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
          list={links}
          onDeleteRequest={handleDeleteRequest} // 모달 뜨게 하기
          onEdit={handleEdit} // 모달 뜨게 하기
          onToggleFavorite={handleToggleFavorite}
        />
        <Pagination>
          {defaultPageNumbers.map((num) => (
            <button key={String(num)} type="button" disabled>
              {num}
            </button>
          ))}
        </Pagination>
      </FavoriteListWrapper>

      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onClose={() => setEditingLink(null)}
          onSuccess={(updatedLink) => {
            setLinks((prev) =>
              prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
            );
            setEditingLink(null);
          }}
        />
      )}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={() => setDeletingLink(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}

      <Footer />
    </>
  );
}
