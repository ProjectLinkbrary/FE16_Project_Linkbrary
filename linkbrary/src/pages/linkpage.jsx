/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";

import TopSection from "../components/linkpage/TopSection";
import SearchBar from "../components/linkpage/SearchBar";
import CategoryFilter from "../components/linkpage/CategoryFilter";
import ContentSection from "../components/linkpage/ContentSection";
import Header from "components/common/Header";

const PageContainer = styled.div`
  width: 100%;
  max-width: 66.25rem;
  margin: 0 auto;
  padding: 0 1.563rem;

  display: flex;
  flex-direction: column;

  ${theme.media.tablet} {
    padding: 0 1.875rem;
  }
`;

export default function LinkPage() {
  return (
    <>
      <TopSection />
      <PageContainer>
        <ContentSection />
      </PageContainer>
    </>
  );
}
