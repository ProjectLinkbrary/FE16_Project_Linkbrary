import { instance } from "./instance";
import { Link } from "./types";

// 특정 폴더에 속한 링크 목록 불러오기
export const fetchLinksFromServer = async (
  folderId: number
): Promise<Link[]> => {
  try {
    const res = await instance.get<{ totalCount: number; list: Link[] }>(
      `/folders/${folderId}/links`
    );
    return res.data.list;
  } catch (error) {
    console.error("링크 목록 불러오기 실패:", error);
    throw error;
  }
};

// 링크 추가
export const addLink = async ({
  url,
  folderId,
}: {
  url: string;
  folderId: number;
}): Promise<Link> => {
  try {
    const res = await instance.post<Link>(`/links`, {
      url,
      folderId,
    });
    return res.data;
  } catch (error: any) {
    console.error(
      "링크 추가 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// 링크 삭제
export const deleteLink = async (linkId: number): Promise<void> => {
  try {
    await instance.delete(`/links/${linkId}`);
  } catch (error: any) {
    console.error(
      "링크 삭제 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
