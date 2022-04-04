import styled from "styled-components";

const StyledFoldersContainer = styled.section`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const StyledFolderItem = styled.div`
  padding: 10px;
  border: 2px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.md};
  color: ${({theme}) => theme.text.main};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  box-shadow: ${({theme}) => theme.shades.sm};
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  transition: border .15s ease-in-out;

  &:hover {
    border-color: ${({theme}) => theme.colors.main};
  }
`;

export const StyledFolderItemIcon = styled.div`
  flex: initial;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  opacity: .5;
`;

export const StyledFolderItemName = styled.div`
  flex: initial;
  width: 100%;
  font-size: 1rem;
`;

export default StyledFoldersContainer;