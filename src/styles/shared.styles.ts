import { css } from "@emotion/react";
import theme from "./theme";

const sharedStyles = {
  container: css({
    maxWidth: "1100px",
    margin: "0 auto",
  }),

  loadingText: css({
    textAlign: "center",
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textSecondary,
    margin: "2rem 0",
  }),
};

export default sharedStyles;
