import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColors: {
      main: string,
      secondary: string,
      body: string,
    },
    text: {
      main: string,
      secondary: string,
    },
    shades: {
      sm: string,
      md: string,
      lg: string,
    },
    colors: {
      main: string,
      secondary: string,
      danger: string,
      info: string,
      warning: string,
      success: string,
    },
    alphaColors: {
      main: string,
      secondary: string,
      danger: string,
      info: string,
      warning: string,
      success: string,
    },
    radius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      full: string;
    }
  }
}