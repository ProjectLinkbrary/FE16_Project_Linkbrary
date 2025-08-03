// /** @jsxImportSource @emotion/react */
// import styled from "@emotion/styled";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "../api/types";
// import { addLink, fetchLinksFromServer } from "../api/link";
// import { useRouter } from "next/router";
// import { loadLinksFromStorage, saveLinksToStorage } from "../utils/storage";

// import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";
// import TopSection from "../components/linkPage/TopSection";
// import ContentSection from "../components/linkPage/ContentSection";
// import Modal from "../components/modals/modal";

// const PageContainer = styled.div`
//   width: 100%;
//   max-width: 66.25rem;
//   margin: 0 auto;
//   padding: 0 1.563rem;

//   display: flex;
//   flex-direction: column;

//   ${({ theme }) => theme.media.tablet} {
//     padding: 0 1.875rem;
//   }
//   ${({ theme }) => theme.media.desktop} {
//     padding: 0 1.875rem;
//   }
// `;

// export default function LinkPage() {
//   const router = useRouter();
//   const [links, setLinks] = useState<Link[]>([]);
//   const { folderId } = router.query;

//   // 모달 상태
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const folderIdNum =
//     typeof folderId === "string" && !isNaN(Number(folderId))
//       ? Number(folderId)
//       : null;

//   // // 페이지 처음 렌더링 시
//   // useEffect(() => {
//   //   console.log("folderIdNum:", folderIdNum);
//   //   const savedLinks = loadLinksFromStorage();
//   //   if (savedLinks.length > 0) {
//   //     setLinks(savedLinks);
//   //   } else {
//   //   }
//   // }, []);

//   // // links 상태가 바뀔 때마다
//   // useEffect(() => {
//   //   saveLinksToStorage(links);
//   // }, [links]);

//   // // folderIdNum이 바뀔 때마다
//   // useEffect(() => {
//   //   if (!folderIdNum) return;

//   //   async function fetchLinks() {
//   //     try {
//   //       const serverLinks = await fetchLinksFromServer(folderIdNum);
//   //       setLinks(serverLinks);
//   //       saveLinksToStorage(serverLinks);
//   //     } catch {
//   //       const savedLinks = loadLinksFromStorage();
//   //       if (savedLinks.length > 0) setLinks(savedLinks);
//   //     }
//   //   }
//   //   fetchLinks();
//   // }, [folderIdNum]);
//
//   const addLinkHandler = async (url: string) => {
//     if (!folderIdNum) {
//       alert("폴더 정보가 없습니다.");
//       return;
//     }

//     if (!url.trim()) {
//       alert("링크를 입력해주세요.");
//       return;
//     }

//     // 중복 검사 주석 처리 상태 유지
//     const isDuplicate = links.some((link) => link.url === url);
//     if (isDuplicate) {
//       alert("이미 등록된 링크입니다.");
//       return;
//     }

//     try {
//       const newLink = await addLink({ url, folderId: folderIdNum });
//       setLinks((prev) => [newLink, ...prev]);

//       setModalMessage("링크가 추가되었습니다!");
//       setModalOpen(true);
//     } catch (error) {
//       handleAddLinkError(error);
//     }
//   };

//   const handleAddLinkError = (error: unknown) => {
//     if (axios.isAxiosError(error)) {
//       console.log("✅ Axios 에러입니다");
//       console.log("응답 데이터:", error.response?.data);
//       console.log("상태 코드:", error.response?.status);
//       console.log("에러 메시지:", error.message);

//       if (
//         error.response?.status === 400 &&
//         error.response.data.message?.includes("이미 등록")
//       ) {
//         alert("서버에 이미 등록된 URL입니다.");
//       } else {
//         alert("링크 추가 중 오류가 발생했습니다.");
//       }
//     } else {
//       alert("알 수 없는 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <>
//       <Header isLoggedIn={true} />
//       <TopSection onAddLink={addLinkHandler} />
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         message={modalMessage}
//       />
//       <PageContainer>
//         <ContentSection list={links} />
//       </PageContainer>
//       <Footer />
//     </>
//   );
// }
