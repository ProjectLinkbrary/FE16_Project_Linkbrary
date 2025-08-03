import { instance } from "./instance";
import { Link, UpdateLinkPayload, ToggleFavoritePayload } from "./types";

// 특정 폴더에 속한 링크 목록 불러오기
export const fetchLinksFromServer = async (
  folderId: number
): Promise<Link[]> => {
  console.log("fetchLinksFromServer folderId:", folderId);
  try {
    const res = await instance.get<{ totalCount: number; list: Link[] }>(
      `/folders/${folderId}/links`
    );
    return res.data.list;
  } catch (error: any) {
    console.error(
      "링크 목록 불러오기 실패:",
      error.response?.status,
      error.response?.data,
      error.message
    );
    throw error;
  }
};

// 전체 링크 목록 불러오기
export const fetchAllLinksFromServer = async (): Promise<Link[]> => {
  console.log("fetchAllLinksFromServer 호출");
  try {
    const res = await instance.get<{ totalCount: number; list: Link[] }>(
      `/links`
    );
    return res.data.list;
  } catch (error: any) {
    console.error(
      "전체 링크 목록 불러오기 실패:",
      error.response?.status,
      error.response?.data,
      error.message
    );
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
  console.log("addLink 호출", { url, folderId });
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

// 링크 수정
export const updateLink = async (payload: UpdateLinkPayload): Promise<Link> => {
  const { id, ...data } = payload;
  try {
    const res = await instance.put<Link>(`/links/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error(
      "링크 수정 실패:",
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

// 즐겨찾기 링크 목록 불러오기
export const fetchFavoriteLinksFromServer = async (): Promise<Link[]> => {
  try {
    const res = await instance.get<{ totalCount: number; list: Link[] }>(
      `/links?isFavorite=true`
    );
    return res.data.list;
  } catch (error: any) {
    console.error(
      "즐겨찾기 목록 불러오기 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// 즐겨찾기 상태 변경
export const toggleFavorite = async (payload: {
  id: number;
  favorite: boolean;
  folderId?: number;
}) => {
  const { id, favorite, folderId } = payload;
  if (favorite === undefined) throw new Error("favorite 값이 없습니다.");

  const res = await instance.put(`/links/${id}/favorite`, {
    favorite,
    folderId,
  });

  return res.data; // 변경된 Link 객체를 반환한다고 가정
};
