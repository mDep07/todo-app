import { createGlobalStyle} from 'styled-components'
import { Theme } from './Themes';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: Theme }) => theme.body};
    color: ${({ theme }: { theme: Theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  `