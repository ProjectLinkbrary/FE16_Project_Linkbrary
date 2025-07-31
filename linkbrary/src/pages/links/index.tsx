/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import NoLinks from "../../components/linkPage/Nolinks";
import { fetchFolders } from "../api/folder";
import LoadingSpinner from "../../components/common/Spinner";

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function LinksHome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFolders, setHasFolders] = useState(false);

  useEffect(() => {
    async function checkFolders() {
      try {
        const folders = await fetchFolders();
        if (folders.length > 0) {
          router.replace(`/links/${folders[0].id}`);
        } else {
          setHasFolders(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("폴더 불러오기 실패", error);
        setHasFolders(false);
        setIsLoading(false);
      }
    }

    checkFolders();
  }, []);

  if (isLoading) {
    return (
      <CenterWrapper>
        <LoadingSpinner />
      </CenterWrapper>
    );
  }

  return (
    <>
      <Header isLoggedIn={true} />
      {!hasFolders && <NoLinks />}
      <Footer />
    </>
  );
}
