/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ContentList from "../components/linkPage/ContentList";

import {
  toggleFavorite,
  fetchFavoriteLinksFromServer,
  deleteLink,
} from "../pages/api/link";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link } from "../pages/api/types";
import { useEffect, useState } from "react";
import LinkModals from "../components/linkPage/LinkModals";

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
  margin: 0 auto;
  padding: 4rem 1.563rem 0;
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

export default function Favorites() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 수정 모달 관련 상태
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  // 삭제 모달 관련 상태
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFavoriteLinksFromServer()
      .then(setLinks)
      .catch((e) => {
        setError("즐겨찾기 목록을 불러오지 못했습니다.");
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggleFavorite = async (link: Link) => {
    try {
      setLinks((prev) =>
        prev.map((l) =>
          l.id === link.id ? { ...l, isFavorite: !l.isFavorite } : l
        )
      );
      await toggleFavorite({
        id: link.id,
        favorite: !link.isFavorite,
        folderId: link.folderId,
      });
      const refreshed = await fetchFavoriteLinksFromServer();
      setLinks(refreshed);
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
      setLinks((prev) =>
        prev.map((l) =>
          l.id === link.id ? { ...l, isFavorite: link.isFavorite } : l
        )
      );
    }
  };

  // 삭제 모달 열기
  const handleDeleteRequest = (link: Link) => {
    setDeletingLink(link);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setDeletingLink(null);
  };

  // 삭제 확정 처리
  const handleDeleteConfirm = async () => {
    if (!deletingLink) return;
    setDeleteLoading(true);
    try {
      await deleteLink(deletingLink.id);
      setLinks((prev) => prev.filter((l) => l.id !== deletingLink.id));
      setDeletingLink(null);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // 수정 모달 열기
  const handleEdit = (link: Link) => {
    setEditingLink(link);
  };

  // 수정 성공 후 처리
  const handleEditSuccess = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
    );
    setEditingLink(null);
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    setEditingLink(null);
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <FavoritesSectionWrapper>
        <LinkWrapper>
          <Title>⭐ 즐겨찾기</Title>
        </LinkWrapper>
      </FavoritesSectionWrapper>

      <FavoriteListWrapper>
        <ContentList
          list={links}
          onToggleFavorite={handleToggleFavorite}
          onDeleteRequest={handleDeleteRequest}
          onEdit={handleEdit}
        />

        <LinkModals
          isAddLinkModalOpen={false}
          pendingUrl={null}
          folders={[]}
          selectedFolderId={0}
          onCloseAddModal={() => {}}
          onAddSuccess={() => {}}
          editingLink={editingLink}
          onCloseEditModal={closeEditModal}
          onEditSuccess={handleEditSuccess}
          deletingLink={deletingLink}
          onCloseDeleteModal={closeDeleteModal}
          onConfirmDelete={handleDeleteConfirm}
          deleteLoading={deleteLoading}
        />

        <Pagination>
          {defaultPageNumbers.map((num) => (
            <button key={String(num)} type="button" disabled>
              {num}
            </button>
          ))}
        </Pagination>
      </FavoriteListWrapper>

      <Footer />
    </>
  );
}
