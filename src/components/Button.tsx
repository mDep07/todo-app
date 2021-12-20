import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';


const StyledButton = styled.button<{ color?: string }>`
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
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        filter: brightness(.25);
        cursor: not-allowed;
    }
`;

const StyledSmallButton = styled(StyledButton)`
    padding: 2px 8px;
    font-size: .9rem;
    &:hover, &:active {
        transform: scale(1);
    }
`;

// ${({small}) => small ? '.9rem' : '1.5rem' };
type ButtonProps = { color?: string, small?: boolean };
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
    if(props.small) return <StyledSmallButton {...props} />

    return <StyledButton {...props} />
}