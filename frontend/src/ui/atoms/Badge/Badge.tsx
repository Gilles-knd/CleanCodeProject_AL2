"use client"

import React from "react";
import classNames from "classnames";

export type BadgeStateType = "success" | "warning" | "error" | "primary" | "neutral"

interface BadgeProps extends React.ComponentProps<"div"> {
  text: string;
  type: BadgeStateType;
}

export function Badge(props: BadgeProps) {
  const { text = "Badge", type = "neutral", className, ...rest } = props;
  const cn = classNames(
    "flex items-center justify-center w-fit px-2 py-1 capitalize h-[1.25rem] min-w-[1.25rem] rounded-full text-xs font-medium text-white",
    className,
    { "bg-green-600": type === "success" },
    { "bg-amber-500": type === "warning" },
    { "bg-red-600": type === "error" },
    { "bg-neutral-500": type === "neutral" },
    { "bg-purple-500 text-purple-900": type === "primary" },
  );

  return (
    <span className={cn} {...rest}>
      {text}
    </span>
  );
}
