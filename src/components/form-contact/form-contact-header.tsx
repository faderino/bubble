import theme from "@/styles/theme";
import { css } from "@emotion/react";
import { X } from "lucide-react";
import React from "react";

const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "0.5rem",
    marginBottom: "0.5rem",
    borderBottom: `1px solid ${theme.colors.border}`,
  }),
};

interface FormContactHeaderProps {
  title: string;
  action: React.ReactNode;
}

export default function FormContactHeader({
  title,
  action,
}: FormContactHeaderProps) {
  return (
    <div css={styles.container}>
      <div css={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <X color={theme.colors.textSecondary} />
        <div css={{ fontWeight: theme.fontWeight.md }}>{title}</div>
      </div>

      {action}
    </div>
  );
}
