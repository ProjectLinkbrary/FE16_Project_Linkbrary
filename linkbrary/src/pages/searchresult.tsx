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
import { Folder } from "./api/types";

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
  list: LinkItem[];
};
const dummyFolders: Folder[] = [
  { id: 0, name: "전체", count: 0 },
  { id: 1, name: "유튜브", count: 0 },
  { id: 2, name: "코딩 팁", count: 0 },
];

export default function SearchResult({ list }: Props) {
  const dummyList: LinkItem[] = [];

  return (
    <PageWrapper>
      <Header isLoggedIn={false} />
      <TopSection onRequestAddLink={(url) => console.log(url)} />

      <ContentListWrapper>
        <SearchBar />

        <SearchSummary>코드잇으로 검색한 결과입니다.</SearchSummary>

        <CategoryFilter
          folders={dummyFolders}
          selectedCategoryId={0} // "전체" 선택
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

        {dummyList.length > 0 ? (
          <ContentList list={[]} onDelete={(id) => console.log("삭제:", id)} />
        ) : (
          <SearchNoResult />
        )}
      </ContentListWrapper>

      <Footer />
    </PageWrapper>
  );
}
