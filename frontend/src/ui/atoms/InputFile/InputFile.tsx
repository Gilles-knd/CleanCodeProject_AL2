"use client";

import React from "react";
import classNames from "classnames";
import { Text } from "@ui/atoms/Text/Text";
import { Stack } from "@ui/layouts/Stack/Stack";

interface InputFileProps extends React.ComponentProps<"input"> {
  showFileName?: boolean;
}

export function InputFile(props: InputFileProps) {
  const { children, className, onChange, showFileName, ...rest } = props;
  const cn = classNames(className);
  const [fileName, setFileName] = React.useState<string>();

  return (
    <Stack direction={"col"} align={"center"} justify={"center"} gapy={4} className={cn}>
      <label
        className={
          "flex items-center h-7 justify-center font-medium text-sm flex-row py-1 px-4 focus:ring-2 ring-offset-2 focus:ring-primary-500 rounded-[.5rem] text-gray-700 bg-white shadow-button hover:bg-gray-100 hover:cursor-pointer"
        }>
        {children}
        <input
          type={"file"}
          className={"hidden"}
          onChange={(e) => {
            if (e.currentTarget.files) {
              setFileName(e.currentTarget.files[0].name);
            }
            onChange?.(e);
          }}

          {...rest}
        />
      </label>
      {fileName && showFileName && <Text className={"!text-xs !text-gray-500"}>{fileName}</Text>}
    </Stack>
  );
}
