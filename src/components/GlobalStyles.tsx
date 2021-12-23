import { createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColors.body};
    color: ${({ theme }) => theme.text.main};
    transition: background-color 0.50s linear, color 0.50s linear;
    /* font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif; */
  }
`