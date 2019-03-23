import { CSSProp } from "styled-components";

// responsive helpers
const mqMobile = 768;

export const mq = {
  mobile: (css: CSSProp) => `@media (max-width: ${mqMobile}px) {
        ${css}
      }`,
};
