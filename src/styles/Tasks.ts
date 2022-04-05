import styled, { keyframes } from 'styled-components';

const add = keyframes`
  0%: {
    opacity: 0;
    x: 100
  }
  100% {
    opacity: 1;
    x: 0
  }
`

const StyledTasksContainer = styled.section`
  margin-top: 1rem;
`;

export const StyledTasksList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  gap: 5px
`;

export const StyledTasksItem = styled.li<{ checked?: boolean, highlight?: boolean }>`
  list-style-type: none;
  border: 1px solid red;
  padding: .25rem;
  border: 2px solid ${({theme, highlight}) => highlight ? theme.colors.info : theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.sm};
  box-shadow: ${({theme}) => theme.shades.sm};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  transition: all .15s ease-in-out;

  animation: ${add} 1s linear;
  
  &:hover {
    box-shadow: ${({theme}) => theme.shades.md};
    /* border-style: dotted; */
    border-color: ${({theme}) => theme.colors.main};
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
      font-weight: 600;
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
  font-weight: 200;
  padding: 0;
  /* background-color: transparent; */
  border: none;
  color: ${({theme, checked}) => checked ? theme.text.main : theme.text.secondary};
  display: grid;
  place-content: center;
`;

export const StyledDetailsTask = styled.section<{open: boolean}>`
  margin: ${({open}) => open ? '.25rem 0' : 0};
  padding: ${({open}) => open ? '.25rem' : 0};
  overflow: hidden;
  height: ${({open}) => open ? 'auto' : 0};
  opacity: ${({open}) => open ? 1 : 0};
  transition: all .15s ease-in-out, opacity .35s ease-in-out;



  & small {
    display: block;
    font-size: 12px;
    color: ${({theme}) => theme.text.secondary};

    &.expired {
      font-size: 14px;
      color: ${({theme}) => theme.colors.warning};
    }
  }

  & p {
    margin: 5px 0
  }
`;


export const StyledFooterTask = styled.footer`
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 5px;

  & span {
    background-color: ${({theme}) => theme.colors.secondary};
    color: white;
    padding: 0 5px;
    border-radius: ${({theme}) => theme.radius.xs};
    display: inline-flex;
    align-items: center;
    
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &.success {
      background-color: ${({theme}) => theme.colors.success};
    }

    &.info {
      background-color: ${({theme}) => theme.colors.info};
    }

    &.danger {
      background-color: ${({theme}) => theme.colors.danger};
    }

    &.warning {
      background-color: ${({theme}) => theme.colors.warning};
    }
  }
`;

export default StyledTasksContainer;