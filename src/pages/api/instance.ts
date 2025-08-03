// src/api/instance.ts
import axios from "axios";
import { loadFromStorage, clearStorage } from "../../utils/storage";

export const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/16-6",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors: 요청이나 응답이 실제로 처리되기 전에 가로채서 특정 작업을 수행하는 기능
// 요청 인터셉터: 토큰 있으면 Authorization 헤더에 붙임
instance.interceptors.request.use((config) => {
  const { accessToken } = loadFromStorage();
  // axios 요청을 보내기 전에, 요청의 헤더에 accessToken을 자동으로 붙여주는 핵심!
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터: 401 Unauthorized 시 토큰 삭제 후 로그인 페이지 강제 이동
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      alert("인증이 만료되어 다시 로그인해야 합니다.");
      clearStorage();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
