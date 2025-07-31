// 토큰 및 기타 로컬스토리지 데이터 관리 전용 파일
// saveToStorage(), loadFromStorage(), removeFromStorage(), clearStorage() 함수 모아놓기
// import 해서 “로컬 스토리지 관리만” 담당
import { Link } from "../pages/api/types";

const STORAGE_KEY = "LinkbraryData";

interface StorageData {
  accessToken?: string;
}

export function saveToStorage(data: StorageData) {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : {};

    const newData = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return { success: true };
  } catch (e) {
    console.error("로컬스토리지 저장 실패:", e);
    return { success: false, error: e };
  }
}

export function loadFromStorage(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("로컬스토리지 로드 실패:", e);
    return {};
  }
}

export function removeFromStorage(keys: (keyof StorageData)[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    keys.forEach((key) => delete parsed[key]);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.error("로컬스토리지 삭제 실패:", e);
  }
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

/*/ ===== 사용 예시 =====
// 로그인 성공 후 토큰 저장
saveToStorage({ accessToken: response.data.accessToken });

// 저장된 토큰 꺼내기
const { accessToken } = loadFromStorage();

// 로그아웃 시 토큰 삭제
removeFromStorage(["accessToken"]);

// 또는 전체 초기화
clearStorage();
*/

/* ======================================================= */

const LINKS_KEY = "LinkbraryLinks";

export function saveLinksToStorage(links: Link[]) {
  try {
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  } catch (e) {
    console.error("로컬스토리지 링크 저장 실패:", e);
  }
}

export function loadLinksFromStorage(): Link[] {
  try {
    const raw = localStorage.getItem(LINKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("로컬스토리지 링크 로드 실패:", e);
    return [];
  }
}

export function clearLinksStorage() {
  localStorage.removeItem(LINKS_KEY);
}
