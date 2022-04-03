import styled from 'styled-components';

const StyledButton = styled.button`
  --color: ${({theme}) => theme.colors.main};
  --bg-color: ${({theme}) => theme.alphaColors.main};

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
  & svg {
    /* background-color: white; */
  }
`;

export default StyledButton;