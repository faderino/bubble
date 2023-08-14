import theme from "@/styles/theme";
import { css } from "@emotion/react";

const styles = {
  headerContainer: css({
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "block",
  }),

  header: css({
    display: "table",
    marginBottom: "0.5rem",
    borderBottom: `1px solid ${theme.colors.border}`,
    width: "100%",
    height: "3.25rem",
    tableLayout: "fixed",
  }),

  headerColumn: css({
    display: "table-cell",
    color: theme.colors.textSecondary,
    verticalAlign: "middle",
    fontWeight: theme.fontWeight.md,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
  }),
};

export default function ContactListHeader() {
  return (
    <div css={styles.headerContainer}>
      <div css={styles.header}>
        <div css={styles.headerColumn}>Name</div>
      </div>
    </div>
  );
}
