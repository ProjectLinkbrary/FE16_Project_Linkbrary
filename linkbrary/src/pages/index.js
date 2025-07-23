import Link from "next/link";
import Image from "next/image";
import Footer from "../components/common/Footer.jsx";
import Header from "../components/common/Header.jsx";
import MainVisualWrapper from "../components/landingPage/MainVisualSection.jsx";
import LandingContent from "../components/landingPage/LandingContent.jsx";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <>
      <Header />
      <MainVisualWrapper />
      <LandingContent />
      <Footer />
    </>
  );
}
