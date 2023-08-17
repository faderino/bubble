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
  }),

  defaultDisabled: css({
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  }),

  inputDisplay: css({
    ":disabled": {
      cursor: "default",
      color: theme.colors.textPrimary
    },
  }),
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  displayOnly?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, displayOnly = false, ...props }, ref) => {
    return (
      <input
        type={type}
        css={[
          styles.input,
          displayOnly ? styles.inputDisplay : styles.defaultDisabled,
        ]}
        className={className}
        ref={ref}
        disabled={displayOnly || disabled}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
