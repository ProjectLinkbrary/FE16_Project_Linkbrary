/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const categories = [
  "전체",
  "유튜브",
  "코딩 팁",
  "채용 사이트",
  "유용한 글",
  "나만의 장소",
];

const CategorySection = styled.section`
  display: flex;
  justify-content: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    height: 50px;
    flex-direction: row;
    align-items: center;
  }
`;

const CategoryItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const CategoryItem = styled("li", {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  border: 1px solid ${({ theme }) => theme.color.gray30};
  background-color: ${({ theme, active }) =>
    active ? theme.color.gray30 : "transparent"};
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    height: 50px;
  }

  ${({ theme }) => theme.media.desktop} {
    display: flex;
    align-items: center;
    height: 50px;
  }
`;

const SecondaryButton = styled.button`
  background-color: ${({ theme }) => theme.color.gray80};
  color: #ffffff;
  height: 50px;
  padding: 8px 20px;
  border-radius: 50px;

  margin-top: 0.375rem;
  cursor: pointer;
`;

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddFolder: () => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  onAddFolder,
}: CategoryFilterProps) {
  return (
    <CategorySection>
      <CategoryWrapper>
        <CategoryItems>
          {categories.map((item) => (
            <CategoryItem
              key={item}
              active={selectedCategory === item}
              onClick={() => onSelectCategory(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectCategory(item);
                }
              }}
            >
              {item}
            </CategoryItem>
          ))}
        </CategoryItems>
        <SecondaryButton onClick={onAddFolder}>+ 폴더 추가하기</SecondaryButton>
      </CategoryWrapper>
    </CategorySection>
  );
}
