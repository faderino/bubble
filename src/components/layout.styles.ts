import theme, { mediaQuery } from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  sidebar: css({
    width: 0,
    transition: "width 0.3s ease",

    [mediaQuery.lg]: {
      width: "12.5rem",
      padding: "0 1rem 0 0.8rem",
    },
  }),

  sidebarContainer: css({
    display: "none",

    [mediaQuery.lg]: {
      display: "block",
    },
  }),

  createContactButtonContainer: css({
    paddingTop: "6rem",
    marginBottom: "1.5rem",
  }),
};

export default styles;
