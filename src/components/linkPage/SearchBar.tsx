/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const SearchBarSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 1.25rem 0 1.5rem 0;

  ${({ theme }) => theme.media.tablet} {
    margin: 3rem 0 2.5rem 0;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 4rem 0 3rem 0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;

  ${({ theme }) => theme.media.tablet} {
    height: 3.25rem;
  }
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

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);

  width: 1rem;
  height: 1rem;

  ${({ theme }) => theme.media.tablet} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CloseIcon = styled.img`
  width: 1rem;
  height: 1rem;

  ${({ theme }) => theme.media.tablet} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default function SearchBar() {
  return (
    <SearchBarSection>
      <InputWrapper>
        <LinkIcon src="/images/ic_search.svg" alt="검색 아이콘" />
        <StyledInput placeholder="링크를 검색해 보세요." />
        <CloseButton>
          <CloseIcon src="/images/ic_close.svg" alt="취소" />
        </CloseButton>
      </InputWrapper>
    </SearchBarSection>
  );
}
