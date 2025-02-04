"use client";

import React, { ReactElement } from "react";
import classNames from "classnames";
import { Eye, EyeOff, X } from "@icons";
import "../style.css";
import { Label } from "@ui/atoms/Label/Label";

interface TextFieldProps extends React.ComponentProps<"input"> {
  errorMessage?: string;
  label?: string;
  icon?: ReactElement;
  invalid?: boolean;
  type: "text" | "email" | "number" | "password" | "tel";
  disabled?: boolean;
}

export const TextField = React.forwardRef((props: TextFieldProps, forwadedRef) => {
  const { className, label, icon, invalid = false, disabled, type = "text", errorMessage, required, onChange, ...rest } = props;
  const cn = classNames(
    "flex w-full text-gray-800 text-sm outline-none py-2 px-4 flex-1 placeholder:text-slate-400 placeholder:text-sm placeholder:capitalize bg-transparent border-solid  border-gray-200 appearance-none",
    className,
    { "border-l-[1px]": icon },
  );

  const infoClassName = classNames("px-2 text-xs ", {
    "text-red-600": invalid,
  });

  const [inputType, setInputType] = React.useState<string>(type);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const LeftIcon = icon ? React.cloneElement(icon, { size: 18 }) : null;
  const [isInputEmpty, setIsInputEmpty] = React.useState(true);
  let identifier = "";

  //Icon
  const passwordTrailingIcon = isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />;

  React.useEffect(() => {
    if(!props.value) {
      setIsInputEmpty(true);
    }
  }, [props.value])

  //Action
  let trailingIconAction = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setIsInputEmpty(true);
  };

  let toggleInputType = (type: string) => {
    setInputType(type);
  };

  let trailingIconButton = (
    <button
      type={"button"}
      className={"w-12 h-full flex flex-row items-center justify-center text-gray-600"}
      //style={{ opacity: isInputEmpty ? 0 : 1 }}
      onClick={() => trailingIconAction()}>
      <X size={18} />
    </button>
  );

  if (label) {
    identifier = label.split(" ").join("-");
  }

  if (type === "password") {
    trailingIconAction = () => {
      if (!isPasswordVisible) {
        toggleInputType("text");
        setIsPasswordVisible(true);
      } else {
        toggleInputType("password");
        setIsPasswordVisible(false);
      }
    };

    trailingIconButton = (
      <button
        type={"button"}
        className={"w-12 h-full flex flex-row items-center justify-center text-gray-600"}
        onClick={() => trailingIconAction()}>
        {passwordTrailingIcon}
      </button>
    );
  }


  return (
    <div className={classNames("flex flex-col gap-y-2 px-[2px]", { "opacity-50": disabled })}>
      {label && <Label text={label} htmlFor={props.id} />}
      <div
        className={classNames(
          "flex flex-row rounded-[.75rem] border-solid border-gray-300 border-[1px] h-12 w-full overflow-hidden",
          { " focus-within:shadow-input-focused": !invalid },
          {
            "invalid:shadow-input-invalid focus:invalid:shadow-input-invalid shadow-input-invalid": invalid,
          },
        )}>
        {/*LEFT ICON - OPTIONAL*/}
        {LeftIcon && (
          <div className={"w-12 h-full flex flex-center items-center justify-center bg-gray-100 text-gray-600"}>
            {LeftIcon}
          </div>
        )}

        {/*INPUT*/}
        <input
          type={inputType}
          className={cn}
          ref={inputRef}
          disabled={disabled}
          onChange={(e) => {
            if (!e.currentTarget.value) {
              setIsInputEmpty(true);
            } else {
              setIsInputEmpty(false);
            }
            onChange?.(e);
          }}

          {...rest}
        />

        {/*TRAILING ICON*/}
        { !isInputEmpty && trailingIconButton }
      </div>

      {invalid && errorMessage && <span className={infoClassName}>{errorMessage}</span>}
    </div>
  );
});

TextField.displayName = "TextField";
