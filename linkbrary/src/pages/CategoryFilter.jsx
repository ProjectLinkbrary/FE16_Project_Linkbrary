/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const categories = [
  "전체",
  "유튜브",
  "코딩 팁",
  "채용 사이트",
  "유용한 글",
  "나만의 장소",
];

const categoryStyle = css`
  margin: 0 25px;
  display: flex;
  justify-content: center;
`;

const categoryWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const categoryItems = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const Items = css`
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  padding: 8px 12px;
`;

const buttonStyle = css`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 50px;

  margin-top: 0.375rem;
  cursor: pointer;
`;

export default function CategoryFilter() {
  return (
    <secrion css={categoryStyle}>
      <div css={categoryWrapper}>
        <ul css={categoryItems}>
          {categories.map((item) => (
            <li key={item} css={Items}>
              {item}
            </li>
          ))}
        </ul>
        <button css={buttonStyle}>+ 폴더 추가하기</button>
      </div>
    </secrion>
  );
}
