/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import TopSection from "../components/linkpage/TopSection";
import SearchBar from "../components/linkpage/SearchBar";
import CategoryFilter from "../components/linkpage/CategoryFilter";
import ContentSection from "../components/linkpage/ContentSection";
import Header from "components/common/Header";

const LinkpageStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function LinkPage() {
  return (
    <LinkpageStyle>
      <Header />
      <TopSection />
      <SearchBar />
      <CategoryFilter />
      <ContentSection />
    </LinkpageStyle>
  );
}
