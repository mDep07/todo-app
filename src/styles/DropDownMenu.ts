import styled from 'styled-components';

const DropDownMenu = styled.div<{ open: boolean, right?: boolean, left?: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  background-color: red;
  top: 100%;
  ${({ right }) => right && 'right: 0'};
  ${({ left }) => left && 'left: 0'};
  z-index: 1000;
  border-radius: ${({theme}) => theme.radius.sm};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  box-shadow: ${({theme}) => theme.shades.md};
  overflow: hidden;
`;

export const DropDownMenuContainer = styled.div`
  position: relative;
`;

export const DropDownMenuAction = styled.div`
  padding: 5px;
  text-align: right;
`;

export default DropDownMenu;