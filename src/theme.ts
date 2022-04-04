import { DefaultTheme } from "styled-components";

const colors = {
  colors: {
    main: '#F27013',
    secondary: '#BABABA',
    danger: '#D91136',
    info: '#117FD9',
    warning: '#c9a110',
    success: '#0bb839'
  },
  alphaColors: {
    main: 'rgba(242, 112, 19, .25)',
    secondary: 'rgba(186, 186, 186, .25)',
    danger: 'rgba(217, 17, 54, .25)',
    info: 'rgba(17, 127, 217, .25)',
    warning: 'rgba(201, 161, 16, 25)',
    success: 'rgba(11, 184, 57, .25)'
  }
}

const borderRadius = {
  radius: {
    xs: '.25rem',
    sm: '.5rem',
    md: '.75rem',
    lg: '1rem',
    full: '999px'
  }
}

const light: DefaultTheme = {
  backgroundColors: {
    main: "#F5F5F5",
    secondary: "#eeeeee",
    body: '#FFF',
  },
  text: {
    main: "#363537",
    secondary: "#636363",
  },
  shades: {
    sm: "0 1px 2px #e0e0e0",
    md: "0 2px 3px #e0e0e0",
    lg: "0 4px 8px #e0e0e0",
  },
  ...colors,
  ...borderRadius
};

const dark: DefaultTheme = {
  backgroundColors: {
    main: "#141414",
    secondary: "#272727",
    body: '#000',

  },
  text: {
    main: "#FAFAFA",
    secondary: "#636363",
  },
  shades: {
    sm: "0 1px 2px #0f0f0f",
    md: "0 2px 3px #0f0f0f",
    lg: "0 4px 8px #0f0f0f",
  },
  ...colors,
  ...borderRadius
  
}

export { light, dark }