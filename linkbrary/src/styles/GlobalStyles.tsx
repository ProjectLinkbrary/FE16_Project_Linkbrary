import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      /* @font-face {
        font-family: "Pretendard";
        src: url("/fonts/Pretendard-ExtraLight.woff2") format("woff2"),
          url("/fonts/Pretendard-ExtraLight.woff") format("woff");
        font-weight: 100;
        font-style: normal;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("/fonts/Pretendard-Regular.woff2") format("woff2"),
          url("/fonts/Pretendard-Regular.woff") format("woff");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("/fonts/Pretendard-Bold.woff2") format("woff2"),
          url("/fonts/Pretendard-Bold.woff") format("woff");
        font-weight: 700;
        font-style: normal;
      } */

      @font-face {
        font-family: "Pretendard";
        src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
          format("woff");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
          format("woff");
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff")
          format("woff");
        font-weight: 600;
        font-style: normal;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
          format("woff");
        font-weight: 700;
        font-style: normal;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-family: "Pretendard", sans-serif;
        font-size: 16px; /** 기준 루트 폰트 크기(root font size) **/
        font: inherit;
        vertical-align: baseline;

        -webkit-font-smoothing: antialiased; /** 웹킷 기반 브라우저(Chrome, Safari 등)에서 글자를 부드럽게 표현하도록 하는 속성입니다. **/
        -moz-osx-font-smoothing: grayscale; /** 파이어폭스가 MacOS에서 폰트를 렌더링할 때 사용하는 속성입니다. **/
      }
      /* HTML5 display-role reset for older browsers */
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section {
        display: block;
      }
      input,
      textarea {
        border: none;
        outline: none;
        font: inherit;
        background: none;
      }

      body {
        margin: 0px;
        font-family: "Pretendard", sans-serif;
        line-height: 1;
      }
      ol,
      ul {
        list-style: none;
      }
      blockquote,
      q {
        quotes: none;
      }
      blockquote:before,
      blockquote:after,
      q:before,
      q:after {
        content: "";
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      a {
        text-decoration: none;
        color: inherit;
      }

      svg {
        height: auto;
      }

      button {
        border: none;
        background: none;
        border-radius: 0;
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyle;
