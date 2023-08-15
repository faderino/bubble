import theme from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";

const styles = {
  input: css({
    display: "flex",
    width: "100%",
    borderRadius: theme.border.md,
    border: `1px solid ${theme.colors.border}`,
    padding: "0.5rem 0.75rem",
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    outlineOffset: "0.2rem",
    outlineColor: theme.colors.indigo,

    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  }),
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        css={styles.input}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
