"use client";

import React, { ReactElement } from "react";
import classNames from "classnames";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";

interface DropdownProps extends React.ComponentProps<"div"> {}
interface DropdownItemProps extends DropdownMenuItemProps {
  label: string;
  icon?: ReactElement;
}

const DropdownItem = (props: DropdownItemProps) => {
  const { label, className, icon, ...rest } = props;
  const style =
    "flex flex-row items-center justify-between text-sm px-3.5 h-9 border-solid border-b-[.5px] select-none text-gray-800 border-gray-200 data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none hover:bg-gray-50";
  const cn = classNames(style, className);

  return (
    <Dropdown.Item className={cn} {...rest}>
      <span className={"mr-auto"}>{label}</span>
      {icon &&
        React.cloneElement(icon, {
          size: 16,
        })}
    </Dropdown.Item>
  );
};

export { Dropdown, DropdownItem };
