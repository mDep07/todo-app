import styled from 'styled-components';

const StyledForm = styled.form`
  border: 1px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.md};
  padding: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  box-shadow: ${({theme}) => theme.shades.lg}
`;

export const StyledFormControl = styled.div`
  & input {
    width: 100%;
    padding: 5px;
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 2rem;
    color: ${({theme}) => theme.text.main};
    /* border-bottom: 1px solid ${({theme}) => theme.backgroundColors.secondary}; */
  }
`;

export const StyledFooterForm = styled.footer`
  display: flex;
  justify-content: end;
`;

export default StyledForm;