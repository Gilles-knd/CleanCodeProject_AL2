import React from "react";
import classNames from "classnames";
import * as illustrations from "./assets";

export type IllustrationName = "Empty" | "Message" | "Trash" | "List" | "Box";

interface IllustrationProps extends React.ComponentProps<"div"> {
  name: IllustrationName;
}

export function Illustration(props: IllustrationProps) {
  const { className, name,  ...rest } = props;
  const cn = classNames("h-32 w-32 flex items-center justify-center", className);

  return (
    <div className={cn} {...rest}>
      {illustrations[name]}
    </div>
  );
}
