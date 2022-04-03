import styled from 'styled-components';

type colors = 'danger' | 'info' | 'secondary';

const StyledButton = styled.button<{ color?: colors, checked?: boolean }>`
  --color: ${({theme, color}) => !color ? theme.colors.main : theme.colors[color]};
  --bg-color: ${({theme, color}) => !color ? theme.alphaColors.main : theme.alphaColors[color]};

  border: none;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 15px;
  border-radius: ${({theme}) => theme.radius.sm};
  background-color: var(--bg-color);
  color: var(--color);
  opacity: .9;

  &:hover,
  &:focus {
    opacity: 1;
    cursor: pointer;
  }

  &:focus {
    outline-color: var(--color);
    outline-offset: 2px;
    outline-style: solid;
    outline-width: 2px;
  }

  &:active {
    outline: none;
    opacity: .9;
    /* transform: scale(.97); */
  }
`;

export const StyledIconButton = styled(StyledButton)`
  padding: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:focus {
    outline-width: 1px;
  }

  & svg {
    /* background-color: white; */
  }
`;

export default StyledButton;