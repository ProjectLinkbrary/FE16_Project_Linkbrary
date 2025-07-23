/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

import TopSection from "../components/linkpage/TopSection";
import ContentSection from "../components/linkpage/ContentSection";

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
  ${theme.media.desktop} {
    padding: 0 1.875rem;
  }
`;

export default function LinkPage() {
  return (
    <>
      <Header />
      <TopSection />
      <PageContainer>
        <ContentSection />
      </PageContainer>
      <Footer />
    </>
  );
}
