/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "../../styles/theme";
const NoLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 48px 0 64px 0;
`;

const NolinkImg = styled.img`
  width: 40%;
  max-width: 12.5rem;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.875rem;

  ${({ theme }) => theme.media.tablet} {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 0.875rem;
  color: #b3b3b3;
  text-align: center;
  line-height: 1.5;

  ${({ theme }) => theme.media.tablet} {
    font-size: 1rem;
  }
`;

export default function NoLinks() {
  return (
    <NoLinksWrapper>
      <NolinkImg src="/images/nolink.png" alt="비어있음" />
      <Title>저장된 링크가 없어요</Title>
      <SubTitle>
        링크를 추가해 흩어져 있는 정보를 <br />한 곳에서 보관해 보세요
      </SubTitle>
    </NoLinksWrapper>
  );
}
