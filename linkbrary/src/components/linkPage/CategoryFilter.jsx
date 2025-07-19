/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { PrimaryButton } from "components/common/Button";

const categories = [
  "전체",
  "유튜브",
  "코딩 팁",
  "채용 사이트",
  "유용한 글",
  "나만의 장소",
];

const CategorySection = styled.section`
  margin: 0 25px;
  display: flex;
  justify-content: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const CategoryItem = styled.li`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 50px;
  padding: 8px 12px;
`;

const AddButton = styled.button`
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 50px;

  margin-top: 0.375rem;
  cursor: pointer;
`;

export default function CategoryFilter() {
  return (
    <CategorySection>
      <CategoryWrapper>
        <CategoryItems>
          {categories.map((item) => (
            <CategoryItem key={item}>{item}</CategoryItem>
          ))}
        </CategoryItems>
        <PrimaryButton> Primary 버튼</PrimaryButton>
      </CategoryWrapper>
    </CategorySection>
  );
}
