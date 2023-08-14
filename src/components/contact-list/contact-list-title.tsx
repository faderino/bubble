import theme from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";

const styles = {
  title: css({
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    lineHeight: theme.lineHeight.xs,
    letterSpacing: "0.075rem",
    fontWeight: theme.fontWeight.md,
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    padding: "0.5rem",
    textTransform: "uppercase",
  })
}

interface ContactListTitleProps {
  children: React.ReactNode;
}

export default function ContactListTitle({ children }: ContactListTitleProps) {
  return (
    <div css={styles.title}
    >
      {children}
    </div >
  );
}
