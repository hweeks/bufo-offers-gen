const fontConfig = {
  fonts: {
    main: "AUTHENTIC",
    secondary: "Garamond ITC",
  },
  fontSizes: {
    header: "14px",
    small: "16px",
    medium: "18px",
    extraMedium: "24px",
    logo: "42px",
    large: "74px",
    obscene: "140px",
  },
  fontWeights: {
    small: "200",
    medium: "400",
    extraMedium: "500",
    large: "700",
    obscene: "900",
  },
  fontHeight: {
    small: "80%",
    medium: "90%",
    extraMedium: "100%",
    large: "110%",
    obscene: "120%",
  },
};

const spacing = {
  radius: {
    base: "4px",
    small: "8px",
    medium: "16px",
    extraMedium: "20px",
    large: "35px",
    obscene: "42px",
  },
  spacing: {
    base: "4px",
    small: "8px",
    medium: "16px",
    extraMedium: "20px",
    large: "40px",
    obscene: "80px",
  },
  gaps: {
    mini: "12px",
    small: "18px",
    medium: "24px",
    regular: "32px",
    large: "46px",
  },
  columns: {
    biggin: "86vw",
    fill: "100vw",
  },
  widths: {
    merchTile: "390px",
    merchMin: "250px;",
    merchMax: "275px",
  },
  heights: {
    svg: "320px",
    merchImg: "240px",
    merchTile: "270px",
    fullTile: "460px",
  },
  border: {
    regular: "2px",
  },
};

const colors = {
  colors: {
    onWhite: "#FFF",
    offWhite: "#FFFBE3",
    primary: "#005CFF",
    secondaryFont: "#F9E300",
    secondaryAccent: "rgb(214,56,73)",
  },
};

const breakPoints = {
  breakPoints: {
    mobile: "430px",
    tablet: "768px",
    desktop: "1024px",
  },
};

export const theme = {
  ...fontConfig,
  ...spacing,
  ...colors,
  ...breakPoints,
};

export type OurTheme = typeof theme;
