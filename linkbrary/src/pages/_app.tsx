import { ThemeProvider, Theme } from "@emotion/react";
import GlobalStyle from "../styles/GlobalStyles";
import theme from "../styles/theme";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme as Theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
