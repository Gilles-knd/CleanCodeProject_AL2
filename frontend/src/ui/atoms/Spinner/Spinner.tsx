import React from "react";
import { Loader } from "@ui/atoms/Icon/Icon";
import classNames from "classnames";

interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: number;
}

export function Spinner(props: SpinnerProps) {
  const { size = 16, className, ...rest } = props;
  const cn = classNames(className, "animate-spin");

  return (
    <span className={cn} {...rest}>
      <Loader size={size} />
    </span>
  );
}
