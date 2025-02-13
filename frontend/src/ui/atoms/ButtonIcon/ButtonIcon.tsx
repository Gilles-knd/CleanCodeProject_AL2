import React, { ReactElement } from "react";
import classNames from "classnames";
import { CommandIcon } from "@icons";

enum ButtonIconSize {
  sm = 24,
  md = 32,
  xl = 48,
  lg = 56,
}

interface ButtonIconProps extends React.ComponentProps<"button"> {
  size?: keyof typeof ButtonIconSize; // extract props from enum and return "sm" | "md"...
  icon?: ReactElement;
  variant?: "primary" | "secondary" | "ghost";
  rounded?: boolean;
}

export function ButtonIcon(props: ButtonIconProps) {
  const {
    children,
    icon = <CommandIcon />,
    variant = "primary",
    rounded = false,
    size = "xl",
    className,
    ...rest
  } = props;
  const cn = classNames(
    { "!rounded-full": rounded },
    "text-gray-700 flex items-center justify-center ",
    { "rounded-lg bg-zinc-800 text-white hover:bg-zinc-900 shadow-button": variant === "primary" },
    { "rounded-lg bg-white text-gray-700 hover:bg-gray-100 shadow-button": variant === "secondary" },
    { "rounded-lg text-gray-700 hover:bg-gray-100": variant === "ghost" },
    className,
  );

  const style = {
    height: `${ButtonIconSize[size] / 16}rem`,
    width: `${ButtonIconSize[size] / 16}rem`,
  };

  return (
    <button className={cn} {...rest} style={style}>
      {React.cloneElement(icon, { size: ButtonIconSize[size] / 2 + 2 })}
    </button>
  );
}
