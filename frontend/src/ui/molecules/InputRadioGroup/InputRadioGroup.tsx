"use client";

import React from "react";
import classNames from "classnames";
import { Label } from "@ui/atoms/Label/Label";
import { Radio } from "@ui/atoms/Inputs/Radio/Radio";

interface InputRadioGroupProps extends React.ComponentProps<"input"> {
  label: string;
}

export function InputRadioGroup(props: InputRadioGroupProps) {
  const { children, label, id, name, className, onChange, ...rest } = props;
  const [checked, setChecked] = React.useState(false);
  const cn = classNames(
    "h-14 flex flex-row rounded-md overflow-hidden select-none border-solid border-[1px] border-gray-200",
    { "border-primary-600": checked },
    className,
  );

  return (
    <div className={cn}>
      <div
        className={classNames("h-full w-14 flex flex-col items-center justify-center bg-gray-100", {
          "bg-primary-50": checked,
        })}>
        <Radio
          onChange={(e) => {
            if (onChange) onChange(e);
            setChecked(e.currentTarget.checked);
          }}
          name={name}
          id={id || ""}
          {...rest}
        />
      </div>

      <div className={"px-4 flex flex-col items-center justify-center"}>
        <Label
          text={label}
          className={classNames("font-medium", { "!text-primary-700 select-none": checked })}
          htmlFor={id || ""}
        />
      </div>
    </div>
  );
}
