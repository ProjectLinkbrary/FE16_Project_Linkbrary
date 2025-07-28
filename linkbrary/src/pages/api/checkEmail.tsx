import type { NextApiRequest, NextApiResponse } from "next";

interface CheckEmailResponse {
  isAvailable: boolean;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckEmailResponse | { message: string }>
) {
  // POST 요청만 허용합니다.
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "이메일 주소가 필요합니다." });
    }

    try {
      const mockUsersInDB = [
        "user1@example.com",
        "duplicate@example.com", // 중복 테스트용 이메일
        "another_user@test.com",
      ];

      const userFound = mockUsersInDB.includes(email);

      if (userFound) {
        return res.status(409).json({
          isAvailable: false,
          message: "이미 사용 중인 이메일입니다.",
        });
      } else {
        return res
          .status(200)
          .json({ isAvailable: true, message: "사용 가능한 이메일입니다." });
      }
    } catch (error) {
      // 데이터베이스 조회 중 오류가 발생한 경우
      console.error("데이터베이스 조회 중 오류:", error);
      res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
    }
  } else {
    // POST 요청이 아닌 다른 HTTP 메서드 (GET, PUT 등)가 들어오면 405 Method Not Allowed 응답을 보냅니다.
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
