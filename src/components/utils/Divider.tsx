import styled from "styled-components";

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.backgroundColors.secondary};
  margin: 1rem 0;
`;

export default function Divider() {
  return <StyledDivider />
}