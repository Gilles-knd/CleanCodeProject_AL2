import React from "react";
import classNames from "classnames";

interface TextBoxProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
  errorMessage?: string;
}

export const TextBox = React.forwardRef<HTMLTextAreaElement, TextBoxProps>(
  (props: TextBoxProps, forwardedRef) => {
    const { children, className, disabled, invalid, errorMessage, ...rest } =
      props;
    const cn = classNames(
      "w-full text-zinc-900 text-sm py-2 px-4 outline-none flex-1 placeholder:text-slate-400 placeholder:text-sm placeholder:capitalize bg-transparent border-solid border-[1px] rounded-[.75rem]  border-gray-300 appearance-none",
      { " focus-within:shadow-input-focused": !invalid },
      {
        "invalid:shadow-input-invalid focus:invalid:shadow-input-invalid shadow-input-invalid":
          invalid,
      },
      className
    );

    const infoClassName = classNames("px-2 text-xs ", {
      "text-red-600": invalid,
    });

    return (
      <div
        className={classNames(
          "flex flex-col gap-y-2 p-[2px] overflow-hidden",
          { "opacity-50": disabled }
        )}
      >
        <textarea
          className={cn}
          rows={5}
          disabled={disabled}
          {...rest}
          ref={forwardedRef}
        >
          {children}
        </textarea>

        {invalid && errorMessage && (
          <span className={infoClassName}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
