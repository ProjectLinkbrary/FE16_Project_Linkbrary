import { Global, css } from "@emotion/react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        /* Reset */
        * {
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          vertical-align: baseline;
          box-sizing: border-box;
          text-decoration: none;
        }

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
        body {
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
      `}
    />
  );
}
