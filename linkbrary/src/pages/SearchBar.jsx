/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const searchBar = css`
  display: flex;
  justify-content: center;
  margin: 1.3rem 0;
`;

const inputWrapper = css`
  position: relative;
  width: 327px;
  height: 52px;
`;

const inputStyle = css`
  width: 100%;
  height: 100%;
  padding: 0.5rem 3rem 0.5rem 3rem;

  border-radius: 25px;
  border: none;
  font-size: 1rem;

  color: #757575;
  background-color: #f5f5f5;
`;

const linkIcon = css`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

export default function SearchBar() {
  return (
    <section css={searchBar}>
      <div css={inputWrapper}>
        <img css={linkIcon} src="/images/ic_search.svg" alt="검색 아이콘" />
        <input css={inputStyle} value="링크를 추가해 보세요." />
      </div>
    </section>
  );
}
