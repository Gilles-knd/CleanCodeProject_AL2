"use client";
import React, { ReactElement } from "react";
import classNames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { Label } from "@ui/atoms/Label/Label";
import DateComponent, { DatePickerProps } from "react-datepicker";

type DatePickerExtendedProps = {
  errorMessage?: string;
  label?: string;
  icon?: ReactElement;
  invalid?: boolean;
  placeholder?: string;
} & DatePickerProps;

export const DatePicker = React.forwardRef((props: DatePickerExtendedProps, forwardedRef) => {
  const {
    className,
    label,
    icon,
    invalid = false,
    readOnly,
    placeholder = "06 June 2024",
    errorMessage,
    ...rest
  } = props;
  const cn = classNames(
    "flex flex-col w-full h-full justify-center items-start text-gray-600 bg-white  py-2 px-2 flex-1 placeholder:text-slate-400 text-sm bg-transparent border-solid  border-gray-200",
    { "border-l-[1px]": icon },
  );

  const infoClassName = classNames("px-2 text-xs ", {
    "text-red-600": invalid,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const LeftIcon = icon ? React.cloneElement(icon, { size: 18 }) : null;


  const Trigger = React.forwardRef((props: React.ComponentProps<"button">, ref: any) => {
    const { value, className, ...rest } = props;
    const disabled = readOnly ? true : false

    return (
      <button disabled={disabled}  ref={ref} className={classNames(className, {
        "opacity-50 cursor-pointer": disabled
      })} {...rest}>
        {label && <Label text={label} htmlFor={props.id} />}
        <div
          className={classNames(
            "flex flex-row rounded-[.75rem] border-solid border-gray-300 border-[1px]  overflow-hidden h-12 w-full",
            { "focus-within:shadow-input-focused": !invalid },
            {
              "invalid:shadow-input-invalid group-focus:invalid:shadow-input-invalid shadow-input-invalid": invalid,
            },
          )}>
          {/*LEFT ICON - OPTIONAL*/}
          {LeftIcon && (
            <div className={"w-12 h-full flex flex-center items-center justify-center bg-gray-100 text-gray-600"}>
              {LeftIcon}
            </div>
          )}

          <span className={cn}>
            <p className={"!text-xs text-gray-600 capitalize"}>{value || placeholder}</p>
          </span>

          <input type={"hidden"} id={props.id} />
        </div>

        {invalid && errorMessage && <span className={infoClassName}>{errorMessage}</span>}
      </button>
    );
  });

  console.log(props.readOnly);

  return (
    <DateComponent
      showPopperArrow={false}
      customInput={<Trigger type="button" className={classNames("w-full flex flex-col justify-start space-y-2 peer", className)} />}
      readOnly={readOnly}
      {...rest}
      ref={forwardedRef}
    />
  );
});

DatePicker.displayName = "DatePicker";
