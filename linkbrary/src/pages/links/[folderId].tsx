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
  const [selectedFolderId, setSelectedFolderId] = useState(0);

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
    if (!folderId) return;

    async function loadLinks() {
      try {
        setLoading(true);
        const list = await fetchLinksFromServer(Number(folderId));
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
          folders={folders}
        />
      </PageContainer>
      <Footer />

      {isAddLinkModalOpen && pendingUrl && typeof folderId === "string" && (
        <AddLinkModal
          folderId={Number(folderId) ?? 0}
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
