import React from "react";
import classNames from "classnames";

interface OverlayProps extends React.ComponentProps<"div"> {}

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>((props: OverlayProps, forwardRef)  => {
  const { children, className, ...rest } = props;
  const cn = classNames(
    "w-full h-full absolute left-0 top-0 bottom-0 right-0 backdrop-blur-sm transparent-overlay",
    className,
  );

  return (
    <div className={cn} {...rest} ref={forwardRef}>
      {children}
    </div>
  );
})

Overlay.displayName = "Overlay";
