import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Linkbrary 프로젝트</div>
      <Link
        href="/signup"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#1e90ff",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        회원가입 페이지로 이동
      </Link>{" "}
    </>
  );
}
