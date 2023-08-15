import sharedStyles from "@/styles/shared.styles";
import theme, { mediaQuery } from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  header: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "fit-content",
    zIndex: 10,
    padding: "0.75rem",
    background: theme.colors.background,
  }),

  headerContent: css({
    display: "flex",
    gap: "1rem",
    alignItems: "center",

    "& > div": {
      height: "3rem",
    },
  }),

  headerLogo: css({
    display: "flex",
    alignItems: "center",

    [mediaQuery.sm]: {
      width: "12.5rem",
    },
  }),

  searchContainer: css({
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  }),

  searchBarToggle: css({
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",

    [mediaQuery.sm]: {
      display: "none",
    },
  }),

  searchBarAlways: css({
    display: "none",

    [mediaQuery.sm]: {
      display: "block",
      width: "100%",
    },
  }),
};

export default styles;
