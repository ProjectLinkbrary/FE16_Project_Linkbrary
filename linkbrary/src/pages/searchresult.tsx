/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";

import SearchBar from "../components/linkPage/SearchBar";
import CategoryFilter from "../components/linkPage/CategoryFilter";
import ContentList from "../components/linkPage/ContentList";
import NoLinks from "../components/linkPage/Nolinks";
import TopSection from "../components/linkPage/TopSection";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchNoResult from "../components/linkPage/SearchNoResult";
import { Folder, Link } from "./api/types";
import { useState } from "react";

const PageWrapper = styled.div`
  width: 100%;
`;
const ContentListWrapper = styled.div`
  width: 100%;
  max-width: 66.25rem;
  padding: 0 25px;

  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 1rem 0;
`;

const SearchSummary = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #b3b3b3;

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

const FolderTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FolderActions = styled.div`
  display: flex;
`;
const IconButton = styled.button``;

const TrashIcon = styled.img``;

const FolderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

type LinkItem = {
  id: number;
  url: string;
  title: string;
  description: string;
  createdAt: string;
};

type Props = {
  list: Link[];
  folders: Folder[];
};
export default function SearchResult({ list, folders }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => setSearchTerm("");

  // 안전하게 필터링
  const filteredList = (list ?? []).filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("searchTerm:", searchTerm);
  console.log("list length:", list?.length ?? 0);
  console.log("filteredList length:", filteredList.length);

  return (
    <PageWrapper>
      <Header isLoggedIn={false} />
      <TopSection
        onRequestAddLink={(url) => console.log(url)}
        folders={folders}
        selectedCategoryId={0}
        onSelectCategory={(id) => console.log("선택된 폴더 ID:", id)}
        onAddFolder={() => console.log("폴더 추가")}
        isModalOpen={false}
      />

      <ContentListWrapper>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={handleClear}
        />

        <SearchSummary>코드잇으로 검색한 결과입니다.</SearchSummary>

        <CategoryFilter
          folders={folders}
          selectedCategoryId={0}
          onSelectCategory={(id) => console.log("선택된 폴더 ID:", id)}
          onAddFolder={() => console.log("폴더 추가")}
        />

        <ContentWrapper>
          <FolderTag>
            <FolderTitle>전체</FolderTitle>
            <FolderActions>
              <IconButton type="button">
                <Image
                  src="./images/ic_share.svg"
                  alt="공유"
                  width={30}
                  height={30}
                />
              </IconButton>
              <IconButton type="button">
                <Image
                  src="/images/ic_btn.svg"
                  alt="폴더 수정하기"
                  width={30}
                  height={30}
                />
              </IconButton>
              <IconButton type="button">
                <TrashIcon src="/images/ic_trash.svg" alt="폴더 삭제" />
              </IconButton>
            </FolderActions>
          </FolderTag>
        </ContentWrapper>

        {filteredList.length > 0 ? (
          <ContentList
            list={filteredList}
            onDeleteRequest={(link) => console.log("삭제:", link)}
            onEdit={(link) => console.log("수정:", link)}
          />
        ) : (
          <SearchNoResult />
        )}
      </ContentListWrapper>

      <Footer />
    </PageWrapper>
  );
}
