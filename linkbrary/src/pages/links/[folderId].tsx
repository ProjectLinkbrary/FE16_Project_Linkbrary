/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import axios from "axios";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import TopSection from "../../components/linkPage/TopSection";
import ContentSection from "../../components/linkPage/ContentSection";
import { useRouter } from "next/router";
import { Link } from "../api/types";
import { useState, useEffect } from "react";
import { fetchLinksFromServer } from "../../pages/api/link";
import AddLinkModal from "../../components/linkPage/AddlinkModal";
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

export default function LinkPage() {
  const router = useRouter();
  const { folderId } = router.query;
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const handleRequestAddLink = (url: string) => {
    setPendingUrl(url);
    setIsAddLinkModalOpen(true);
  };

  const closeModal = () => {
    setPendingUrl(null);
    setIsAddLinkModalOpen(false);
  };

  useEffect(() => {
    if (!folderId) return;

    const loadLinks = async () => {
      try {
        setLoading(true);
        console.log("");
        const result = await fetchLinksFromServer(Number(folderId));
        setLinks(result);
      } catch (err) {
        console.error("링크 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, [folderId]);
  return (
    <>
      <Header isLoggedIn={true} />
      <TopSection onRequestAddLink={handleRequestAddLink} />
      <PageContainer>
        <ContentSection
          list={links}
          loading={loading}
          onDelete={() => {}}
          folderTitle="전체"
        />
      </PageContainer>
      <Footer />

      {isAddLinkModalOpen && pendingUrl && typeof folderId === "string" && (
        <AddLinkModal
          folderId={Number(folderId)}
          url={pendingUrl}
          onClose={closeModal}
          onSuccess={(newLink) => {
            closeModal();
            fetchLinksFromServer(Number(folderId)).then(setLinks);
          }}
        />
      )}
    </>
  );
}
