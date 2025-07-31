/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";

import { useState, useEffect } from "react";
import ContentList from "./ContentList";
import NoLinks from "./Nolinks";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import { Link } from "../../pages/api/types";
import FolderTopSection from "./FolderTopSection ";
import LoadingSpinner from "../common/Spinner";

const ContentSectionWrapper = styled.section`
  /* margin: 24px 0; */
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 1rem 0;

  ${({ theme }) => theme.media.tablet} {
    margin: 2.5rem 0 1.5rem 0;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 3rem 0 2rem 0;
  }
`;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  margin: 4rem 0 4rem 0;
`;

const defaultPageNumbers: Array<string | number> = ["<", 1, 2, 3, 4, 5, ">"];

interface ContentSectionProps {
  list: Link[];
  loading: boolean;
  folderTitle?: string;
  onDelete: (id: number) => void;
}

export default function ContentSection({
  list,
  loading,
  folderTitle = "전체",
  onDelete,
}: ContentSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentSectionWrapper>
      <SearchBar />

      {list.length > 0 ? (
        <>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddFolder={() => {
              alert("+폴더 추가");
            }}
          />

          <ContentWrapper>
            <FolderTopSection folderTitle={folderTitle} />
          </ContentWrapper>

          <ContentList list={list} onDelete={onDelete} />

          <Pagination>
            {defaultPageNumbers.map((num) => (
              <button key={num} type="button" disabled>
                {num}
              </button>
            ))}
          </Pagination>
        </>
      ) : (
        <NoLinks />
      )}
    </ContentSectionWrapper>
  );
}
