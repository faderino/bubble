export const screens = {
  sm: "640px",
  lg: "1024px",
} as const;

export const mediaQuery = {
  sm: `@media (min-width: ${screens.sm})`,
  lg: `@media (min-width: ${screens.lg})`,
} as const;

const theme = {
  colors: {
    white: "#ffffff",
    indigo: "#4f46e5",
    yellow: "#fde047",

    primary: "#020617",
    accent: "#efefef",
    background: "#ffffff",

    textPrimary: "#202124",
    textSecondary: "#5f6368",

    border: "rgba(0,0,0,.12)",
  },

  border: {
    sm: "0.125rem",
    md: "0.375rem",
    full: "9999px",
  },

  fontSize: {
    xxs: "0.675rem",
    xs: "0.75rem",
    sm: "0.875rem",
  },

  fontWeight: {
    md: 500,
  },

  lineHeight: {
    xs: "1rem",
    sm: "1.25rem",
  },

  shadow: {
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
} as const;

export default theme;
