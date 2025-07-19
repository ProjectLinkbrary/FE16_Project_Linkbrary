/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ContentList from "./ContentList.jsx";

const ContentSectionWrapper = styled.section`
  height: 400px;
  margin: 24px 25px;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const IconButtonList = styled.ul`
  display: flex;
  gap: 12px;
`;

export default function ContentSection() {
  return (
    <ContentSectionWrapper>
      <ContentWrapper>
        <TitleBox>
          <Title>유용한 글</Title>
          <img src="/images/ic_btn.svg" alt="아이콘" />
        </TitleBox>
        <IconButtonList>
          <li>
            <img src="/images/ic_share.svg" alt="공유" />
          </li>
          <li>
            <img src="/images/ic_trash.svg" alt="휴지통" />
          </li>
        </IconButtonList>
      </ContentWrapper>
      <ContentList />
    </ContentSectionWrapper>
  );
}
