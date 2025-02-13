import React from "react";
import classNames from "classnames";

interface AvatarProps extends React.ComponentProps<"div"> {
  size?: "sm" | "md" | "xl" | "lg"; // 16, 32, 48, 64
}

export function Avatar(props: AvatarProps) {
  const { className, size = "md", ...rest } = props;
  const cn = classNames(
    "rounded-full bg-primary-100 border-solid border-[.5px] border-gray-100 overflow-hidden",
    className,
    { "h-4 w-4": size === "sm" },
    { "h-8 w-8": size === "md" },
    { "h-12 w-12": size === "xl" },
    { "h-24 w-24": size === "lg" },
  );

  let s;

  switch (size) {
    case "sm":
      s = 16;
      break;
    case "xl":
      s = 48;
      break;
    case "lg":
      s = 64;
      break;
    default:
      s = 32;
  }

  return (
    <div className={cn} {...rest}>
      <svg
        width={s}
        height={s}
        viewBox={`0 0 64 64`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={"w-full h-full"}>
        <g clipPath="url(#clip0_274_14460)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M64 32a32 32 0 11-64 0 32 32 0 0164 0zm-22.857-9.143a9.143 9.143 0 11-18.286 0 9.143 9.143 0 0118.286 0zM32 36.571a22.848 22.848 0 00-19.634 11.141A25.097 25.097 0 0032 57.142a25.098 25.098 0 0019.63-9.43A22.844 22.844 0 0032 36.572z"
            fill="#009F9F"
          />
        </g>
        <defs>
          <clipPath id="clip0_274_14460">
            <path fill="#fff" d="M0 0H64V64H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
