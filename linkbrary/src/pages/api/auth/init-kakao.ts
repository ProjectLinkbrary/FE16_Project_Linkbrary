import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const TEAM_ID = "16-6";
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  try {
    const result = await axios.post(
      `https://linkbrary-api.vercel.app/${TEAM_ID}/oauthApps`,
      {
        provider: "kakao",
        clientId: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      }
    );
    console.log("보내는 데이터:", {
      provider: "kakao",
      clientId,
      redirectUri,
    });

    res.status(200).json({ message: "카카오 앱 등록 완료", data: result.data });
  } catch (err: any) {
    console.error("등록 실패:", err.response?.data || err.message);
    res.status(500).json({ message: "카카오 앱 등록 실패" });
  }
}
