import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';


const buttonWithIcon = css`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding-top: 2px !important;
    padding-left: 6px !important;
    padding-bottom: 2px !important;
    padding-right: 2px !important;

    &.icon-left {
        padding-left: 2px !important;
        padding-right: 6px !important;
    }

    & > svg {
        background-color: rgba(255,255,255,.1);
        padding: 2px;
        border-radius: 100px;
    }
`;

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

    ${({icon}) => icon ? buttonWithIcon : ''}
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