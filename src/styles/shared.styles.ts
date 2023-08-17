import { css } from "@emotion/react";
import theme from "./theme";

const textInfo = css({
  textAlign: "center",
  fontSize: theme.fontSize.sm,
  lineHeight: theme.lineHeight.sm,
  color: theme.colors.textSecondary,
  margin: "2rem 0",
});

const sharedStyles = {
  container: css({
    maxWidth: "1100px",
    margin: "0 auto",
  }),

  main: css({
    padding: "6rem 1rem 1rem 1rem",
    minHeight: "100vh",
    position: "relative",
  }),

  loadingText: textInfo,

  emptyResult: textInfo,
};

export default sharedStyles;
