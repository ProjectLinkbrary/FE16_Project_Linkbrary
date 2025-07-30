import { instance } from "./instance";
import { Folder } from "./types";

// 폴더 목록 불러오기
export const fetchFolders = async (): Promise<Folder[]> => {
  try {
    const res = await instance.get("/folders");
    console.log("폴더 목록 API 응답:", res.data);
    return res.data;
  } catch (error: any) {
    console.error(
      "폴더 목록 불러오기 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const fetchFolderInfo = async (folderId: number) => {
  const res = await instance.get(`/folders/${folderId}`);
  return res.data;
};

// 폴더 추가
export const addFolder = async (
  name: string
): Promise<{ id: number; name: string }> => {
  try {
    const res = await instance.post("/folders", { name });
    return res.data;
  } catch (error: any) {
    console.error(
      "폴더 추가 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// 폴더 삭제
export const deleteFolder = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/folders/${id}`);
  } catch (error: any) {
    console.error(
      "폴더 삭제 실패:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
