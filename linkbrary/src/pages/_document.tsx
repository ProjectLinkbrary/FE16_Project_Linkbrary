import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// 공식문서나 타입스크립트 예제에선 Document 클래스로 작성하는 걸 권장
// import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

// class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps };
//   }
//   render() {
//     return (
//       <Html lang="ko">
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;
