/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const bannerStyle = css`
  background: url("/images/linkpagebg.png") no-repeat center / cover;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const linkWraaper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const title = css`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
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

  color: #b3b3b3;
  background-color: transparent;
  border: 1px solid #b3b3b3;
`;

const linkIcon = css`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

const buttonStyle = css`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  background: none;
  border: none;

  color: #000000;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 50px;
  background-color: #ffffff;
  cursor: pointer;
`;

export default function BannerSection() {
  return (
    <section css={bannerStyle}>
      <div css={linkWraaper}>
        <h1 css={title}>세상의 모든 정보, 필요한 순간에</h1>
        <div css={inputWrapper}>
          <img css={linkIcon} src="/images/ic_link.svg" alt="링크 아이콘" />
          <input css={inputStyle} value="링크를 추가해 보세요." />
          <button css={buttonStyle}>추가하기</button>
        </div>
      </div>
    </section>
  );
}
