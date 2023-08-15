import theme, { mediaQuery } from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  searchBar: css({
    width: "100%",
    height: "2.5rem",
    background: theme.colors.accent,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0 0.5rem 0 1.5rem",
    borderRadius: theme.border.md,

    input: {
      border: "none",
      width: "100%",
      height: "100%",
      background: "none",
      ":focus": {
        outline: "none",
      },
    },
  }),
};

export default styles;
