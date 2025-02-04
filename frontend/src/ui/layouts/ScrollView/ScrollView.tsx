import classNames from "classnames";
import React from "react";

interface ScrollViewProps extends React.ComponentProps<"section"> {
  mask?: boolean;
  pb?: number;
}

export const ScrollView = React.forwardRef((props: ScrollViewProps, forwardedRef: any) => {
  const { className, mask = false, pb=128, ...rest } = props;

  return (
    <section className={classNames("relative h-full overflow-hidden translate-x-0", className)}  {...rest}>
      <div className="h-full max-h-full overflow-scroll" style={{paddingBottom: pb}} ref={forwardedRef}>{props.children}</div>
      {mask && (
        <span className="absolute bottom-0 left-0 right-0 h-32 w-full bg-gradient-to-t from-white to-[rgba(255, 255, 255,.4)]"></span>
      )}
    </section>
  );
});
