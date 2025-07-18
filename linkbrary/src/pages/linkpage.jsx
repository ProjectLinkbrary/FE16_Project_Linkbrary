/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BannerSection from "./BannerSection";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ContentSection from "./ContentSection";
import Header from "@/components/Header";

const LinkpageStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function LinkPage() {
  return (
    <div css={LinkpageStyle}>
      <BannerSection />
      <SearchBar />
      <CategoryFilter />
      <ContentSection />
    </div>
  );
}
