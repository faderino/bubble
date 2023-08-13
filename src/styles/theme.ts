export const screens = {
  sm: "640px",
  lg: "1024px",
};

export const mediaQuery = {
  sm: `@media (min-width: ${screens.sm})`,
  lg: `@media (min-width: ${screens.lg})`,
};

const theme = {
  colors: {
    white: "#ffffff",
    indigo: "#4f46e5",

    primary: "#020617",
    accent: "#efefef",
  },

  border: {
    md: "0.375rem",
    full: "9999px",
  },

  fontSize: {
    sm: "0.875rem",
  },

  fontWeight: {
    md: 500,
  },

  lineHeight: {
    sm: "1.25rem",
  },

  shadow: {
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
};

export default theme;
