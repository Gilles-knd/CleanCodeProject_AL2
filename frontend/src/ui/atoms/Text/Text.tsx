import React from "react";
import classNames from "classnames";

interface TextProps extends React.ComponentProps<"p"> {}

export function Text(props: TextProps) {
  const { children, className, ...rest } = props;
  const cn = classNames("text-sm lg:text-base text-gray-600", className);

  return (
    <p className={cn} {...rest}>
      {children}
    </p>
  );
}

Text.displayName = "Text";
