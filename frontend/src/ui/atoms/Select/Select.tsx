"use client";

import React, { forwardRef, ReactNode } from "react";
import classnames from "classnames";
import * as SelectBase from "@radix-ui/react-select";
import { ChevronsUpDown, CheckIcon } from "@icons";
import classNames from "classnames";
import { SelectTriggerProps } from "@radix-ui/react-select";
import ReactSelect , {} from "react-select";

type SelectTriggerPropsT = {
  placeholder?: string;
  invalid?: boolean;
} & SelectTriggerProps;

const SelectTrigger = (props: SelectTriggerPropsT) => {
  const { className, invalid, ...rest } = props;
  const cn = classNames(
    "flex flex-row text-sm items-center justify-between bg-white rounded-xl shadow-sm py-2 px-4 border-solid border-[1px] border-gray-300 space-x-2 data-[placeholder]:text-gray-600",
    {
      "invalid:shadow-input-invalid focus:invalid:shadow-input-invalid shadow-input-invalid": invalid,
    },
    {
      "opacity-50": props.disabled,
    },
    className,
  );
  return (
    <SelectBase.Trigger className={cn} aria-label={props.name} {...rest}>
      <SelectBase.Value
        placeholder={props.placeholder ?? props.placeholder}
        className={"text-sm font-medium capitalize text-gray-500"}
      />
      <SelectBase.Icon className={"text-gray-500"}>
        <ChevronsUpDown size={20} />
      </SelectBase.Icon>
    </SelectBase.Trigger>
  );
};

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectBase.Item
        className={classnames(
          "flex items-center select-none text-sm pl-8 pr-6 py-1 rounded-md data-[highlighted]:bg-primary-700 data-[highlighted]:text-white",
          className,
        )}
        {...props}
        ref={forwardedRef}>
        <SelectBase.ItemIndicator className="absolute w-6 left-2 flex items-center justify-center">
          <CheckIcon size={16} />
        </SelectBase.ItemIndicator>
        <SelectBase.ItemText>{children}</SelectBase.ItemText>
      </SelectBase.Item>
    );
  },
);

const Select = SelectBase;

const SelectRoot = React.forwardRef((props, forwardedRef:any) => {
  return <SelectBase.Root ref={forwardedRef} {...props} />;
});

const SelectMultiple = React.forwardRef((props, forwardedRef: any) => {
  return <ReactSelect {...props} ref={forwardedRef} />;
});

export { Select, SelectRoot, SelectTrigger, SelectItem, SelectMultiple };
