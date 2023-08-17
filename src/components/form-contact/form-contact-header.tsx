import theme from "@/styles/theme";
import { css } from "@emotion/react";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "../ui/button";

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
  const router = useRouter();
  return (
    <div css={styles.container}>
      <div css={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <Button onClick={() => router.push("/")} size="icon" variant="ghost">
          <X color={theme.colors.textSecondary} />
        </Button>
        <div css={{ fontWeight: theme.fontWeight.md }}>{title}</div>
      </div>

      {action}
    </div>
  );
}
