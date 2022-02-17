import { relativeTimeRounding } from "moment";
import { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

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
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2px;
    border-radius: 100px;
  }
`;

// const StyledSmallButton = styled(StyledButton)`
//   padding: 2px 4px;
//   font-size: 0.9rem;
//   &:hover,
//   &:active {
//     transform: scale(1);
//   }
// `;

// const StyledCheckButton = styled(StyledButton)`
//   filter: opacity(0.5);
//   &:hover {
//     filter: opacity(0.85);
//   }
//   &.active {
//     filter: opacity(1);
//     background-color: var(--color);
//     color: white;
//   }
//   &.small {
//     padding: 2px 8px;
//     font-size: 0.9rem;
//     transform: none;
//   }
// `;

const StyledLinkButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.info};
  text-decoration: underline;
  filter: brightness(0.85);
  cursor: pointer;

  &:hover {
    filter: brightness(1);
  }
`;

type TSizes = "sm" | "md" | "lg";
type TVariants = "text" | "outline" | "conteined";
type TColors = "main" | "secondary" | "danger" | "info" | "warning" | "success";
type ButtonProps = {
  size?: TSizes;
  variant?: TVariants;
  color?: TColors;

  small?: boolean;
  link?: boolean;
  check?: boolean;
  icon?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  --color: ${({ color, variant, theme }) => {
    return color ? theme.colors[color] : theme.colors.secondary
  }};
  --alpha-color: ${({ color, variant, theme }) => {
    return color ? theme.alphaColors[color] : theme.alphaColors.secondary
  }};

  ${({ size }) => {
    switch(size) {
      case "sm":
        return {
          padding:'2px 5px',
          fontSize: 12
        };
      case "md": 
        return {
          padding:'2px 5px',
          fontSize: 15
        }
      case "lg": 
        return {
          padding:'2px 5px',
          fontSize: 25
        }
      default: 
        return {
          padding:'2px 5px',
          fontSize: 12
        }
    }
  }}

  background-color: var(--alpha-color);
  color: var(--color);
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  /* font-size: 1.5rem; */
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

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    filter: brightness(0.25);
    cursor: not-allowed;
    transform: scale(1);
  }

  ${({ icon }) => (icon ? buttonWithIcon : "")}
`;

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  // if (props.small) return <StyledSmallButton {...props} />;

  // if (props.link) return <StyledLinkButton {...props} />;

  // if (props.check) return <StyledCheckButton {...props} />;

  return <StyledButton {...props} />;
}
