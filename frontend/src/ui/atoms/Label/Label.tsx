"use client";

import React, { ReactElement } from "react";
import classNames from "classnames";

interface LabelProps extends React.ComponentProps<"label"> {
  text: string | ReactElement;
}

export function Label(props: LabelProps) {
  const { className, text = "Label", ...rest } = props;
  const cn = classNames("select-none text-gray-800 text-sm", className);

  return (
    <label className={cn} {...rest}>
      {text}
    </label>
  );
}
