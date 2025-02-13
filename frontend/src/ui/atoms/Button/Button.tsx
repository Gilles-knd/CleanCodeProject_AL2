"use client";

import React, { ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Spinner } from "@ui/atoms/Spinner/Spinner";

type variantTypes = "primary" | "secondary" | "ghost" | "danger" | "rounded" | "outline";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: variantTypes;
  icon?: ReactElement;
  position?: "left" | "right";
  label: string | ReactElement | ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, forwardedRef) => {
    const {
      children,
      variant = "primary",
      icon,
      position = "right",
      label = "button",
      disabled,
      loading,
      className,
      ...rest
    } = props;

    const defaultStyle =
      "flex items-center justify-center font-medium text-sm flex-row py-2 px-4 focus:ring-2 ring-offset-2 focus:ring-zinc-900 rounded-[.7rem] ";

    const variantStyle: { [key in variantTypes]: string } = {
      ghost: "hover:bg-gray-100",
      primary: "text-white bg-zinc-900 shadow-button hover:bg-zinc-950",
      danger: "text-white bg-red-600 shadow-button hover:bg-red-700",
      secondary: "text-gray-900 bg-white shadow-button hover:bg-gray-100",
      outline: "text-gray-900 border border-solid border-zinc-200 bg-white hover:bg-gray-100",
      rounded:
        "text-white bg-zinc-600 !px-6 hover:bg-zinc-700 !rounded-full !h-10",
    };

    const cn = classNames(
      defaultStyle,
      variantStyle[variant],
      {
        "!bg-gray-300 text-gray-400 pointer-events-none select-none": disabled,
      },
      className
    );

    if (icon) {
      return (
        <ButtonWithIcon
          icon={icon}
          position={position}
          className={cn}
          {...rest}
          label={""}
          ref={forwardedRef}
        >
          {label}
        </ButtonWithIcon>
      );
    }

    if (loading) {
      return (
        <ButtonWithIcon
          icon={<Spinner />}
          position={position}
          className={cn}
          {...rest}
          ref={forwardedRef}
          label={""}
        >
          {label}
        </ButtonWithIcon>
      );
    }

    return (
      <button type="button" className={cn} {...rest} ref={forwardedRef}>
        {label}
      </button>
    );
  }
);

type ButtonWithIconProps = {
  icon: ReactElement;
  position: "left" | "right";
} & ButtonProps;

export const ButtonWithIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonWithIconProps
>((props: ButtonWithIconProps, forwardedRef) => {
  const { icon, children, label, position, className, ...rest } = props;
  const cn = `flex flex-row items-center justify-center gap-x-1.5 ${className}`;
  const i = React.cloneElement(icon, { size: 16 });

  if (position === "left") {
    return (
      <button type="button" className={cn} {...rest} ref={forwardedRef}>
        {i}
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn}
      {...rest}
      ref={forwardedRef}
    >
      {children}
      {i}
    </button>
  );
});

Button.displayName = "Button";
ButtonWithIcon.displayName = "ButtonWithIcon";

export { type variantTypes as ButtonVariantTypes };
