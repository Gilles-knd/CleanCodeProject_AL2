import React from "react";
import classNames from "classnames";
import * as SwitchRadix from "@radix-ui/react-switch";
import { SwitchProps } from "@radix-ui/react-switch";

interface SwitchPropsI extends SwitchProps {
  size?: "sm" | "md";
}

export function Switch(props: SwitchPropsI) {
  const { children, className, size = "sm", ...rest } = props;
  const cn = classNames(
    className,
    "bg-gray-400 data-[state=checked]:bg-primary-600 rounded-full",
    { "w-[2.5rem] h-6": size === "sm" },
    { "w-[3.25rem] h-8": size === "md" },
    { "bg-gray-400 data-[state=checked]:bg-gray-400": props.disabled },
  );
  const thumbStyle = classNames(
    "block rounded-full  shadow-switch will-change-transform transition-all translate-x-0.5  bg-white",
    { "h-[1.25rem]  w-[1.25rem] data-[state=checked]:translate-x-[1.125rem]": size === "sm" },
    { "h-[1.625rem]  w-[1.625rem] data-[state=checked]:translate-x-6": size === "md" },
  );

  return (
    <SwitchRadix.Root {...rest} className={cn}>
      <SwitchRadix.SwitchThumb className={thumbStyle} />
    </SwitchRadix.Root>
  );
}
