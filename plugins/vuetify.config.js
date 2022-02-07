const theme = {
  dark: false,
  themes: {
    light: {
      primary: '#7F56D9',
      primary_alt: '#F9F5FF',
      success: '#027A48',
    },
  },
};

const breakpoint = {
  mobileBreakpoint: 'md',
  thresholds: {
    xs: 576,
    sm: 768,
    md: 1024,
    lg: 1200,
  },
  scrollBarWidth: 16,
};

export default {
  theme,
  breakpoint,
  icons: {
    iconfont: 'mdiSvg',
  },
};
