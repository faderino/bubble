import theme, { mediaQuery } from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  itemContainer: css({
    position: "relative",
    transition: "background 0.3s ease",

    ":hover": {
      background: theme.colors.accent,
    },
  }),

  item: css({
    padding: "0.65rem 0.5rem",
    display: "flex",
    alignItems: "center",
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    color: theme.colors.textPrimary,
    cursor: "pointer",
    borderRadius: theme.border.sm,

    ":hover": {
      "& + div": {
        opacity: 1,
      },
    },
  }),

  person: css({
    maxWidth: "60%",
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

  avatarContainer: css({
    padding: "0 0.5rem",
  }),

  phone: css({
    color: theme.colors.textSecondary,
    width: "30%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  action: css({
    opacity: 0,
    display: "none",
    position: "absolute",
    width: "10%",
    zIndex: 1,
    right: 0,
    padding: "0.65rem 0.5rem",
    top: 0,
    bottom: 0,
    alignItems: "center",
    color: theme.colors.textSecondary,

    ":hover": {
      opacity: 1,
    },

    "& > *": {
      cursor: "pointer",
    },

    [mediaQuery.lg]: {
      display: "flex",
    },
  }),
};

export default styles;
