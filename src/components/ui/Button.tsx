"use client";

import styled from "@emotion/styled";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const StyledButton = styled.button<{
  variant: "primary" | "secondary";
  fullWidth: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  padding: 18px 32px;
  border-radius: 50px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.3px;

  background: ${({ variant }) =>
    variant === "primary"
      ? "linear-gradient(135deg, #f87171 0%, #ef4444 100%)"
      : "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)"};

  color: #ffffff;
  box-shadow: ${({ variant }) =>
    variant === "primary"
      ? "0 4px 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
      : "0 4px 12px rgba(0,0,0,0.15)"};

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  fullWidth = true,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}
