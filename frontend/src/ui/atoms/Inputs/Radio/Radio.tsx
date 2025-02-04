import React from "react";
import classNames from "classnames";
import { genUniqueNumber } from "@helpers";

interface CheckboxProps extends React.ComponentProps<"input"> {}

export function Radio(props: CheckboxProps) {
  const { children, disabled = false, id = genUniqueNumber(4), className, ...rest } = props;

  const cn = classNames(
    "h-[1.5rem] w-[1.5rem] border-solid border-[1px] border-gray-200 rounded-[1rem]",
    "focus:shadow-input-focused",
    { "pointer-events-none bg-gray-200": disabled },
    className,
  );

  const containerStyle = classNames(
    "flex h-[1.5rem] w-[1.5rem] border-solid border-[1px] border-gray-200 rounded-[.3rem] overflow-hidden",
    "has-[:checked]:border-primary-600",
    {
      "has-[:checked]:border-primary-200  pointer-events-none bg-gray-100": disabled,
    },
  );

  const labelStyle = classNames(
    "flex items-center justify-center h-full w-full has-[:checked]:bg-primary-600 text-white",
    { "has-[:checked]:bg-primary-200": disabled },
  );

  return (
    <div className={containerStyle}>
      <label htmlFor={id} className={labelStyle}>
        <input type={"radio"} className={"hidden group peer"} id={id} disabled={disabled} {...rest} />
        <svg
          width="13"
          height="9"
          viewBox="0 0 13 9"
          fill="none"
          className={"hidden peer-checked:flex"}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.64282 4.28571L5.2864 7.92929C5.32545 7.96834 5.38877 7.96834 5.42782 7.92929L11.8571 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </label>
    </div>
  );
}
