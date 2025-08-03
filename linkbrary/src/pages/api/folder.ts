import { instance } from "./instance";
import { Folder } from "./types";

// 폴더 목록 불러오기
export const fetchFolders = async (): Promise<Folder[]> => {
  try {
    const res = await instance.get("/folders");
    console.log("폴더 목록 API 응답:", res.data);
    return res.data.map((folder: any) => ({
      id: folder.id,
      name: folder.name,
      count: folder.linkCount ?? 0,
    }));
  } catch (error: any) {
    console.error(
      "폴더 추가 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const fetchFolderInfo = async (folderId: number): Promise<Folder> => {
  const res = await instance.get(`/folders/${folderId}`);
  const folder = res.data;
  return {
    id: folder.id,
    name: folder.name,
    count: folder.linkCount ?? 0,
  };
};

// 폴더 추가
export const addFolder = async (name: string): Promise<Folder> => {
  try {
    const res = await instance.post("/folders", { name });
    const folder = res.data;
    return {
      id: folder.id,
      name: folder.name,
      count: folder.linkCount ?? 0,
    };
  } catch (error: any) {
    console.error(
      "폴더 추가 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// 폴더 수정
export const updateFolder = async (
  id: number,
  name: string
): Promise<Folder> => {
  try {
    const res = await instance.put(`/folders/${id}`, { name });
    const folder = res.data;
    return {
      id: folder.id,
      name: folder.name,
      count: folder.linkCount ?? 0,
    };
  } catch (error: any) {
    console.error(
      "폴더 목록 불러오기 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// 폴더 삭제
export const deleteFolder = async (folderId: number): Promise<void> => {
  console.log("삭제 요청 폴더 ID:", folderId);
  try {
    await instance.delete(`/folders/${folderId}`);
  } catch (error: any) {
    console.error("폴더 삭제 실패 응답:", error.response?.data);
    throw error;
  }
};
