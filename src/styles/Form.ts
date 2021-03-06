import styled from 'styled-components';

const StyledForm = styled.form`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: ${({theme}) => theme.backgroundColors.main};
  border: 1px solid ${({theme}) => theme.backgroundColors.secondary};
  border-radius: ${({theme}) => theme.radius.md};
  padding: .5rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  box-shadow: ${({theme}) => theme.shades.md}, 0 -10px ${({theme}) => theme.backgroundColors.main}
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
  grid-template-columns: repeat(2, 1fr);
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
      padding: 10px;
      outline: none;
      border: none;
      border-radius: ${({theme}) => theme.radius.sm};
      background-color: ${({theme}) => theme.backgroundColors.body};
      &:hover {
        cursor: pointer
      }
    }
  }

  @media(max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default StyledForm;