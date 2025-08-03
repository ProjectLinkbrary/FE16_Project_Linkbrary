import { useEffect } from "react";
import { useRouter } from "next/router";
import { saveToStorage } from "../../utils/storage";
import axios from "axios";

const REDIRECT_URI = "http://localhost:3000/auth/kakao";
const TEAM_ID = "16-6";
const PROVIDER = "kakao";

async function getUserInfo(accessToken: string) {
  const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
}

async function tryLogin(accessToken: string) {
  const res = await axios.post(
    `https://linkbrary-api.vercel.app/${TEAM_ID}/auth/sign-in/${PROVIDER}`,
    {
      token: accessToken,
      redirectUri: REDIRECT_URI,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
}

async function trySignUp(accessToken: string, nameId: string) {
  const res = await axios.post(
    `https://linkbrary-api.vercel.app/${TEAM_ID}/auth/sign-up/${PROVIDER}`,
    {
      name: nameId,
      token: accessToken,
      redirectUri: REDIRECT_URI,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
}

export default function KakaoRedirectPage() {
  const router = useRouter();
  const { code } = router.query;
  const REST_API_KEY = "85d3d14f5da1c035bc0875db4fa0e39a";

  useEffect(() => {
    if (!router.isReady || !code || typeof code !== "string") return;

    const fetchKakao = async () => {
      try {
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirectUri: REDIRECT_URI,
            code,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const accessToken = res.data.access_token;

        if (!accessToken) throw new Error("토큰 없음");

        const user = await getUserInfo(accessToken);
        const nameId = user.kakao_account.profile.nickname;
        saveToStorage({ accessToken, nameId }); // 로컬 스토리지에 저장
        router.push("/");
        console.log("카카오 사용자 정보:", nameId);
        console.log("🔥 trySignUp 요청 데이터:", {
          token: accessToken,
          name: nameId,
          redirectUri: REDIRECT_URI,
        });
        // // 2. 로그인 시도
        // try {
        //   console.log("tryLogin 요청 데이터:", {
        //     token: accessToken,
        //     redirectUri: REDIRECT_URI,
        //   });

        //   const loginRes = await tryLogin(accessToken);
        //   console.log("✅ 로그인 성공:", loginRes);
        //   saveToStorage({ accessToken: loginRes.accessToken });
        // } catch (loginErr: any) {
        //   console.warn(
        //     "❌ 로그인 실패 → 회원가입 시도:",
        //     loginErr.response?.data
        //   );

        //   // 3. 회원가입 시도
        //   try {
        //     console.log("🔥 trySignUp 요청 데이터:", {
        //       token: accessToken,
        //       name: nameId,
        //       redirectUri: REDIRECT_URI,
        //     });
        //     const signUpRes = await trySignUp(accessToken, nameId);
        //     console.log("✅ 회원가입 성공:", signUpRes);
        //     saveToStorage({ accessToken: signUpRes.accessToken });
        //     router.push("/");
        //   } catch (signUpErr) {
        //     console.error("❌ 회원가입 실패:", signUpErr);
        //   }
        // }
      } catch (err) {
        console.error("❌ 실패:", err);
      }
    };

    fetchKakao();

    // async function getUserInfo(accessToken: string) {
    //   const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   return res.data;
    // }
  }, [router.isReady, code]);

  return <div>로그인 처리 중... ⏳</div>;
}
