export const theme = {
  color: {
    black: "#111111",
    white: "#ffffff",

    primary: "#6D6AFE",

    gray10: "#F5F5F5",
    gray20: "#E6E6E6",
    gray30: "#D9D9D9",
    gray40: "#B3B3B3",
    gray50: "#757575",
    gray60: "#444444",
    gray70: "#383838",
    gray80: "#2C2C2C",
    gray90: "#1E1E1E",
  },

  fontSize: {
    fz56: `56px`,
    fz48: `48px`,
    fz42: `42px`,
    fz32: `32px`,
    fz24: `24px`,
    fz20: `20px`,
    fz18: `18px`,
    fz16: `16px`,
    fz14: `14px`,
    fz12: `12px`,
  },

  lineHeight: {
    lh140: "140%",
    lh120: "120%",
  },

  breakpoint: {
    tablet: "768px",
    desktop: "1024px",
  },
  media: {
    tablet: `@media (min-width: 768px)`,
    desktop: `@media (min-width: 1024px)`,
  },
} as const; // 테마 객체를 리터럴 타입으로 고정시켜 자동완성 가능하게 함
// them 객체 내부 속성들을 리터럴 타입으로 고정해서 자동완성, 타입 추론이 더 정확해짐

export type Theme = typeof theme; // 테마 기반 타입 추출

export default theme; // ThemeProvider에서 사용하기 위해 기본 내보내기
