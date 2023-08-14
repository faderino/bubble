import theme from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  item: css({
    padding: "1rem 0.5rem",
    display: "flex",
    alignItems: "center",
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textPrimary,
  }),

  person: css({
    maxWidth: "70%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",

    p: {
      width: "calc(95%)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }),

  phone: css({
    color: theme.colors.textSecondary,
    width: "30%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

export default styles;
