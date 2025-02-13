import React, { ReactNode } from "react";
import classNames from "classnames";
import { Stack } from "@ui/layouts/Stack/Stack";
import { Illustration, IllustrationName } from "@ui/atoms/Illustration/Illustration";
import { Button } from "@ui/atoms/Button/Button";
import { PlusIcon } from "lucide-react";

export interface EmptyStateBoxProps extends React.ComponentProps<"div"> {
  text?: string;
  icon?: IllustrationName;
}

export default function EmptyStateBox(props: EmptyStateBoxProps) {
  const { text = "Oops nothing to show here!", icon = "Empty", children, className, ...rest } = props;
  const cn = classNames("max-w-[32.5rem]", className);

  return (
    <Stack direction={"col"} align={"center"} justify={"center"} gapy={24} className={cn} {...rest}>
      <Illustration name={icon} />
      <p className={"text-center text-sm text-gray-500"}>{text}</p>
      {children}
    </Stack>
  );
}

/*export function Action(props: { children: ReactNode }) {
  const { children, ...rest } = props;
  return (
    <button
      type={"button"}
      {...rest}
      className={
        "text-white h-11 rounded-full px-6 bg-primary-600 flex items-center justify-center hover:bg-primary-700 text-sm"
      }>
      <Stack direction={"row"} gapx={8} align={"center"}>
        {children}
        <span>
          <PlusIcon />
        </span>
      </Stack>
    </button>
  );
}*/
