import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
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
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font: inherit;
      }

      body {
        font-family: "Pretendard", sans-serif;
      }

      ul,
      li {
        list-style: none;
      }

      img {
        display: block;
        max-width: 100%;
      }

      svg {
        height: auto;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        border: none;
        background: none;
        border-radius: 0;
        cursor: pointer;
      }

      input,
      textarea {
        border: none;
        outline: none;
        font: inherit;
        background: none;
      }
    `}
  />
);

export default GlobalStyle;
