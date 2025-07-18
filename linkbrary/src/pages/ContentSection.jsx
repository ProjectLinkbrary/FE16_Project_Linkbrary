/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ContentList from "./ContentList.jsx";

const contentSection = css`
  height: 400px;
  margin: 24px 25px;
`;
const contentWrapper = css`
  display: flex;
  justify-content: space-between;
`;
const titleBox = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const title = css`
  font-size: 20px;
  font-weight: 600;
`;

const iconButtonList = css`
  display: flex;
  gap: 12px;
`;

export default function ContentSection() {
  return (
    <section css={contentSection}>
      <div css={contentWrapper}>
        <div css={titleBox}>
          <h2 css={title}>유용한 글</h2>
          <img src="/images/ic_btn.svg" />
        </div>
        <ul css={iconButtonList}>
          <li>
            <img src="/images/ic_share.svg" alt="공유" />
          </li>
          <li>
            <img src="/images/ic_trash.svg" alt="휴지통" />
          </li>
        </ul>
      </div>
      <ContentList />
    </section>
  );
}
