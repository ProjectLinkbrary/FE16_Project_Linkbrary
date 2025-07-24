import Link from "next/link";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MainVisualWrapper from "../components/landingPage/MainVisualSection";
import LandingContent from "../components/landingPage/LandingContent";
import type { NextPage } from "next";

export default function Home() {
  return (
    <>
      <Header isLoggedIn={true} />
      <MainVisualWrapper />
      <LandingContent />
      <Footer />
    </>
  );
}
