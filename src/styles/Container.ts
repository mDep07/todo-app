import styled from 'styled-components';

const StyledContainer = styled.main`
  background-color: ${({ theme }) => theme.backgroundColors.main};
  /* border-radius: ${({ theme }) => theme.radius.lg}; */
  border-radius: 0;
  max-width: 550px;
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
`;

export default StyledContainer;