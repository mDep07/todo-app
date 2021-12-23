import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = { color?: 'main' | 'secondary' | 'danger' | 'info' | 'warning', };
const StyledButton = styled.button<Props>`
    --color: ${({ color, theme }) => color ? theme.colors[color] : theme.colors.secondary };
    --alpha-color: ${({ color, theme }) => color ? theme.alphaColors[color] : theme.alphaColors.secondary };
    
    background-color: var(--alpha-color);
    margin: 4px;
    padding: 4px;
    color: var(--color);
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

type ButtonProps = { small?: boolean } & Props;
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
    if(props.small) return <StyledSmallButton {...props} />

    return <StyledButton {...props} />
}