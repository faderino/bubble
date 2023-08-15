import theme from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  headerContainer: css({
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "flex",
  }),

  header: css({
    marginBottom: "0.5rem",
    borderBottom: `1px solid ${theme.colors.border}`,
    width: "100%",
    height: "3.25rem",
    display: "flex",
    alignItems: "center",
  }),

  headerColumn: css({
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.md,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
  }),
};

export default function ContactListHeader() {
  return (
    <div css={styles.headerContainer}>
      <div css={styles.header}>
        <div
          css={[styles.headerColumn, { width: "60%", paddingLeft: "0.5rem" }]}
        >
          Name
        </div>
        <div css={[styles.headerColumn, { width: "30%" }]}>Phone</div>
        <div css={[styles.headerColumn, { width: "10%" }]}></div>
      </div>
    </div>
  );
}
