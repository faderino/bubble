import { css } from "@emotion/react";
import theme from "./theme";

const globalStyles = css({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },

  "html, body": {
    color: theme.colors.textPrimary,
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },
});

export { globalStyles };
