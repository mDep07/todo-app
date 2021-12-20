import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    --color: ${({ color }) => color ? color : '255, 99, 71'};
    background-color: rgba(var(--color), .25);
    margin: 4px;
    padding: 4px;
    color: rgb(var(--color));
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &:hover {
        box-shadow: 0 1px 2px rgba(var(--color), .7);
    }

    &:active {
        /* box-shadow: inset 0 1px 2px rgba(var(--color), .9); */
        transform: scale(0.9);
    }

    &:disabled {
        filter: brightness(.25);
        cursor: not-allowed;
    }
`;

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <StyledButton {...props} />
}