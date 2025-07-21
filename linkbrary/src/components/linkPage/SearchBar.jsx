/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import theme from "styles/theme";

const SearchBarSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 1.3rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem 3rem 0.5rem 3rem;

  border-radius: 25px;
  border: none;
  font-size: 1rem;

  color: #757575;
  background-color: ${({ theme }) => theme.color.gray10};
`;

const LinkIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

export default function SearchBar() {
  return (
    <SearchBarSection>
      <InputWrapper>
        <LinkIcon src="/images/ic_search.svg" alt="검색 아이콘" />
        <StyledInput placeholder="링크를 검색해 보세요." />
      </InputWrapper>
    </SearchBarSection>
  );
}
