import styled from "styled-components";

const StyledSwitchTheme = styled.button`
  border: none;
  padding: 2px;
  background-color: transparent;
  color: darkgray;
  font-size: 1.25rem;
  display: flex;
  border-radius: 10px;
  cursor: pointer;
  &:active {
    transform: scale(.95);
  }
`;

export default StyledSwitchTheme;