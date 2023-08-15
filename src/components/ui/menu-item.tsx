import theme from "@/styles/theme";
import styled from "@emotion/styled";

const MenuItem = styled.div<{ active: boolean }>(({ active }) => ({
  borderLeft: active ? `2px solid ${theme.colors.indigo}` : "2px solid none",
  background: active ? theme.colors.accent : "none",

  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: theme.fontSize.xs,
  lineHeight: theme.lineHeight.xs,
  cursor: "pointer",
  padding: "0.75rem 0.5rem",
  borderTopRightRadius: theme.border.full,
  borderBottomRightRadius: theme.border.full,

  ":hover": {
    background: theme.colors.accent,
  },
}));

export default MenuItem;
