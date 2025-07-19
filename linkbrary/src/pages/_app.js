import { ThemeProvider } from "@emotion/react";
import GlobalStyle from "../styles/GlobalStyles.jsx";
import theme from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
