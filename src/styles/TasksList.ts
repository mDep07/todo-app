import styled from 'styled-components';

import { StyledIconButton } from './Button'

const StyledTasksContainer = styled.section`
  margin-top: 1rem;
`;

export const StyledTasksList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  gap: 5px
`;

export const StyledTasksItem = styled.li<{ checked?: boolean }>`
  list-style-type: none;
  border: 1px solid red;
  padding: .25rem;
  border: 1px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.sm};
  box-shadow: ${({theme}) => theme.shades.sm};
  
  &:hover {
    box-shadow: ${({theme}) => theme.shades.md};
  }

  & header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    & button.select {
      outline: none;
      cursor: pointer;
      flex: initial;
      width: 100%;
      padding-top: 5px;
      padding-bottom: 5px;
      text-align: start;
      background-color: transparent;
      border: none;
      color: ${({theme, checked}) => checked ? theme.text.secondary : theme.text.main};
      ${({checked}) => checked ? 'text-decoration: line-through' : ''};
    }
  }
`;

export const StyledButtonCheck = styled.button<{ checked?: boolean }>`
  flex: initial;
  width: 25px;
  height: 25px;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0;
  /* background-color: transparent; */
  border: none;
  color: ${({theme, checked}) => checked ? theme.text.main : theme.text.secondary};
  display: grid;
  place-content: center;
`;

export default StyledTasksContainer;