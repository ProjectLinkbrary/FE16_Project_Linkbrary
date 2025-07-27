import { useEffect } from "react";
import axios from "axios";

export default function TestLogin() {
  useEffect(() => {
    async function testLogin() {
      try {
        const res = await axios.post(
          "https://linkbrary-api.vercel.app/16-6/auth/sign-in",
          {
            email: "test0001@email.com",
            password: "Test0001!",
          }
        );

        const token = res.data.accessToken;
        localStorage.setItem(
          "LinkbraryData",
          JSON.stringify({ accessToken: token })
        );
        console.log("✅ 토큰 저장 완료:", token);
      } catch (err) {
        console.error("❌ 로그인 실패:", err);
      }
    }

    testLogin();
  }, []);

  return <div>토큰 연결</div>;
}
