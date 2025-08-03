import "@emotion/react";
import theme from "./theme"; // default export된 실제 theme 객체

type AppTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}

/** 
 * 
✅ 왜 이렇게 해야 할까?
theme.ts에서 export한 theme 객체를 기반으로 typeof theme 를 쓰면,
실제로 사용 중인 theme 객체의 정확한 구조를 Emotion의 Theme 타입에 확장해 줄 수 있어요.

지금처럼 import { Theme } from "./theme" 식으로 쓰면 theme.ts에서 타입을 명시적으로 export 해줘야 하고,
자칫하면 Theme extends Theme 식의 자기 참조 타입이 되어버려서 효과가 없습니다.
 * 
 */
