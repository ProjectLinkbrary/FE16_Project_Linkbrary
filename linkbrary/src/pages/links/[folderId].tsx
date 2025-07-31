/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import TopSection from "../../components/linkPage/TopSection";
import ContentSection from "../../components/linkPage/ContentSection";
import AddLinkModal from "../../components/linkPage/AddlinkModal";

import { fetchLinksFromServer, deleteLink } from "../api/link";
import { Link } from "../api/types";

const PageContainer = styled.div`
  width: 100%;
  max-width: 66.25rem;
  margin: 0 auto;
  padding: 0 1.563rem;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 1.875rem;
  }
  ${({ theme }) => theme.media.desktop} {
    padding: 0 1.875rem;
  }
`;

export default function FolderLinksPage() {
  const router = useRouter();
  const { folderId } = router.query;

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [folders, setFolders] = useState<
    { id: number; name: string; count: number }[]
  >([]);

  useEffect(() => {
    if (!folderId) return;

    async function loadLinks() {
      try {
        setLoading(true);
        const list = await fetchLinksFromServer(Number(folderId));
        setLinks(list);
      } catch (err) {
        console.error("링크 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLinks();
  }, [folderId]);

  const handleRequestAddLink = (url: string) => {
    setPendingUrl(url);
    setIsAddLinkModalOpen(true);
  };

  const closeModal = () => {
    setPendingUrl(null);
    setIsAddLinkModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
      alert("삭제 성공");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 실패");
    }
  };

  return (
    <>
      <Header isLoggedIn={true} />
      <TopSection onRequestAddLink={handleRequestAddLink} />
      <PageContainer>
        <ContentSection
          list={links}
          loading={loading}
          onDelete={handleDelete}
          folderTitle="전체"
        />
      </PageContainer>
      <Footer />

      {isAddLinkModalOpen && pendingUrl && typeof folderId === "string" && (
        <AddLinkModal
          folderId={Number(folderId)}
          url={pendingUrl}
          folders={folders}
          onClose={closeModal}
          onSuccess={() => {
            closeModal();
            fetchLinksFromServer(Number(folderId)).then(setLinks);
          }}
        />
      )}
    </>
  );
}
