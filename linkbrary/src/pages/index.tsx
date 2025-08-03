import Link from "next/link";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MainVisualWrapper from "../components/landingPage/MainVisualSection";
import LandingContent from "../components/landingPage/LandingContent";
import { useEffect, useState } from "react";
import type { NextPage } from "next";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 localStorage 접근 가능
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("LinkbraryData");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (parsed.accessToken) {
            setIsLoggedIn(true);
          }
        } catch (err) {
          console.error("❌ localStorage 데이터 파싱 실패:", err);
        }
      }
    }
  }, []);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MainVisualWrapper />
      <LandingContent />
      <Footer />
    </>
  );
}
