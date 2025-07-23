/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const SearchNoResultWrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #999;
`;

const SearchResultTitle = styled.h1`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;
const SubTitle = styled.p``;

export default function SearchNoResult() {
  return (
    <SearchNoResultWrapper>
      <SearchResultTitle>검색 결과가 없습니다.</SearchResultTitle>
      <SubTitle>다른 키워드로 검색해 보세요.</SubTitle>
    </SearchNoResultWrapper>
  );
}
