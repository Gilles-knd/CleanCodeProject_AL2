import React from "react";
import classNames from "classnames";

interface DividerProps extends React.ComponentProps<"div"> {
  size?: number;
  type?: "wave";
}

export function Divider(props: DividerProps) {
  const { className, size = 1, type, ...rest } = props;
  const cn = classNames(className, `flex w-full bg-gray-200`);

  if (type && type == "wave") {
    return (
      <div className={"w-full flex items-center justify-center"}>
        <Wave />
      </div>
    );
  }

  return <div className={cn} {...rest} style={{ height: `${size}px` }}></div>;
}

const Wave = () => {
  return (
    <svg width={154} height={10} viewBox="0 0 154 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M.5 9l10.997-6.286a10.69 10.69 0 0112.21 1.12v0a10.69 10.69 0 0012.783.77l2.08-1.37a10.568 10.568 0 0112.434.594v0a10.568 10.568 0 0013.007.189l.14-.107a10.793 10.793 0 0112.988-.036l.299.224a11.103 11.103 0 0013.167.107l1.4-1.013a8.942 8.942 0 0111.153.532l.419.368a8.318 8.318 0 0011.079-.075v0c3.152-2.853 7.98-2.842 11.152-.01v0c3.169 2.828 7.987 2.856 11.156.028v0a8.352 8.352 0 0111.21.077L153.5 9"
        stroke="#B1EBEB"
      />
    </svg>
  );
};
