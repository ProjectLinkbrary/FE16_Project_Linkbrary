/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const contentList = css`
  margin-top: 16px;
`;

const cardList = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;

const card = css`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const cardThumnail = css`
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const favoritesIcon = css`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

const cardContent = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 20px;
`;

const cardDescription = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const cardData = [
  {
    id: 1,
    thumbnail: "/images/thumnailimg.jpg",
    title: "이메일 자동화 정복하기",
    description: "ChatGPT + Gmail 확장으로 메일 지원 자동 응답서비스",
    timeAgo: "10 minutes ago",
    date: "2025.07.18",
  },
  {
    id: 2,
    thumbnail: "/images/thumnailimg.jpg",
    title: "Next.js 배우기",
    description: "React 기반 SSR 프레임워크를 익혀봅시다",
    timeAgo: "1 hour ago",
    date: "2025.07.17",
  },
  {
    id: 3,
    thumbnail: "/images/thumnailimg.jpg",
    title: "Emotion 스타일링",
    description: "CSS-in-JS 라이브러리로 쉽고 빠른 스타일링 방법",
    timeAgo: "3 hours ago",
    date: "2025.07.16",
  },
];

export default function ContentList() {
  return (
    <section css={contentList}>
      <div css={cardList}>
        {cardData.map(
          ({ id, thumbnail, title, description, timeAgo, date }) => (
            <div key={id} css={card}>
              <div css={cardThumnail}>
                <img src={thumbnail} alt={title} />
                <button css={favoritesIcon}>
                  <img src="/images/ic_favorites.svg" alt="favorites icon" />
                </button>
              </div>

              <div css={cardContent}>
                <span>{timeAgo}</span>
                <h2>{title}</h2>
                <p css={cardDescription}>{description}</p>
                <span>{date}</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
