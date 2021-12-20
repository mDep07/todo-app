import { createGlobalStyle} from 'styled-components'
import { Theme } from './Themes';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: Theme }) => theme.body};
    color: ${({ theme }: { theme: Theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: background 0.50s linear, color 0.50s linear;
    background-image: ${({ theme }: { theme: Theme }) => theme.backgroundImage}
  }
  `