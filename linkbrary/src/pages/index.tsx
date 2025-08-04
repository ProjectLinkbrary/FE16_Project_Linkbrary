import Link from "next/link";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MainVisualSection from "../components/landingPage/MainVisualSection";
import LandingContent from "../components/landingPage/LandingContent";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { addFolder, fetchFolders } from "./api/folder";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddLink = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const folders = await fetchFolders();
      if (folders.length === 0) {
        const newFolder = await addFolder("새 폴더");
        router.push(`/links/${newFolder.id}`);
      } else {
        router.push(`/links/${folders[0].id}`);
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header isLoggedIn />
      <MainVisualSection onAddLink={handleAddLink} loading={loading} />
      <LandingContent />
      <Footer />
    </>
  );
}
