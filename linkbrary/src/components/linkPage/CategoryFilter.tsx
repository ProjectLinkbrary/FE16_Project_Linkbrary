/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Folder } from "../../pages/api/types";

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
  padding: 8px 16px;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 8px 20px;
  }
`;

const SecondaryButton = styled.button`
  background-color: ${({ theme }) => theme.color.gray80};
  color: #ffffff;
  height: 50px;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.375rem;
  cursor: pointer;
`;

const Count = styled.span`
  margin-left: 8px;
  font-size: 1rem;
  color: #b3b3b3;
  user-select: none;
`;

interface CategoryFilterProps {
  folders: Folder[];
  selectedCategoryId: number | null;
  onSelectCategory: (folderId: number) => void;
  onAddFolder: () => void;
}

export default function CategoryFilter({
  folders = [],
  selectedCategoryId,
  onSelectCategory,
  onAddFolder,
}: CategoryFilterProps) {
  // 전체 개수 계산
  const totalCount = folders.reduce(
    (sum, folder) => sum + (folder.count ?? 0),
    0
  );
  // "전체" 카테고리를 UI에서만 추가
  const categories = [{ id: -1, name: "전체", count: totalCount }, ...folders];
  return (
    <CategorySection>
      <CategoryWrapper>
        <CategoryItems>
          {categories.map(({ id, name, count }) => (
            <CategoryItem
              key={id}
              active={selectedCategoryId === id}
              onClick={() => onSelectCategory(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectCategory(id);
                }
              }}
            >
              {name}
              <Count>{count ?? 0}</Count>
            </CategoryItem>
          ))}
        </CategoryItems>
        <SecondaryButton onClick={() => onAddFolder()}>
          + 폴더 추가하기
        </SecondaryButton>
      </CategoryWrapper>
    </CategorySection>
  );
}
