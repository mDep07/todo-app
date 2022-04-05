import styled from 'styled-components';

const StyledForm = styled.form`
  border: 1px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.md};
  padding: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  box-shadow: ${({theme}) => theme.shades.md}
`;

export const StyledFormControl = styled.div`
  & input {
    width: 100%;
    padding: 5px;
    border: none;
    background-color: transparent;
    outline: none;
    font-size: 1.8rem;
    color: ${({theme}) => theme.text.main};
    /* border-bottom: 1px solid ${({theme}) => theme.backgroundColors.secondary}; */
  }
`;

export const StyledFooterForm = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;

  & .actions {
    display: flex;
    justify-content: end;
    gap: 10px
  }
`;

export const StyledFooterConfig = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 0;
  & div {
    display: flex;
    flex-direction: column;
    & label {
      font-size: 12px;
      margin-bottom: 5px;
    }

    & input,
    & select {
      padding: 5px;
      outline: none;
      border: none;
      border-radius: ${({theme}) => theme.radius.sm};
    }
  }

  @media(max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default StyledForm;