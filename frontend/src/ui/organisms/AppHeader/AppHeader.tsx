import React from "react";
import classNames from "classnames";
import { Stack } from "@ui/layouts/Stack/Stack";

interface AppHeaderProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
}

export function AppHeader(props: AppHeaderProps) {
  const { children, title, description, className, ...rest } = props;
  const cn = classNames("w-full border-solid border-b-[1px] border-gray-200 h-16 px-10", className);

  return (
    <Stack direction={"row"} align={"center"} gapy={24} className={cn} {...rest}>
      <Stack direction={"col"} align={"start"} justify={"start"}>
        <h3 className={"font-medium text-2xl text-gray-800"}>{title}</h3>
        {description && <p className={" text-sm text-gray-600"}>{description}</p>}
      </Stack>

      <div className={"ml-auto"}>{children}</div>
    </Stack>
  );
}
