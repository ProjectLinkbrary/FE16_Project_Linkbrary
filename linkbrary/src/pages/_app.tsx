import { ThemeProvider, Theme } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyles";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme as Theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
