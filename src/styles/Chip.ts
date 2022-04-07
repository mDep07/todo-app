import styled from "styled-components";

export const Chip = styled.div`
  padding: 3px 3px 3px 12px;
  border-radius: 1rem;
  font-size: 14px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  background-color: ${({theme}) => theme.alphaColors.secondary};

  & button {
    border: none;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: 999px;
    width: 20px;
    height: 20px;
    display: grid;
    place-content: center;
    cursor: pointer;
    opacity: .7;
    
    &:hover {
      opacity: 1;
    }
  }
`; 

export default Chip;