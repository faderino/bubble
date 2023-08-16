import theme from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  formItem: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.25rem",

    input: {
        marginBottom: "0.2rem",
    }
  }),

  formItemPrepend: css({
    width: "2.5rem",
  }),

  formItemAppend: css({
    width: "3rem",
  }),

  error: css({
    fontSize: theme.fontSize.xxs,
    lineHeight: theme.lineHeight.xs,
    color: theme.colors.error,
    position: "absolute",
  }),
};

export default styles;
