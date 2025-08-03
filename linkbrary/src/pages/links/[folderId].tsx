/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import TopSection from "../../components/linkPage/TopSection";
import ContentSection from "../../components/linkPage/ContentSection";
import AddLinkModal from "../../components/linkPage/AddlinkModal";
import ShareModal from "../../components/linkPage/ShareModal";

import { fetchLinksFromServer, deleteLink } from "../api/link";
import { Link } from "../api/types";
import { fetchFolders } from "../api/folder";
import { Folder } from "../api/types";

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
  const [folders, setFolders] = useState<Folder[]>([]);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    async function loadFolders() {
      try {
        const apiFolders = await fetchFolders();
        const withAll = [{ id: 0, name: "전체", count: 0 }, ...apiFolders];
        setFolders(withAll);
      } catch (err) {
        console.error("폴더 목록 불러오기 실패:", err);
      }
    }
    loadFolders();
  }, []);

  useEffect(() => {
    if (!router.isReady) return; // router.query가 준비될 때까지 기다립니다.

    async function loadLinks() {
      try {
        setLoading(true);
        const currentFolderId = folderId ? Number(folderId) : 0;
        const list = await fetchLinksFromServer(currentFolderId);
        setLinks(list);
        setError(null);
      } catch (err) {
        console.error("링크 로드 실패:", err);
        setError("링크를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadLinks();
  }, [router.isReady, folderId]);

  const handleRequestAddLink = (url: string) => {
    setPendingUrl(url);
    setIsAddLinkModalOpen(true);
  };

  const closeAddLinkModal = () => {
    setPendingUrl(null);
    setIsAddLinkModalOpen(false);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
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

  // 현재 선택된 폴더 정보를 찾습니다.
  const currentFolder = folders.find(
    (f) => f.id === (folderId ? Number(folderId) : 0)
  );

  return (
    <>
      <Header isLoggedIn={true} />
      <TopSection onRequestAddLink={handleRequestAddLink} />
      <PageContainer>
        <ContentSection
          list={links}
          loading={loading}
          onDelete={handleDelete}
          folderTitle={currentFolder?.name ?? "폴더"}
          folders={folders}
          onShareClick={handleShareClick}
        />
      </PageContainer>
      <Footer />

      {isAddLinkModalOpen && pendingUrl && (
        <AddLinkModal
          folderId={folderId ? Number(folderId) : 0}
          url={pendingUrl}
          folders={folders}
          onClose={closeAddLinkModal}
          onSuccess={() => {
            closeAddLinkModal();
            const currentFolderId = folderId ? Number(folderId) : 0;
            fetchLinksFromServer(currentFolderId).then(setLinks);
          }}
        />
      )}

      {currentFolder && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={closeShareModal}
          folderName={currentFolder.name}
          folderUrl={typeof window !== "undefined" ? window.location.href : ""}
        />
      )}
    </>
  );
}
