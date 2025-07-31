import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST 요청이 아니면 에러 처리
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, name, password } = req.body;

  // 필수 정보가 누락되었는지 확인합니다.
  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ message: "이메일, 이름, 비밀번호는 필수입니다." });
  }

  try {
    const API_URL = "https://linkbrary-api.vercel.app/16-6/auth/signup";

    const response = await axios.post(API_URL, { email, name, password });

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    // 네트워크 문제 등 예측 불가능한 에러 처리
    console.error("API 요청 중 알 수 없는 오류:", error);
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
  }
}
