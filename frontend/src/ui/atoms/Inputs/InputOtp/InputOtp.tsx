import React, { ReactElement } from "react";
import classNames from "classnames";

interface InputOtpProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  onChange?: CallableFunction;
  invalid?: boolean
}

export function InputOtp(props: InputOtpProps) {
  const { className, length = 4, onChange, invalid=false, ...rest } = props;
  const [otp, setOtp] = React.useState(new Array(length).fill(""));

  const cn = classNames(
    "h-12 w-10 text-center rounded-[.5rem] focus:shadow-input-focused flex items-center border-solid border-[1px] border-gray-300 justify-center",
    {"border-red-300 bg-red-50": invalid},
    className,

  );

  function handleChange(element: any, index: number) {
    if (isNaN(element.value)) return false;

    element.classList.add("bg-primary-50");
    const otpCopy = [...otp];
    otpCopy[index] = element.value;
    setOtp(otpCopy);

    // Move focus to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }

    // Notify parent component
    onChange?.(otpCopy.join(""));
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key === "Backspace") {
      if (event.currentTarget.previousSibling) {
        otp[index] = "";
        event.currentTarget.classList.remove("bg-primary-50");
        setOtp(otp);
        const element = event.currentTarget.previousSibling as HTMLElement;
        element.focus();
      }
    }
  }

  return (
    <div
      className={`grid grid-rows-1 gap-2`}
      style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}>
      {otp.map((data, index) => (
        <input
          type="text"
          key={index}
          inputMode={"numeric"}
          className={cn}
          onChange={(e) => handleChange(e.currentTarget, index)}
          value={data}
          maxLength={1}
          name={"otp"}
          onKeyDown={(e) => handleKeyDown(e, index)}
          {...rest}
        />
      ))}
    </div>
  );
}
