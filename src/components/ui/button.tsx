import theme from "@/styles/theme";
import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Plus } from "lucide-react";
import React from "react";

const styles = {
  default: css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.border.md,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
    fontWeight: theme.fontWeight.md,
    cursor: "pointer",
    border: "none",
    transition: "all ease 0.3s",

    ":disabled": {
      pointerEvents: "none",
      opacity: 0.5,
    },
  }),
};

type ButtonVariant = "primary" | "secondary" | "ghost";
const buttonVariant: Record<ButtonVariant, SerializedStyles> = {
  primary: css({
    background: theme.colors.primary,
    color: theme.colors.white,
    ":hover": {
      opacity: 0.9,
    },
  }),
  secondary: css({
    background: theme.colors.indigo,
    color: theme.colors.white,
    ":hover": {
      opacity: 0.9,
    },
  }),
  ghost: css({
    background: "none",
    ":hover": {
      background: theme.colors.accent,
    },
    ":focus": {
      background: "none",
    },
  }),
};

type ButtonSize = "default" | "icon";
const buttonSize: Record<ButtonSize, SerializedStyles> = {
  default: css({
    height: "2.5rem",
    padding: "0.5rem 1rem",
  }),
  icon: css({
    height: "2.5rem",
    width: "2.5rem",
  }),
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      css={[styles.default, buttonVariant[variant], buttonSize[size]]}
      {...props}
    />
  );
};

const CircleButton = styled(Button)({
  borderRadius: theme.border.full,
  padding: 0,
  aspectRatio: 1,
});

function ActionButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      size="icon"
      variant="ghost"
      css={{
        width: "1.5rem",
        height: "1.5rem",
        ":hover": {
          background: "none",
          "& > *": {
            opacity: 0.8,
          },
        },
      }}
    />
  );
}

function FloatingButton(props: ButtonProps) {
  return (
    <div
      css={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        padding: "0.5rem",
      }}
    >
      <CircleButton
        {...props}
        variant="secondary"
        css={{
          width: "3.5rem",
          height: "3.5rem",
          boxShadow: theme.shadow.lg,
        }}
      >
        <Plus size="2rem" />
      </CircleButton>
    </div>
  );
}

export { Button, CircleButton, ActionButton, FloatingButton };
