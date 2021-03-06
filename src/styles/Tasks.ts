import styled from 'styled-components';


const StyledTasksContainer = styled.section`
  position: relative;
  padding: 0 1rem;
  height: 92vh;
  overflow-y: scroll;

  &::after {
    content: '';
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background-color: red;
    z-index: 999;
  }

  &::-webkit-scrollbar {
    display: none;
  }
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

export const StyledDetailsTask = styled.section`
  margin: .25rem 0;
  padding: .25rem;

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
  /* gap: 5px; */

  & span {
    background-color: ${({theme}) => theme.colors.secondary};
    color: white;
    padding: 0 5px;
    /* border-radius: ${({theme}) => theme.radius.xs}; */
    display: inline-flex;
    align-items: center;
    
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: border .25s ease-in-out;

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

    &.main {
      background-color: ${({theme}) => theme.colors.main};
    }
  }

  & span:first-child {
    border-top-left-radius: ${({theme}) => theme.radius.xs};
    border-bottom-left-radius: ${({theme}) => theme.radius.xs};
  }
  & span:last-child {
    border-top-right-radius: ${({theme}) => theme.radius.xs};
    border-bottom-right-radius: ${({theme}) => theme.radius.xs};
  }
`;

export default StyledTasksContainer;