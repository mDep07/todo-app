import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = { color?: 'main' | 'secondary' | 'danger' | 'info' | 'warning', icon?: boolean };
const StyledButton = styled.button<Props>`
    --color: ${({ color, theme }) => color ? theme.colors[color] : theme.colors.secondary };
    --alpha-color: ${({ color, theme }) => color ? theme.alphaColors[color] : theme.alphaColors.secondary };
    
    background-color: var(--alpha-color);
    color: var(--color);
    margin: 4px;
    padding: 4px;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

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

    & > svg {
        ${({icon}) => !icon && `margin-left:5px;background:rgba(255,255,255,.15);border-radius:10px`}
    }
`;

const StyledSmallButton = styled(StyledButton)`
    padding: 2px 4px;
    font-size: .9rem;
    &:hover, &:active {
        transform: scale(1);
    }
`;

const StyledCheckButton = styled(StyledButton)`
    filter: opacity(.5);
    &:hover {
        filter: opacity(.85);
    }
    &.active {
        filter: opacity(1);
        background-color: var(--color);
        color: white;
    }
    &.small {
        padding: 2px 8px;
        font-size: .9rem;
        transform: none;
    }
`;

const StyledLinkButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.info};
    text-decoration: underline;
    filter: brightness(.85);
    cursor: pointer;

    &:hover {
        filter: brightness(1);
    }
`;


type ButtonProps = { small?: boolean, link?: boolean, check?: boolean } & Props;
export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
    if(props.small) return <StyledSmallButton {...props} />

    if(props.link) return <StyledLinkButton {...props} />

    if(props.check) return <StyledCheckButton {...props} />

    return <StyledButton {...props} />
}