import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;

  & ul {
    margin: 0;
    padding: 0;

    & li {
      list-style-type: none;
      display: inline-block;

      & a {
        padding: 5px 10px;
        text-decoration: none;
        border-radius: ${({theme}) => theme.radius.sm};
        color: ${({theme}) => theme.text.secondary};

        &.active {
          font-weight: 600;
          color: ${({theme}) => theme.text.main};
          background-color: ${({theme}) => theme.backgroundColors.secondary};
        }
      }
    }

    & li:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export default StyledNavbar;