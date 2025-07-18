import Header from "@/components/header";
import GlobalStyles from "@/styles/Globalstyles";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
// import "@/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
