/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// import Header from "components/common/Header";
// import Footer from "components/common/Footer";

import TopSection from "../components/linkPage/TopSection";
import ContentSection from "../components/linkPage/ContentSection";

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
  return (
    <>
      <TopSection />
      <PageContainer>
        <ContentSection />
      </PageContainer>
    </>
  );
}
