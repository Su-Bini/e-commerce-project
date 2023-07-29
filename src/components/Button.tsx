import React, { MouseEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  style: {
    fontSize?: string;
    defaultColor: string;
    backgroundColor: string;

    hoverColor?: string;
    hoverBackgroundColor?: string;
    border?: string;
  };
  active?: boolean;
  children: string | number | React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  style,
  children,
  active,
  onClick,
}: ButtonProps) {
  const buttonStyle = {
    fontSize: style.fontSize,
    color: style.defaultColor,
    backgroundColor: style.backgroundColor,
  };

  const hoverStyle = {
    fontSize: style.fontSize,
    color: style.hoverColor || style.defaultColor,
    backgroundColor: style.hoverBackgroundColor || style.backgroundColor,
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = hoverStyle.color;
          e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = buttonStyle.color;
          e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
        }
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
