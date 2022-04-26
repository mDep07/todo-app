import styled from "styled-components";

const StyledListContainer = styled.section`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 5px;
`;

export const StyledItemIcon = styled.div`
  flex: initial;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

export const StyledItemName = styled.div`
  flex: initial;
  width: 100%;

  font-size: 1rem;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledItem = styled.div`
  width: 100%;
  position: relative;
  padding: 5px;
  border: 2px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.sm};
  color: ${({theme}) => theme.text.main};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  box-shadow: ${({theme}) => theme.shades.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  /* transition: all .15s ease-in-out; */

  &:hover {
    border-color: ${({theme}) => theme.colors.main};

    & ${StyledItemIcon} {
      color: ${({theme}) => theme.colors.main};
    }
  }
`;

export default StyledListContainer;